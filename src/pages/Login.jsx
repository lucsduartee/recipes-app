import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../images/logo.png';

const containerStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 'auto',
    width: '80%',
    height: '100vh',
    boxSizing: 'content-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: 'Lobster, cursive',
  },
  logo: {
    width: 200,
  },
  inputs: {
    width: '100%',
    marginTop: 10,
  },
});

function Login() {
  const [email, saveEmail] = useState('');
  const [password, savePassword] = useState('');
  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const styles = containerStyles();


  useEffect(() => {
    const MIN_LENGTH = 7;
    const docLogin = document.getElementById('login');
    setDisable(!docLogin.checkValidity() || password.length < MIN_LENGTH);
  }, [email, password]);

  const handleclick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    if (email === undefined || email.length === 0 || email === null) {
      localStorage.setItem('user', JSON.stringify({ email: 'guest@email.com' }));
    } else {
      localStorage.setItem('user', JSON.stringify({ email }));
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals: {} }));
    history.push('/comidas');
  };

  return (
    <Container
      sx={ {
        background: 'linear-gradient(357deg, rgba(255,241,213,1) 0%, rgba(196,252,255,1) 100%)',
      } }
    >
      <div className={ styles.container }>
        <img
          src={ logo }
          alt="Logo do App"
          className={ styles.logo }
        />
        <h1 className={ styles.title } >
          App de Receitas
        </h1>
        <form className={ styles.form } id="login">
          <Container
            sx={{ padding: 0,
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <TextField
              id="emailInput"
              // Pattern from:
              // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_pattern3
              // https://www.w3schools.com/tags/att_input_pattern.asp
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={ ({ target }) => saveEmail(target.value) }
              data-testid="email-input"
              label="Email"
              variant="outlined"
              required
              className={ styles.inputs }
            />
            <TextField
              id="passwordInput"
              minLength={ 7 }
              onChange={ ({ target }) => savePassword(target.value) }
              type="password"
              data-testid="password-input"
              label="Senha"
              variant="outlined"
              required
              className={ styles.inputs }
            />
          </Container>
          <Button
            id="submitBtn"
            onClick={ handleclick }
            data-testid="login-submit-btn"
            color="primary"
            variant="contained"
            disabled={ disable }
            className={ styles.button }
          >
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
