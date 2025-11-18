# Node.js Shop & Orders API

This Express + MySQL backend powers the shop and order workflows for the Tea Factory frontend.

## Features

- Express server with JSON parsing and CORS
- MySQL connection pooling via `mysql2/promise`
- REST routes for `products` and `orders`
- Centralized error and 404 handling
- Ready-made Axios helpers on the frontend (`src/services/api.js`)

## Getting Started

```bash
cd Backend/node-backend
npm install
cp env.example .env   # fill in MySQL credentials and desired PORT
npm run dev           # runs nodemon on src/server.js
```

The API listens on `PORT` (defaults to `5000`). The frontend expects the API base at `http://localhost:5000/api` unless `VITE_API_BASE_URL` is set.

## Database Schema

Create the following tables (adjust names as needed):

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  shipping_address TEXT,
  items JSON,
  status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> MySQL 5.x users can store `items` as `TEXT` instead of `JSON`.

## API Routes

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Fetch single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Remove product |
| GET | `/api/orders` | List orders |
| GET | `/api/orders/:id` | Fetch single order (with `items`) |
| POST | `/api/orders` | Create order with line items |
| PUT | `/api/orders/:id` | Update order details/status |

Each route uses async/await with pooled queries and returns JSON responses with meaningful status codes.

## Frontend Integration

1. Set `VITE_API_BASE_URL=http://localhost:5000/api` (or deployed URL) in a `.env` file at the project root.
2. Use the helpers in `src/services/api.js` (already imported in `ShopPage` and `OrderManagement`) to load products and create orders against this backend.

This keeps the React app in sync with the new backend without touching every component.

