import React, { useState, useEffect } from 'react';

const Products = ({
  products,
  loading,
  error,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  const [productFormData, setProductFormData] = useState({
    sku: '',
    name: '',
    type: 'raw',
    quantity: 0,
    reorderLevel: 10,
    price: 0.0,
    supplierId: ''
  });

  // ✅ Fetch suppliers for dropdown
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/suppliers/');
        if (!res.ok) throw new Error('Failed to fetch suppliers');
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      }
    };
    fetchSuppliers();
  }, []);

  // ✅ Filter products by search and type
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedCategory || product.type === selectedCategory;
    return matchesSearch && matchesType;
  });

  const categories = [...new Set(products.map((p) => p.type))];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      sku: '',
      name: '',
      type: 'raw',
      quantity: 0,
      reorderLevel: 10,
      price: 0.0,
      supplierId: ''
    });
    setShowAddModal(true);
    setFormError('');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData({
      sku: product.sku,
      name: product.name,
      type: product.type,
      quantity: product.quantity,
      reorderLevel: product.reorderLevel,
      price: product.price,
      supplierId: product.supplier?.id || ''
    });
    setShowAddModal(true);
    setFormError('');
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({
      ...prev,
      [name]:
        name === 'quantity' || name === 'reorderLevel'
          ? parseInt(value) || 0
          : name === 'price'
          ? parseFloat(value) || 0
          : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    if (!productFormData.name.trim() || !productFormData.supplierId) {
      setFormError('Please fill all required fields and select a supplier.');
      setFormLoading(false);
      return;
    }

    try {
      const payload = {
        ...productFormData,
        supplier: { id: parseInt(productFormData.supplierId) }
      };

      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, payload);
      } else {
        await onCreateProduct(payload);
      }

      setShowAddModal(false);
      setEditingProduct(null);
      onRefresh();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDeleteProduct(productId);
        onRefresh();
      } catch (err) {
        setFormError(err.message);
      }
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['SKU', 'Name', 'Type', 'Supplier', 'Quantity', 'Reorder Level', 'Price'],
      ...filteredProducts.map((product) => [
        product.sku,
        product.name,
        product.type === 'raw' ? 'Raw Material' : 'Finished Goods',
        product.supplier?.name || '—',
        product.quantity,
        product.reorderLevel,
        `$${product.price?.toFixed(2)}`
      ])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products Management</h1>
        <p>Manage your product inventory and supplier-linked stock</p>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setFormError('')} className="close-error">
            ×
          </button>
        </div>
      )}

      <div className="card mb-6">
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            className="dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Types</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'raw' ? 'Raw Material' : 'Finished Goods'}
              </option>
            ))}
          </select>
          <div className="action-buttons">
            <button onClick={exportToCSV}>📤 Export CSV</button>
            <button onClick={onRefresh}>🔄 Refresh</button>
            <button className="btn-primary" onClick={handleAddProduct}>
              ➕ Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <table className="products-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Type</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>
                  {product.type === 'raw' ? 'Raw Material' : 'Finished Goods'}
                </td>
                <td>{product.supplier?.name || '—'}</td>
                <td>{product.quantity}</td>
                <td>{product.reorderLevel}</td>
                <td>${product.price?.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>✏️</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="no-data">
            {products.length === 0
              ? 'No products available.'
              : 'No products found.'}
          </div>
        )}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="close-modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              {formError && <div className="error-message">{formError}</div>}

              <div className="form-grid">
                <div>
                  <label>SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={productFormData.sku}
                    onChange={handleFormInputChange}
                    required
                  />
                </div>

                <div>
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={productFormData.name}
                    onChange={handleFormInputChange}
                    required
                  />
                </div>

                <div>
                  <label>Type *</label>
                  <select
                    name="type"
                    value={productFormData.type}
                    onChange={handleFormInputChange}
                  >
                    <option value="raw">Raw Material</option>
                    <option value="finished">Finished Goods</option>
                  </select>
                </div>

                <div>
                  <label>Supplier *</label>
                  <select
                    name="supplierId"
                    value={productFormData.supplierId}
                    onChange={handleFormInputChange}
                    required
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productFormData.quantity}
                    onChange={handleFormInputChange}
                  />
                </div>

                <div>
                  <label>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={productFormData.reorderLevel}
                    onChange={handleFormInputChange}
                  />
                </div>

                <div>
                  <label>Unit Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={productFormData.price}
                    onChange={handleFormInputChange}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formLoading}>
                  {formLoading
                    ? 'Saving...'
                    : editingProduct
                    ? 'Update Product'
                    : 'Create Product'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .products-page {
          padding: 1.5rem;
          font-family: 'Poppins', sans-serif;
        }
        .page-header h1 {
          font-size: 2rem;
          color: #1f2937;
        }
        .page-header p {
          color: #6b7280;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
        }
        .search-input,
        .dropdown,
        select,
        input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
        }
        .action-buttons button {
          background: none;
          border: 1px solid #d1d5db;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-primary {
          background: #2563eb;
          color: white;
          border: none;
        }
        .btn-secondary {
          background: #e5e7eb;
          border: none;
        }
        .btn-primary:hover {
          background: #1d4ed8;
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
        }
        .products-table th,
        .products-table td {
          border-bottom: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        .products-table th {
          background: #f9fafb;
        }
        .no-data {
          text-align: center;
          padding: 1rem;
          color: #9ca3af;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          width: 600px;
          max-width: 95%;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .close-modal {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .error-message {
          background: #fee2e2;
          color: #b91c1c;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Products;
