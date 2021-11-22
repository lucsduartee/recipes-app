import React, { useContext, useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function SearchBar() {
  const { setMeals, setDrinks } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('');
  const history = useHistory();

  const { location: { pathname } } = history;

  const trow = (json, type, path, id) => {
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
    <Container sx={ {
      marginBottom: 2,
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      } }
    >
      <FormControl
        component="form"
      >
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="ingredient"
            control={ <Radio /> }
            label="Ingredient"
            onChange={ ({ target }) => setOption(target.value) }
          />
          <FormControlLabel
            value="name"
            control={ <Radio /> }
            label="Name"
            onChange={ ({ target }) => setOption(target.value) }
          />
          <FormControlLabel
            value="initialLetter"
            control={ <Radio /> }
            label="First Letter"
            onChange={ ({ target }) => setOption(target.value) }
          />
        </RadioGroup>
        <TextField
          value={ search }
          variant="outlined"
          label="Ingrediente, nome..."
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <Button
          variant="contained"
          onClick={ () => requestSwitch(pathname, option, search) }
        >
          Buscar
        </Button>
      </FormControl>
    </Container>);
}

export default SearchBar;
