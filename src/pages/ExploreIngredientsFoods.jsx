import React, { useEffect, useState } from 'react';
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
      <Header title="Explorar Ingredientes" hasBtn={ false } />
      <div>
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
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngredientsFoods;
