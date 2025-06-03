import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import CartIcon from './components/CartIcon';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/menu">Menu</Link>
        </nav>
        <CartIcon />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

export default App;
