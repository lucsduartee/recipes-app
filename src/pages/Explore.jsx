import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ButtonGroup, Container, Button } from '@material-ui/core';

function Explore() {
  const history = useHistory();

  return (
    <div>
      <Header title="Explore" hasBtn={ false } />
      <Container
        sx={{
          marginTop: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ButtonGroup
          sx={{
            alignSelf: 'center',
          }}
        >
          <Button
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explore Meals
          </Button>
          <Button
            onClick={ () => history.push('/explorar/bebidas') }
          >
            Explore Drinks
          </Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </div>
  );
}

export default Explore;
