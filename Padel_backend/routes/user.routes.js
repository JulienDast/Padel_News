const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout)

router.get("/", userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/delete-pic/:id', userController.deleteUserPhoto);

router.post('/upload', uploadController.uploadSingle, (req, res) => {
  res.json({ success: true });
});


module.exports = router;