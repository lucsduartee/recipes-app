import React, { useState } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [done, setDone] = useState(false);
  const [progress, setprogress] = useState(false);
  const [stateEmail, setStateEmail] = useState('guest');
  const [drinks, setDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const [filtredMeals, setFiltredMeals] = useState([]);
  const [filtredMealsByCategory, setFiltredMealsByCategory] = useState([]);
  const [filtredDrinksByCategory, setFiltredDrinksByCategory] = useState([]);
  const [showBar, setShowBar] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);

  const fetchRecipes = async (param) => {
    const response = await fetch(`https://www.${param}.com/api/json/v1/1/search.php?s=`);
    const resFilters = await fetch(`https://www.${param}.com/api/json/v1/1/list.php?c=list`);
    const json = await response.json();
    const jsonFilters = await resFilters.json();
    if (param === 'themealdb') {
      setMeals(json);
      setCategoryMeals(jsonFilters);
      setFiltredMeals(json);
    }
    if (param === 'thecocktaildb') {
      setDrinks(json);
      setCategoryDrinks(jsonFilters);
      setFiltredDrinks(json);
    }
  };

  const getLocal = (id, type) => {
    setDone(false);
    setprogress(false);
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (doneLocal !== null) {
      const findDone = doneLocal.find((recipeId) => recipeId.id === id);
      if (findDone) { setDone(true); }
    }
    if (doneProgress !== null) {
      const findinProgress = doneProgress !== null ? doneProgress[type][id] : null;
      if (findinProgress !== undefined) { setprogress(true); }
    }
  };

  const listIngredient = (api, type) => {
    const ingredientsList = [];
    const NUMBER_TWEENTY = 20;
    if (api[type] !== undefined) {
      for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
        const str = `strIngredient${index}`;

        if (api[type][0][str] !== ''
        && api[type][0][str] !== null && api[type][0][str] !== undefined) {
          ingredientsList
            .push(api[type][0][str]);
        }
      }
    }
    return ingredientsList;
  };

  const saveFavoriteMeal = (api) => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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

  const saveFavoriteDrink = (api) => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!isFavorite) {
      const fav = [...favoriteRecipes, {
        id: api.idDrink,
        type: 'bebida',
        area: '',
        category: api.strCategory,
        alcoholicOrNot: api.strAlcoholic,
        name: api.strDrink,
        image: api.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
      setisFavorite(true);
    } else {
      const filtredFav = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== api.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtredFav));
      setisFavorite(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={ {
        meals,
        drinks,
        categoryDrinks,
        categoryMeals,
        fetchRecipes,
        getLocal,
        done,
        progress,
        stateEmail,
        setStateEmail,
        setFiltredDrinks,
        setFiltredMeals,
        filtredDrinks,
        filtredMeals,
        setDrinks,
        setMeals,
        showBar,
        setShowBar,
        filtredMealsByCategory,
        setFiltredMealsByCategory,
        setFiltredDrinksByCategory,
        filtredDrinksByCategory,
        listIngredient,
        isFavorite,
        saveFavoriteMeal,
        saveFavoriteDrink,
        setisFavorite } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
