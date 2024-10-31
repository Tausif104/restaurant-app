const express = require('express')
const multer = require('multer')

const router = express.Router()

// Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
  res.json({ msg: `${req.file.originalname} has been uploaded` })
})

module.exports = router
