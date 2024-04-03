const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const formidable = require('formidable');
const fs = require('fs/promises');
const path = require('path');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find().sort({ createdAt: -1 })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log('Error to get data: ' + err);
    });
};

module.exports.createPost = async (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      if (!fields.title || !fields.article) {
        throw new Error('Title and article are required fields.');
      }

      const name = Date.now() || "default";
      const uploadedFile = files.file ? files.file[0] : null;
      const oldPath = uploadedFile ? uploadedFile.filepath : null;
      const extension = '.jpg';
      
      let newPath = "";
      if (uploadedFile) {
        const originalExtension = path.extname(uploadedFile.originalFilename).toLowerCase();

        if (!['.jpeg', '.jpg', '.png'].includes(originalExtension)) {
          throw new Error('Invalid file format. Only JPEG, JPG, or PNG are allowed.');
        }

        const maxSize = 500 * 1024; 
        if (uploadedFile.size > maxSize) {
          throw new Error('File size exceeds the limit. Maximum allowed size is 500 KB.');
        }

        const newExtension = '.jpg';
        newPath = path.join(__dirname, '../../padel_frontend/public/uploads/posts', name + newExtension);
        await fs.rename(oldPath, newPath);
      }

      const posterId = fields.posterId ? fields.posterId[0] : "";
      const title = fields.title[0]; 
      const subtitle = fields.subtitle ? fields.subtitle[0] : "";
      const article = fields.article[0]; 
      const video = fields.video ? fields.video[0] : "";
      const likers = fields.likers || [];
      const comments = fields.comments || [];

      const newPost = new postModel({
        posterId: posterId,
        title: title,
        subtitle: subtitle,
        article: article,
        picture: newPath,
        video: video,
        likers: likers,
        comments: comments,
      });

      const post = await newPost.save();

      await postModel.findOneAndUpdate(
        { _id: post._id },
        { $set: { picture: `./uploads/posts/${name}${extension}` } }
      );

      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
};

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }
  
  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      let updatedRecord = fields;
      const uploadedFile = files.file ? files.file[0] : null;
      const oldPath = uploadedFile ? uploadedFile.filepath : null;

      let newPath = "";
      if (uploadedFile) {
        const name = req.params.id || "default";
        const newExtension = '.jpg'; 
        newPath = path.join(__dirname, '../../padel_frontend/public/uploads/posts', name + newExtension);
        await fs.rename(oldPath, newPath);

        updatedRecord.picture = newPath;
        
        const existingPost = await PostModel.findById(req.params.id);
        if (existingPost.picture && existingPost.picture !== './uploads/posts/random-article.jpg' && existingPost.picture !== `./uploads/posts/${req.params.id}.jpg`) {
          const oldFilePath = path.join(__dirname, '../../padel_frontend/public', existingPost.picture);
          try {
            await fs.access(oldFilePath);
            await fs.unlink(oldFilePath);
          } catch (error) {
            console.log("Le fichier à supprimer n'existe pas.");
          }
        } else {
          const existingPost = await PostModel.findById(req.params.id);
          if (existingPost.picture && existingPost.picture !== './uploads/posts/random-article.jpg') {
            updatedRecord.picture = existingPost.picture;
          }
        }
      }
      
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: { picture: `./uploads/posts/${req.params.id}.jpg`} }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(updatedPost);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
  } else {
    try {
      const updatedRecord = req.body;
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true }
      );
      res.send(updatedPost);
    } catch (err) {
      console.log('Update error: ' + err);
    }
  }
};


module.exports.deletePostPhoto = async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await PostModel.findById(postId);
    if (existingPost && existingPost.picture && existingPost.picture !== './uploads/posts/random-article.jpg') {
      const filePath = path.join(__dirname, '../../padel_frontend/public', existingPost.picture);
      await fs.unlink(filePath);
    }
    else{
      console.log("Impossible de supprimer cette image !")
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { picture: './uploads/posts/random-article.jpg' } },
      { new: true }
    );

    return res.status(200).json({ message: 'Photo deleted successfully', updatedPost });
  } catch (error) {
    console.error('Error deleting post photo:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deletePostVideo = async (req, res) => {
  const postId = req.params.id;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { video: '' } }, 
      { new: true } 
    );

    res.status(200).json({ message: 'Post video deleted successfully', post: updatedPost });
  } catch (error) {
    console.error('Error deleting post video:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.picture && post.picture !== './uploads/posts/random-article.jpg') {
      const picturePath = path.join(__dirname, '../../padel_frontend/public', post.picture);
      await fs.unlink(picturePath);
    }

    const result = await PostModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id }
      },
      { new: true }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id }
      },
      { new: true }
    );

    res.send({ updatedPost, updatedUser });
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id }
      },
      { new: true }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id }
      },
      { new: true }
    );

    res.send({ updatedPost, updatedUser });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res)=>{
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const commentPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { 
          comments:{
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime()
          }
        }
      },
    { new: true }
    );
    res.send({ commentPost });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {

    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    const theComment = post.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!theComment) {
      return res.status(404).send('Comment not found');
    }

    theComment.text = req.body.text;
    await post.save();
    return res.status(200).send(post);

  } catch (err) {
    return res.status(500).send(err);
  }
};


module.exports.deleteCommentPost = async (req, res)=>{

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {

    const deletedComment = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { 
          comments: {
            _id: req.body.commentId
          }
        }
      },
      { new: true }
    );
    res.send({deletedComment});

  } catch (err) {
    return res.status(400).send(err);
  }
};