import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image || product.imageUrl || '/images/p.jpg'} 
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <button
            onClick={() => onAddToCart(product)}
            className="quick-add-btn"
          >
            <span className="add-icon">+</span>
            <span>Quick Add</span>
          </button>
        </div>
        <div className="product-badge">Premium</div>
      </div>
      <div className="product-info">
        <div className="product-category">Ceylon Tea</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <span className="rating-text">(4.9)</span>
        </div>
        <div className="product-footer">
          <div className="price-container">
            <span className="product-price">${product.price}</span>
            <span className="price-unit">per 100g</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="add-to-cart"
          >
            <span className="cart-icon">🛒</span>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;