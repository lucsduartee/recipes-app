import React, { useState } from 'react';
import Header from '../components/Header';
import RecipesDoneCard from '../components/RecipesDoneCard';

function RecipesDone() {
  const [filter, setFilter] = useState('all');

  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    return storage;
  };

  return (
    <div>
      <Header title="Receitas Feitas" hasBtn={ false } />
      <div>
        <button
          onClick={ () => setFilter('comida') }
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          onClick={ () => setFilter('bebida') }
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drink
        </button>
        <button
          onClick={ () => setFilter('all') }
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
      </div>
      {getStorage() !== null && getStorage()
        .filter((favorite) => (filter === 'all' ? favorite : favorite.type === filter))
        .map((rec, index) => (
          <RecipesDoneCard key={ index } index={ index } recipe={ rec } />
        ))}
    </div>
  );
}

export default RecipesDone;
