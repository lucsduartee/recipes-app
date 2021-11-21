import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecomendationsCard from './RecomendationsCard';

function DetailPage({ api, nameandMeasure, recomendations, url }) {
  const [message, setMessage] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);
  const MAX_RECOMENDATIONS = 6;

  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (favoriteRecipes !== null) {
      const findFav = favoriteRecipes !== null
      && favoriteRecipes.find((recipeId) => recipeId.id === api.idMeal);
      console.log(findFav);
      if (findFav) { setisFavorite(true); }
    }
  }, []);

  const saveFavorite = () => {
    if (!isFavorite) {
      const fav = [...favoriteRecipes, {
        id: api.idMeal,
        type: 'comida',
        area: api.strArea,
        category: api.strCategory,
        alcoholicOrNot: '',
        name: api.strMeal,
        image: api.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
      setisFavorite(true);
    } else {
      const filtredFav = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== api.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtredFav));
      setisFavorite(false);
    }
  };

  return (
    <>
      <img data-testid="recipe-photo" src={ api.strMealThumb } alt={ api.Meal } />
      <h2 data-testid="recipe-title">{api.strMeal}</h2>
      <button
        type="button"
        data-testid="share-btn"
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // Gary Vernon Grubb
        onClick={ () => {
          window.navigator.clipboard.writeText(`http://localhost:3000${url}`);
          setMessage(true);
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
        { message && <p>Link copiado!</p> }
      </button>
      <button
        type="button"
        onClick={ saveFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
        />
      </button>
      <h4 data-testid="recipe-category">{api.strCategory}</h4>
      <ul>
        {nameandMeasure()
          .map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              {ingredient}
            </li>))}
      </ul>
      <p data-testid="instructions">{api.strInstructions}</p>
      <div className="video-responsive">
        <iframe
          data-testid="video"
          width="853"
          height="480"
          src={ `https://www.youtube.com/embed/${api.strYoutube.split('=')[1]}` }
          frameBorder="0"
          allow={ `accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture` }
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="carousel-div">
        {recomendations.drinks && recomendations.drinks.map((recomendation, index) => (
          index < MAX_RECOMENDATIONS
        && (<RecomendationsCard
          key={ recomendation.strDrink }
          img={ recomendation.strDrinkThumb }
          title={ recomendation.strDrink }
          index={ index }
        />)
        ))}
      </div>
    </>
  );
}

DetailPage.propTypes = {
  api: PropTypes.objectOf(PropTypes.string).isRequired,
  nameandMeasure: PropTypes.objectOf(PropTypes.string).isRequired,
  recomendations: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailPage;
