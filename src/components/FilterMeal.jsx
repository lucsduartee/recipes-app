import React, { useContext, useState } from 'react';
import {
  ButtonGroup,
  Button,
  Container,
} from '@material-ui/core';
import GlobalContext from '../context/GlobalContext';

function FilterMeal() {
  const { categoryMeals, setMeals, fetchRecipes } = useContext(GlobalContext);
  const [saveCate, setSaveCate] = useState();
  const MAX_MAP = 5;

  const handleClick = async (category) => {
    if (saveCate === category || category === 'All') {
      fetchRecipes('themealdb');
      setSaveCate('');
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await response.json();
      setMeals(json);
      setSaveCate(category);
    }
  };

  return (
    <Container>
      <ButtonGroup
        size="small"
        variant="text"
        sx={ {
          display: 'flex',
          flexWrap: 'wrap',
        } }
      >
        {categoryMeals.meals && categoryMeals.meals
          .map((category, index) => (index < MAX_MAP && (
            <Button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleClick(category.strCategory) }
            >
              {category.strCategory}
            </Button>
          )))}
        <Button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClick('All') }
        >
          All
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default FilterMeal;

{/* <FormControl sx={{ width: 200, marginTop: 10,  zIndex: '100' }}>
<InputLabel id="demo-simple-select-helper-label">Categorias</InputLabel>
<Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  value={ saveCate }
  label="Categorias"
>
{categoryMeals.meals && categoryMeals.meals
  .map((category, index) => (index < MAX_MAP && (
    <MenuItem
      key={ index }
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ () => handleClick(category.strCategory) }
    >
      {category.strCategory}
    </MenuItem>
  )))}
  <MenuItem
    type="button"
    data-testid="All-category-filter"
    onClick={ () => handleClick('All') }
  >
    All
</MenuItem>
</Select>
</FormControl> */}