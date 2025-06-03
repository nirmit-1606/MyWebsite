import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, addToCart } from '../features/cart/cartSlice';
// import './Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div className="qty-controls">
                <button onClick={() => dispatch(addToCart(item))}>+</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>-</button>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${getTotal()}</h3>
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
