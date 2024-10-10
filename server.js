const express = require('express')
const dotenv = require('dotenv')
const { connect } = require('./config/db')
const tableRoutes = require('./routes/tableRoute')

dotenv.config()

const app = express()
connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json('App is running')
})

app.use('/api/table', tableRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
