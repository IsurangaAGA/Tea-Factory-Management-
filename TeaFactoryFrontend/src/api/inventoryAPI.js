// API base URL - change this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Inventory API methods
export const inventoryAPI = {
  // Get all products
  getProducts: async () => {
    return await apiRequest('/inventory');
  },

  // Get single product by ID
  getProduct: async (id) => {
    return await apiRequest(`/inventory/${id}`);
  },

  // Create new product
  createProduct: async (productData) => {
    return await apiRequest('/inventory', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  updateProduct: async (id, productData) => {
    return await apiRequest(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  deleteProduct: async (id) => {
    return await apiRequest(`/inventory/${id}`, {
      method: 'DELETE',
    });
  },

  // Adjust product quantity
  adjustQuantity: async (id, adjustmentData) => {
    return await apiRequest(`/inventory/${id}/adjust`, {
      method: 'PATCH',
      body: JSON.stringify(adjustmentData),
    });
  },
};

// Export for use in other components
export default inventoryAPI;