const express = require('express');
const {
  registerUser,
  activateUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/activate/:token', activateUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);

module.exports = router;
