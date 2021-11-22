import React, { useState, useEffect } from 'react';
import { ButtonGroup, Container, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();
  const [surprise, setSurprise] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await response.json();
      setSurprise(json);
    })();
  }, []);

  return (
    <div>
      <Header title="Explore Meals" hasBtn={ false } />
      <Container
        sx={{
          marginTop: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ButtonGroup
          orientation="vertical"
        >
          <Button
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            By ingredients
          </Button>
          <Button
            data-testid="explore-surprise"
            type="button"
            onClick={ () => history.push(`/comidas/${surprise.meals[0].idMeal}`) }
          >
            Surprise me!
          </Button>
          <Button
            data-testid="explore-by-area"
            type="button"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            By place of origin
          </Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
