const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const url = `http://localhost:3000/api/auth/activate/${token}`;
    await sendEmail(user.email, 'Account Activation', `Click <a href="${url}">here</a> to activate your account`);

    res.status(201).send('User registered. Please check your email to activate your account.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.activateAccount = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).send('Invalid token');
    if (user.isActive) return res.status(400).send('Account already activated');

    user.isActive = true;
    await user.save();

    res.send('Account activated successfully');
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    if (!user.isActive) return res.status(400).send('Account is not activated');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const url = `http://localhost:3000/api/auth/reset-password/${token}`;
    await sendEmail(user.email, 'Password Reset', `Click <a href="${url}">here</a> to reset your password`);

    res.send('Password reset email sent');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).send('Invalid token');

    user.password = password;
    await user.save();

    res.send('Password reset successfully');
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
