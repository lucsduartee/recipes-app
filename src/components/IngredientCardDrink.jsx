import React from 'react';
import P from 'prop-types';
import { Card, CardContent, CardMedia } from '@material-ui/core';

function IngredientCardDrink({ index, ingredient }) {
  return (
    <Card
      sx={{
        maxWidth: '100%',
      }}
    >
      <CardMedia
        image={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}.png` }
        alt={ ingredient.strIngredient1 }
        component="img"
        height="140"
      />
      <CardContent>
        <h3
          data-testid={ `${index}-card-name` }
        >
          { ingredient.strIngredient1 }
        </h3>
      </CardContent>
    </Card>
  );
}

IngredientCardDrink.propTypes = {
  index: P.number.isRequired,
  ingredient: P.objectOf(P.any).isRequired,
};

export default IngredientCardDrink;
