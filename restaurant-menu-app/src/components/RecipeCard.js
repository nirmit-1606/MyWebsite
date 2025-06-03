import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const {
    image,
    name,
    cuisine,
    caloriesPerServing,
    rating,
    price = (caloriesPerServing / 20).toFixed(2) // Sample logic to assign price
  } = recipe;

  const handleAddToCart = () => {
    alert(`Added ${name} to cart`);
    // You can replace this alert with Redux dispatch logic later
  };

  return (
    <div className="recipe-card">
      <img src={image} alt={name} className="recipe-image" />
      <div className="recipe-details">
        <h3>{name}</h3>
        <p>{cuisine} | ⭐ {rating}</p>
        <p className="price">${price}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default RecipeCard;
