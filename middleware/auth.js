const jwt = require('jsonwebtoken')
const User = require('../models/User')

// auth
const auth = async (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      res.status(503).json({ msg: 'Invalid Token' })
    }
  } else {
    res.status(503).json({ msg: 'User Unauthorized' })
  }
}

// admin
const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(503).json({ msg: 'User is not admin' })
  }
}

module.exports = { auth, admin }
