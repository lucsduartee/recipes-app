import React from 'react';
import P from 'prop-types';

function IngredientCardFood({ index, ingredient }) {
  return (
    <>
      <img
        src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
        alt={ ingredient.strIngredient }
        data-testid={ `${index}-card-img` }
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { ingredient.strIngredient }
      </h3>
    </>
  );
}

IngredientCardFood.propTypes = {
  index: P.number.isRequired,
  ingredient: P.objectOf(P.any).isRequired,
};

export default IngredientCardFood;
