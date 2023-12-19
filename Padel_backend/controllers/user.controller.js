const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  UserModel.findById(req.params.id).select('-password')
  .then(docs => {
    if (docs) {
      res.send(docs);
    } else {
      console.log('ID unknown : ' + req.params.id);
      res.status(404).send('ID unknown : ' + req.params.id);
    }
  })
  .catch(err => {
    console.log('Error: ' + err);
    res.status(500).send('Internal Server Error');
  });
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultOnInsert: true }
    );

    if (updatedUser) {
      return res.send(updatedUser);
    } else {
      return res.status(404).send('User not found');
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }

  try {
    const result = await UserModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

