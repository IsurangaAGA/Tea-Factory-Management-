import React, { useState, useEffect } from 'react';
import ProductCard from '../shop/ProductCard';
import Cart from '../shop/Cart';
import { products } from '../data/products';

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('teaFactoryCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('teaFactoryCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    window.location.href = '/orders';
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="container">
          <div className="shop-hero-content">
            <h1 className="shop-title">Premium Tea Collection</h1>
            <p className="shop-subtitle">Discover our finest selection of Ceylon teas, carefully curated for the perfect cup</p>
            <div className="shop-stats">
              <div className="stat">
                <span className="stat-number">{products.length}</span>
                <span className="stat-label">Premium Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Natural & Organic</span>
              </div>
              <div className="stat">
                <span className="stat-number">⭐ 4.9</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Header */}
      <div className="shop-header-section">
        <div className="container">
          <div className="shop-header">
            <div className="shop-header-left">
              <h2>Our Tea Collection</h2>
              <p>Handpicked teas from the finest gardens</p>
            </div>
            <div className="shop-header-right">
              <button onClick={() => setShowCart(!showCart)} className="cart-button">
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Cart</span>
                {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button onClick={() => setShowCart(false)} className="close-cart">✕</button>
            </div>
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPage;
