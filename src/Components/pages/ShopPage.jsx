import React, { useState, useEffect } from 'react';
import ProductCard from '../shop/ProductCard';
import Cart from '../shop/Cart';
import { products as staticProducts } from '../data/products';
import {
  getProducts
} from '../../services/api';

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState(staticProducts);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('teaFactoryCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('teaFactoryCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        if (isMounted && Array.isArray(response.data)) {
          // Map Spring Boot Product fields to frontend format
          const mappedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description || '',
            price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
            image: product.imageUrl || product.image || '/images/p.jpg',
            stock: product.stockQty || 0
          }));
          setProducts(mappedProducts.length ? mappedProducts : staticProducts);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load products', err);
        if (isMounted) {
          setError('Unable to load products from the server. Showing demo catalog.');
          setProducts(staticProducts);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {loading && <p>Loading products...</p>}
          {error && <p className="error-text">{error}</p>}
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
