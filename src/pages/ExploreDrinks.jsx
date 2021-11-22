import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup, Container, Button } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  const [surprise, setSurprise] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const json = await response.json();
      setSurprise(json);
    })();
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" hasBtn={ false } />
      <Container
        sx={{
          marginTop: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ButtonGroup orientation="vertical">
          <Button
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          >
            By ingredients
          </Button>
          <Button
            data-testid="explore-surprise"
            type="button"
            onClick={ () => history.push(`/bebidas/${surprise.drinks[0].idDrink}`) }
          >
            Surprise me!
          </Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
