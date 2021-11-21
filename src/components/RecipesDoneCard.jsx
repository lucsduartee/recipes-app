import React, { useState } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function RecipesDoneCard({ index, recipe }) {
  const [shouldRenderMessage, setShouldRenderMessage] = useState(false);

  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  const handleClick = async (group, idRef) => {
    const url = group === 'comida' ? `/comidas/${idRef}` : `/bebidas/${idRef}`;
    await clipboardCopy(`http://localhost:3000${url}`);
    setShouldRenderMessage(true);
  };

  return (
    <div>
      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <img
          style={ { width: '150px' } }
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
      </p>
      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { doneDate }
      </p>
      <button
        type="button"
        onClick={ () => handleClick(type, id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      {
        type === 'comida' && tags.map((tag, indx) => (
          <p
            key={ indx }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      }
      {
        shouldRenderMessage && 'Link copiado!'
      }
    </div>
  );
}

RecipesDoneCard.propTypes = {
  index: P.number.isRequired,
  recipe: P.objectOf(P.any).isRequired,
};

export default RecipesDoneCard;
