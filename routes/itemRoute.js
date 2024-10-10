const express = require('express')
const Item = require('../models/Item')

const router = express.Router()

// Create Item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      image: req.body.image,
      name: req.body.name,
      description: req.body.description,
      details: req.body.details,
      price: req.body.price,
      category: req.body.catId,
    })

    const savedItem = await newItem.save()
    res.status(200).json(savedItem)
  } catch (error) {
    res.status(400).json(error)
  }
})

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({})
    res.status(200).json(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
