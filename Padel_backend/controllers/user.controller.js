const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const path = require('path');
const fs = require('fs/promises');

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
          pseudo: req.body.pseudo,
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

module.exports.deleteUserPhoto = async (req, res) => {
  const userId = req.params.id;
  try {
    const existingUser = await UserModel.findById(userId);
    if (existingUser && existingUser.picture && existingUser.picture !== './uploads/profil/random-user.jpg') {
      const filePath = path.join(__dirname, '../../padel_frontend/public', existingUser.picture);
      await fs.unlink(filePath);
    }
    else{
      console.log("Impossible de supprimer cette image !")
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { picture: './uploads/profil/random-user.jpg' } },
      { new: true }
    );

    return res.status(200).json({ message: 'Photo deleted successfully', updatedUser });
  } catch (error) {
    console.error('Error deleting post photo:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


