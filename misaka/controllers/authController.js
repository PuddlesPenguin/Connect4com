const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

async function register(req, res) {
  const { email, username, password } = req.body;
  console.log('[register] Checking if user exists:', email);
  const existingUser = await userModel.findUserByEmail(email);
  console.log('[register] Result of findUserByEmail:', existingUser);
  if (existingUser) {
    return res.status(400).json({ error: 'Already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.createUser(email, username, hashedPassword);
  req.session.userId = user.id;
  res.json({ message: 'Success', user });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  req.session.userId = user.id;
  res.json({ message: 'Success', user });
}

function logout(req, res) {
  req.session.destroy(() => res.json({ message: 'Success' }));
}

async function getCurrentUser(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user = await userModel.findUserById(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
}

module.exports = { register, login, logout, getCurrentUser };
