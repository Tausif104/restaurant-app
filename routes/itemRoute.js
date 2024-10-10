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

// GET all items by Category
router.get('/category/:catId', async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.catId })
    res.status(200).json(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

// GET single Item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
