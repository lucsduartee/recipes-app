import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardHeader,
  IconButton,
  Avatar,
  CardContent,
  Button,
  Snackbar,
  FormGroup,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Container,
} from '@material-ui/core';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GlobalContext from '../context/GlobalContext';
import '../css/recipeProgress.css';
import Footer from '../components/Footer';

if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
    meals: {} }));
}
if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

function DrinkInProgress({ match: { params: { id } } }) {
  const { listIngredient, isFavorite, saveFavoriteDrink,
    setisFavorite } = useContext(GlobalContext);
  const [api, saveApi] = useState({});
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState({
    ingredientName: '',
    checked: '',
  });
  const history = useHistory();

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    (async () => {
      setisFavorite(false);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve);
      const findFav = favoriteRecipes !== null
      && favoriteRecipes.find((recipeId) => recipeId.id === resolve.drinks[0].idDrink);
      if (findFav) { setisFavorite(true); }
      setCheck(listIngredient(resolve, 'drinks')
        .reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
        meals: { [id]: check } }));
    })();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = ({ target }) => {
    setCheck({ ...check, [target.name]: target.checked });
    const progressRecipe = { ...progressRecipes,
      cocktails:
       { ...progressRecipes.cocktails,
         [id]: [
           { ...check, [target.name]: target.checked }] } };
    if (progressRecipes !== null && target.checked) {
      console.log(progressRecipes);

      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const drinkProgress = () => (
    <Card sx={{ maxWidth: '90%', margin: '0 auto'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#428e92' }} aria-label="recipe">
            {api.drinks[0].strDrink[0]}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={ () => history.push('/bebidas')}
          >
            <LocalBarIcon/>
          </IconButton>
        }
        title={`Category: ${api.drinks[0].strCategory}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={ api.drinks[0].strDrinkThumb }
        alt={ api.drinks[0].strDrink }
      />
      <CardContent>
        <h2 data-testid="recipe-title">{api.drinks[0].strDrink}</h2>
        <IconButton
          // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          // Gary Vernon Grubb
          onClick={ () => {
            window.navigator.clipboard.writeText(`http://localhost:3000/bebidas/${api.drinks[0].idDrink}`);
            setOpen(true);
          } }
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          type="button"
          onClick={ () => saveFavoriteDrink(api.drinks[0]) }
        >
          { isFavorite ? <Favorite color="secondary"/> : <FavoriteBorder /> }
        </IconButton>
        <FormGroup>
          { listIngredient(api, 'drinks').map((ingredient) => (
            ingredient !== '' && (
              <FormControlLabel
                className={ check[ingredient] === true && 'recipeProgress' }
                control={
                  <Checkbox
                    name={ ingredient }
                    onClick={ handleClick }
                  />
                }
                label={ ingredient }
                onClick={ handleClick }
            />
            )
          ))}
        </FormGroup>
        <p data-testid="instructions">
          <h3>Instructions</h3>
          {api.drinks[0].strInstructions}
        </p>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={ <DoneAllIcon />}
          onClick={ () => history.push('/receitas-feitas') }
          disabled={ (() => {
            const checkvalue = Object.values(check)
              .some((ingredient) => ingredient === false);
            return checkvalue;
          })() }
        >
          Finish Recipe
        </Button>
      </CardContent>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Link copied"
        action={action}
      />
      <Footer />
    </Card>
  );

  return (
    <div>
      { api.drinks !== undefined
        ? drinkProgress()
        : (
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50%',
              }}
            >
              <CircularProgress />
              <h1>Loading...</h1>
            </Container>
        )
      }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkInProgress;
