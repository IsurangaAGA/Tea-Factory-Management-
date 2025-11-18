const express = require('express')
const pool = require('../config/db')

const router = express.Router()

const parseItems = (order) => ({
  ...order,
  items: order.items ? JSON.parse(order.items) : []
})

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, customer_name AS customerName, contact_phone AS contactPhone,
              shipping_address AS shippingAddress, status, total_amount AS totalAmount,
              created_at AS createdAt
         FROM orders
     ORDER BY created_at DESC`
    )
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id])
    if (!rows.length) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(parseItems(rows[0]))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      customerName,
      contactPhone,
      shippingAddress,
      items,
      status,
      totalAmount
    } = req.body

    if (!customerName || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'customerName and at least one item are required' })
    }

    const [result] = await pool.query(
      `INSERT INTO orders (customer_name, contact_phone, shipping_address, items, status, total_amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customerName,
        contactPhone || null,
        shippingAddress || null,
        JSON.stringify(items),
        status || 'pending',
        totalAmount ?? 0
      ]
    )

    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [result.insertId])
    res.status(201).json(parseItems(rows[0]))
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {
      customerName,
      contactPhone,
      shippingAddress,
      items,
      status,
      totalAmount
    } = req.body

    const [result] = await pool.query(
      `UPDATE orders
          SET customer_name = COALESCE(?, customer_name),
              contact_phone = COALESCE(?, contact_phone),
              shipping_address = COALESCE(?, shipping_address),
              items = COALESCE(?, items),
              status = COALESCE(?, status),
              total_amount = COALESCE(?, total_amount)
        WHERE id = ?`,
      [
        customerName,
        contactPhone,
        shippingAddress,
        items ? JSON.stringify(items) : undefined,
        status,
        totalAmount,
        req.params.id
      ]
    )

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id])
    res.json(parseItems(rows[0]))
  } catch (error) {
    next(error)
  }
})

module.exports = router

