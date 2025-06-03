import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    console.log(recipe);
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.name} />
      <h3>{recipe.name}</h3>
      <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
    </div>
  );
};

export default RecipeCard;
