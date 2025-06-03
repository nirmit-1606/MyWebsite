import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/menu">Menu</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

export default App;
