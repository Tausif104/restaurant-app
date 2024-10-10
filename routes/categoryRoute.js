const express = require('express')
const Category = require('../models/Category')

const router = express.Router()

// POST a category
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    })

    const savedCategory = await newCategory.save()
    res.status(200).json(savedCategory)
  } catch (error) {
    res.status(400).json(error)
  }
})

// GET all category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({})
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
