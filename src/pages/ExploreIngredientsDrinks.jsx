import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCardDrink from '../components/IngredientCardDrink';

function ExploreIngredientsDrinks() {
  const [ingredients, setIngredients] = useState();
  const [loading, setLoading] = useState(true);
  const MAX_NUMBER = 11;

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const json = await response.json();
      setIngredients(json);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" hasBtn={ false } />
      <Container
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        { !loading && ingredients.drinks.map((ingredient, index) => (
          index <= MAX_NUMBER && (
            <IngredientCardDrink
              key={ index }
              index={ index }
              ingredient={ ingredient }
            />
          )
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default ExploreIngredientsDrinks;
