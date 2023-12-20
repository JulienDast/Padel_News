const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs)=>{
    if(!err) res.send(docs);
    else console.log('Error to get data : ' + err);
  });
}

module.exports.readPost = (req, res) => {
  PostModel.find()
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
}

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
}

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
}