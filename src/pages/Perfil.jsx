import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ButtonGroup,
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const history = useHistory();

  const onClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    if (!localStorage.user) {
      localStorage.setItem('user', JSON.stringify({ email: 'guest@email.com' }));
    }
  }, []);

  const playerEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header title="Profile" hasBtn={ false } />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Typography variant="h5" data-testid="profile-email">
          User: { playerEmail !== null && playerEmail.email }
        </Typography>
        <ButtonGroup
          orientation="vertical"
          sx={{
            marginTop: 5,
          }}
        >
          <Button
            onClick={ () => history.push('/receitas-feitas') }
          >
            Recipes Done
          </Button>
          <Button
            onClick={ () => history.push('/receitas-favoritas')}
          >
            Favorite Recipes
          </Button>
          <Button
            onClick={ onClick }
          >
            Logout
          </Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </>
  );
}

export default Perfil;
