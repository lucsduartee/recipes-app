import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from '@material-ui/core';
import P from 'prop-types';

function RecipeCard({ src, str }) {
  return (
    <Container sx={ {
      marginBottom: 2,
      } }
    >
      <Card sx={{ maxWidth: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={ src }
          alt={ str }
        />
        <CardContent>
          <Typography variant="h5">{ str }</Typography>  
        </CardContent>
      </Card>
    </Container>
  );
}

RecipeCard.propTypes = {
  str: P.objectOf(P.any).isRequired,
  src: P.objectOf(P.any).isRequired,
  id: P.number.isRequired,
};

export default RecipeCard;
