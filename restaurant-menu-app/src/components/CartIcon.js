import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './CartIcon.css';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <Link to="/cart" className={`cart-icon ${animate ? 'bounce' : ''}`} title="View Cart">
      <ShoppingCart size={24} />
      {totalItems > 0 && <span className="item-count">{totalItems}</span>}
    </Link>
  );
};

export default CartIcon;
