const express = require('express')
const Table = require('../models/Table')
const { auth, admin } = require('../middleware/auth')

const router = express.Router()

// Reserve Table - POST
router.post('/', async (req, res) => {
  try {
    const newTable = new Table({
      date: req.body.date,
      hour: req.body.hour,
      peopleCount: req.body.peopleCount,
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      address: req.body.address,
      comment: req.body.comment,
    })

    const savedTable = await newTable.save()
    res.status(201).json(savedTable)
  } catch (error) {
    res.status(401).json(error.message)
  }
})

// Reserve Table - GET
router.get('/', auth, admin, async (req, res) => {
  try {
    const tableData = await Table.find({})
    res.status(200).json(tableData)
  } catch (error) {
    res.status(error).json(error)
  }
})

module.exports = router
