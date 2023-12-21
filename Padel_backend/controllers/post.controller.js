const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs)=>{
    if(!err) res.send(docs);
    else console.log('Error to get data : ' + err);
  });
};

module.exports.readPost = (req, res) => {
  PostModel.find().sort({ createdAt: -1 })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log('Error to get data: ' + err);
    });
};


module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    title : req.body.title,
    article : req.body.article,
    video : req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err){
    return res.status(400).send(err);
  }
};

module.exports.updatePost =  async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }
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
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const result = await PostModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(404).send('Article not found');
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
            commenterId: req.body.commenterID,
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