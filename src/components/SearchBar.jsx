import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function SearchBar() {
  const { setMeals, setDrinks } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('');
  const history = useHistory();

  const { location: { pathname } } = history;

  const trow = (json, type, path, id) => {
    console.log(json);
    if (json[type] === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (json[type].length === 1) { history.push(`${path}/${json[type][0][id]}`); }
    if (path === '/comidas' && json[type].length > 1) { setMeals(json); }
    if (path === '/bebidas' && json[type].length > 1) { setDrinks(json); }
  };

  const requestSwitch = async (path, opt, src) => {
    const pathName = path === '/comidas' ? 'themealdb' : 'thecocktaildb';
    const type = path === '/comidas' ? 'meals' : 'drinks';
    const id = path === '/comidas' ? 'idMeal' : 'idDrink';
    switch (opt) {
    case 'ingredient': {
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/filter.php?i=${src}`);
      const json = await response.json();
      trow(json, type, path, id);
      break;
    }
    case 'name': {
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?s=${src}`);
      const json = await response.json();
      trow(json, type, path, id);
      break;
    }
    case 'initialLetter': {
      if (src.length > 1) global.alert('Sua busca deve conter somente 1 (um) caracter');
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?f=${src}`);
      const json = await response.json();
      trow(json, type, path, id);
      break;
    }
    default:
      break;
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        value={ search }
        type="text"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="options-search"
          type="radio"
          id="ingredient"
          value="ingredient"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="options-search"
          type="radio"
          id="name"
          value="name"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          name="options-search"
          type="radio"
          id="first-letter"
          value="initialLetter"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Letra Inicial
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => requestSwitch(pathname, option, search) }
      >
        Buscar
      </button>
    </form>);
}

export default SearchBar;
