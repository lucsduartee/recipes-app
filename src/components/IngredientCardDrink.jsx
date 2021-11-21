import React from 'react';
import P from 'prop-types';

function IngredientCardDrink({ index, ingredient }) {
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
        alt={ ingredient.strIngredient1 }
        data-testid={ `${index}-card-img` }
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { ingredient.strIngredient1 }
      </h3>
    </div>
  );
}

IngredientCardDrink.propTypes = {
  index: P.number.isRequired,
  ingredient: P.objectOf(P.any).isRequired,
};

export default IngredientCardDrink;
