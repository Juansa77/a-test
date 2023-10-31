const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config()
const secret = process.env.JWT_SECRET

const generateToken = (userId, username) => {
  const payload = {
    username: username,
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };