const express = require('express')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const router = express.Router()

// Register user
router.post('/', async (req, res) => {
  const { username, email, password, isAdmin } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.json({ msg: 'User Already Exists' })
  } else {
    const user = await User.create({
      username,
      email,
      password,
      isAdmin,
    })

    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(400).json({ msg: 'Something went wrong' })
    }
  }
})

// login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401).json({ msg: 'Invalid Email or Password' })
  }
})

// logout user
router.post('/logout', async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ msg: 'User Logged Out' })
})

module.exports = router
