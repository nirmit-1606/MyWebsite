import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const {
    image,
    name,
    cuisine,
    rating
  } = recipe;

  return (
    <div className="recipe-card">
      <img src={image} alt={name} className="recipe-image" />
      <div className="recipe-details">
        <h3>{name}</h3>
        <p>{cuisine} | ⭐ {rating}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
