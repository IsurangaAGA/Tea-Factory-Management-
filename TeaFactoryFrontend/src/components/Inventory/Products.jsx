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

  const generateSKU = () => {
    const nextNumber = ((products?.length || 0) + 1).toString().padStart(4, '0');
    return `T-PROD-${nextNumber}`;
  };

  const [productFormData, setProductFormData] = useState({
    sku: generateSKU(),
    name: '',
    type: 'raw',
    quantity: 0,
    reorderLevel: 10,
    price: 0.0,
    supplierId: ''
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/suppliers/');
        if (!res.ok) throw new Error('Failed to fetch suppliers');
        setSuppliers(await res.json());
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedCategory || product.type === selectedCategory;
    return matchesSearch && matchesType;
  });

  const categories = [...new Set((products || []).map((p) => p.type))];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      sku: generateSKU(),
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
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #e5e7eb',
          borderTop: '5px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading Products...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '30px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            Products Management
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Manage your product inventory efficiently
          </p>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            alignItems: 'end'
          }}>
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 18px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px 18px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white',
                width: '100%'
              }}
            >
              <option value="">All Types</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'raw' ? 'Raw Material' : 'Finished Goods'}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={exportToCSV}
                style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📤 Export
              </button>

              <button
                onClick={onRefresh}
                style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🔄 Refresh
              </button>

              <button
                onClick={handleAddProduct}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ➕ Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  <th style={headerStyle}>SKU</th>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Type</th>
                  <th style={headerStyle}>Supplier</th>
                  <th style={headerStyle}>Qty</th>
                  <th style={headerStyle}>Reorder</th>
                  <th style={headerStyle}>Price</th>
                  <th style={headerStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p, idx) => (
                  <tr
                    key={p.id}
                    style={{
                      background: idx % 2 === 0 ? '#f9fafb' : 'white',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#f9fafb' : 'white'}
                  >
                    <td style={cellStyle}>
                      <span style={{
                        background: '#ede9fe',
                        color: '#6b21a8',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {p.sku}
                      </span>
                    </td>
                    <td style={{...cellStyle, fontWeight: '600', color: '#1f2937'}}>{p.name}</td>
                    <td style={cellStyle}>
                      <span style={{
                        background: p.type === 'raw' ? '#dbeafe' : '#fef3c7',
                        color: p.type === 'raw' ? '#1e40af' : '#92400e',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {p.type === 'raw' ? '🌿 Raw' : '📦 Finished'}
                      </span>
                    </td>
                    <td style={cellStyle}>{p.supplier?.name || '—'}</td>
                    <td style={{...cellStyle, fontWeight: '600'}}>{p.quantity}</td>
                    <td style={cellStyle}>{p.reorderLevel}</td>
                    <td style={{...cellStyle, fontWeight: '700', color: '#059669'}}>
                      ${p.price?.toFixed(2)}
                    </td>
                    <td style={cellStyle}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditProduct(p)}
                          style={{
                            padding: '8px 12px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#2563eb'}
                          onMouseOut={(e) => e.target.style.background = '#3b82f6'}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{
                            padding: '8px 12px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#dc2626'}
                          onMouseOut={(e) => e.target.style.background = '#ef4444'}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div style={{
                padding: '60px',
                textAlign: 'center',
                color: '#9ca3af',
                fontSize: '18px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📦</div>
                No products found
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '25px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '20px 20px 0 0'
              }}>
                <h3 style={{
                  margin: 0,
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700'
                }}>
                  {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    fontSize: '28px',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                >
                  ×
                </button>
              </div>

              <div style={{ padding: '30px' }}>
                {formError && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    border: '2px solid #fecaca',
                    fontWeight: '600'
                  }}>
                    ⚠️ {formError}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px'
                }}>
                  <div>
                    <label style={labelStyle}>SKU (Auto Generated)</label>
                    <input
                      type="text"
                      name="sku"
                      value={productFormData.sku}
                      readOnly
                      style={{...inputStyle, background: '#f3f4f6', cursor: 'not-allowed'}}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={productFormData.name}
                      onChange={handleFormInputChange}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Type *</label>
                    <select
                      name="type"
                      value={productFormData.type}
                      onChange={handleFormInputChange}
                      style={inputStyle}
                    >
                      <option value="raw">Raw Material</option>
                      <option value="finished">Finished Goods</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Supplier *</label>
                    <select
                      name="supplierId"
                      value={productFormData.supplierId}
                      onChange={handleFormInputChange}
                      style={inputStyle}
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
                    <label style={labelStyle}>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={productFormData.quantity}
                      onChange={handleFormInputChange}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Reorder Level</label>
                    <input
                      type="number"
                      name="reorderLevel"
                      value={productFormData.reorderLevel}
                      onChange={handleFormInputChange}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={productFormData.price}
                      onChange={handleFormInputChange}
                      step="0.01"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '15px',
                  marginTop: '30px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => setShowAddModal(false)}
                    style={{
                      padding: '12px 24px',
                      background: '#e5e7eb',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#d1d5db'}
                    onMouseOut={(e) => e.target.style.background = '#e5e7eb'}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    disabled={formLoading}
                    style={{
                      padding: '12px 24px',
                      background: formLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: formLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                    }}
                    onMouseOver={(e) => !formLoading && (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    {formLoading ? '⏳ Saving...' : editingProduct ? '💾 Update Product' : '✨ Create Product'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const headerStyle = {
  padding: '18px 16px',
  textAlign: 'left',
  color: 'white',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const cellStyle = {
  padding: '16px',
  fontSize: '14px',
  color: '#4b5563',
  borderBottom: '1px solid #f3f4f6'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};

export default Products;