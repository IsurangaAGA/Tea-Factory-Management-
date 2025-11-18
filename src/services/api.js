import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getProducts = () => apiClient.get('/products')
export const getProduct = (id) => apiClient.get(`/products/${id}`)
export const createProduct = (payload) => apiClient.post('/products', payload)
export const updateProduct = (id, payload) => apiClient.put(`/products/${id}`, payload)
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`)

export const getOrders = () => apiClient.get('/orders')
export const getOrder = (id) => apiClient.get(`/orders/${id}`)
export const createOrder = (payload) => apiClient.post('/orders', payload)
export const updateOrder = (id, payload) => apiClient.put(`/orders/${id}`, payload)

