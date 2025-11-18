const express = require('express')
const cors = require('cors')

const productsRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    message: err.message || 'Internal server error'
  })
})

module.exports = app

