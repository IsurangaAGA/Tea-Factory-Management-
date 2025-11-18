const mysql = require('mysql2/promise')

const createPool = () => {
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
  } = process.env

  if (!DB_HOST || !DB_USER || !DB_DATABASE) {
    throw new Error('Missing database configuration. Ensure DB_HOST, DB_USER, DB_PASSWORD, and DB_DATABASE are set.')
  }

  return mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
}

const pool = createPool()

module.exports = pool

