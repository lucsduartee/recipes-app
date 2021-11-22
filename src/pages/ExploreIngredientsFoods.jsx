import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCardFood from '../components/IngredientCardFood';

function ExploreIngredientsFoods() {
  const [ingredients, setIngredients] = useState();
  const MAX_NUMBER = 11;

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const json = await response.json();
      setIngredients(json);
    })();
  }, []);

  console.log(ingredients);

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
        { ingredients && ingredients.meals.map((ingredient, index) => (
          index <= MAX_NUMBER && (
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <IngredientCardFood
                key={ index }
                index={ index }
                ingredient={ ingredient }
              />
            </div>
          )
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default ExploreIngredientsFoods;
