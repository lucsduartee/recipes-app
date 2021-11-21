import React from 'react';
import P from 'prop-types';

function RecipeCard({ src, str, id }) {
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img
        data-testid={ `${id}-card-img` }
        src={ src }
        alt={ str }
      />
      <p data-testid={ `${id}-card-name` }>{ str }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  str: P.objectOf(P.any).isRequired,
  src: P.objectOf(P.any).isRequired,
  id: P.number.isRequired,
};

export default RecipeCard;
