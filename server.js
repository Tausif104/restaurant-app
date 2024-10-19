const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const { connect } = require('./config/db')
const tableRoutes = require('./routes/tableRoute')
const categoryRoute = require('./routes/categoryRoute')
const itemRoute = require('./routes/itemRoute')
const userRoute = require('./routes/userRoute')

dotenv.config()

const app = express()
connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('App is running')
})

// routes
app.use('/api/table', tableRoutes)
app.use('/api/category', categoryRoute)
app.use('/api/items', itemRoute)
app.use('/api/users', userRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
