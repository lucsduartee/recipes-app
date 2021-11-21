import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import GlobalContext from '../context/GlobalContext';
import '../css/recipeProgress.css';

if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
    meals: {} }));
}
if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

function DrinkInProgress({ match: { params: { id } } }) {
  const { listIngredient, isFavorite, saveFavoriteDrink,
    setisFavorite } = useContext(GlobalContext);
  const [api, saveApi] = useState({});
  const [message, setMessage] = useState(false);
  const [check, setCheck] = useState({
    ingredientName: '',
    checked: '',
  });
  const history = useHistory();

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    (async () => {
      setisFavorite(false);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve);
      const findFav = favoriteRecipes !== null
      && favoriteRecipes.find((recipeId) => recipeId.id === resolve.drinks[0].idDrink);
      if (findFav) { setisFavorite(true); }
      setCheck(listIngredient(resolve, 'drinks')
        .reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
        meals: { [id]: check } }));
    })();
  }, []);

  const handleClick = ({ target }) => {
    setCheck({ ...check, [target.name]: target.checked });
    const progressRecipe = { ...progressRecipes,
      cocktails:
       { ...progressRecipes.cocktails,
         [id]: [
           { ...check, [target.name]: target.checked }] } };
    if (progressRecipes !== null && target.checked) {
      console.log(progressRecipes);

      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    }
  };

  const drinkProgress = () => (
    <div>
      <img
        src={ api.drinks[0].strDrinkThumb }
        data-testid="recipe-photo"
        alt="recipe name"
      />
      <h2 data-testid="recipe-title">{api.drinks[0].strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // Gary Vernon Grubb
        onClick={ () => {
          window.navigator.clipboard.writeText(`http://localhost:3000${id}`);
          setMessage(true);
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
        { message && <p>Link copiado!</p> }
      </button>
      <button
        type="button"
        onClick={ () => saveFavoriteDrink(api.drinks[0]) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
        />
      </button>
      <h4 data-testid="recipe-category">{api.drinks[0].strCategory}</h4>
      { listIngredient(api, 'drinks').map((ingredient, index) => (
        ingredient !== '' && (
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${index}-ingredient-step` }
            key={ index }
            className={ check[ingredient] === true && 'recipeProgress' }
          >
            {ingredient}
            <input
              type="checkbox"
              name={ ingredient }
              id={ `${index}-ingredient-step` }
              onClick={ handleClick }
            />
          </label>)
      ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">
        {api.drinks[0].strInstructions}
      </p>
      <button
        onClick={ () => history.push('/receitas-feitas') }
        type="button"
        disabled={ (() => {
          const checkvalue = Object.values(check)
            .some((ingredient) => ingredient === false);
          return checkvalue;
        })() }
        data-testid="finish-recipe-btn"
      >
        Finalizar receita

      </button>
    </div>
  );

  return (
    <div>
      { api.drinks !== undefined ? drinkProgress() : <h1>loading</h1> }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkInProgress;
