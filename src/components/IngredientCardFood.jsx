import React from 'react';
import P from 'prop-types';
import { Card, CardContent, CardMedia } from '@material-ui/core';

function IngredientCardFood({ index, ingredient }) {
  return (
    <Card
      sx={{
        maxWidth: '100%',
      }}
    >
      <CardMedia
        image={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
        alt={ ingredient.strIngredient }
        component="img"
        height="140"
      />
      <CardContent>
        <h3
          data-testid={ `${index}-card-name` }
        >
          { ingredient.strIngredient }
        </h3>
      </CardContent>
    </Card>
  );
}

IngredientCardFood.propTypes = {
  index: P.number.isRequired,
  ingredient: P.objectOf(P.any).isRequired,
};

export default IngredientCardFood;
