import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './CartIcon.css';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showPreview, setShowPreview] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div
      className="cart-wrapper"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <div className={`cart-icon ${animate ? 'bounce' : ''}`} title="View Cart">
        <Link to="/cart">
          <ShoppingCart size={24} />
          {totalItems > 0 && <span className="item-count">{totalItems}</span>}
        </Link>
      </div>

      {showPreview && cart.length > 0 && (
        <div className="cart-preview">
          {cart.map(item => (
            <div key={item.id} className="preview-item">
              <img src={item.image} alt={item.name} />
              <div className="preview-details">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">× {item.quantity}</span>
              </div>
              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
