import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="cart-icon">
      🛒
      {totalItems > 0 && <span className="item-count">{totalItems}</span>}
    </Link>
  );
};

export default CartIcon;
