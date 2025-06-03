import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './CartIcon.css';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="cart-icon" title="View Cart">
      <ShoppingCart size={24} />
      {totalItems > 0 && <span className="item-count">{totalItems}</span>}
    </Link>
  );
};

export default CartIcon;
