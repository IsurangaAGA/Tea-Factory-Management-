const express = require('express')
const pool = require('../config/db')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC')
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    if (!rows.length) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(rows[0])
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body
    if (!name || price == null) {
      return res.status(400).json({ message: 'Name and price are required' })
    }
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description || '', price, stock ?? 0]
    )
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body
    const [result] = await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description || '', price, stock ?? 0, req.params.id]
    )
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    res.json(rows[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id])
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router

