const formidable = require('formidable');
const fs = require('fs/promises');
const path = require('path');
const UserModel = require("../models/user.model");

const uploadSingle = async (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const name = fields.name || "default";
      const uploadedFile = files.file[0];
      const oldPath = uploadedFile.filepath;
      const originalExtension = path.extname(uploadedFile.originalFilename).toLowerCase();

      if (!['.jpeg', '.jpg', '.png'].includes(originalExtension)) {
        throw new Error('Invalid file format. Only JPEG, JPG, or PNG are allowed.');
      }

      const maxSize = 500 * 1024; 
      if (uploadedFile.size > maxSize) {
        throw new Error('File size exceeds the limit. Maximum allowed size is 5 MB.');
      }

      const newExtension = '.jpg';

      const newPath = path.join(__dirname, '../../padel_frontend/public/uploads/profil', name + newExtension);

      await fs.rename(oldPath, newPath);

      const userId = fields.userId;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { picture: `./uploads/profil/${name}${newExtension}` } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      if (!updatedUser) {
        throw new Error('Failed to update user profile.');
      }

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
};

module.exports = { uploadSingle };
