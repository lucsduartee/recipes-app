import React, { useContext, useState } from 'react';
import {
  ButtonGroup,
  Button,
  Container,
} from '@material-ui/core';
import GlobalContext from '../context/GlobalContext';

function FilterDrink() {
  const { setDrinks, categoryDrinks, fetchRecipes } = useContext(GlobalContext);
  const [saveCate, setSaveCate] = useState();
  const MAX_MAP = 5;

  const handleClick = async (category) => {
    if (saveCate === category || category === 'All') {
      fetchRecipes('thecocktaildb');
      setSaveCate('');
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await response.json();
      setDrinks(json);
      setSaveCate(category);
    }
  };

  return (
    <Container 
      sx={ {
        marginBottom: 2,
        marginTop: 2,
        display: 'flex',
        justifyContent: 'center',
    } }>
      <ButtonGroup
        size="small"
        variant="text"
        sx={ {
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '100%',
        } }
      >
        {categoryDrinks.drinks && categoryDrinks.drinks
          .map((category, index) => (index < MAX_MAP && (
            <Button
              onClick={ () => handleClick(category.strCategory) }
            >
              {category.strCategory}
            </Button>
          )))}
        <Button
          onClick={ () => handleClick('All') }
        >
          All
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default FilterDrink;
