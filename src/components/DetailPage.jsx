import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Snackbar,
  Button,
  CardContent,
  CardActions,
  Collapse,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { useHistory } from 'react-router';
import RecomendationsCard from './RecomendationsCard';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

function DetailPage({ api, nameandMeasure, recomendations, url }) {
  const [isFavorite, setisFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const MAX_RECOMENDATIONS = 6;


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (favoriteRecipes !== null) {
      const findFav = favoriteRecipes !== null
      && favoriteRecipes.find((recipeId) => recipeId.id === api.idMeal);
      console.log(findFav);
      if (findFav) { setisFavorite(true); }
    }
  }, []);

  const saveFavorite = () => {
    if (!isFavorite) {
      const fav = [...favoriteRecipes, {
        id: api.idMeal,
        type: 'comida',
        area: api.strArea,
        category: api.strCategory,
        alcoholicOrNot: '',
        name: api.strMeal,
        image: api.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
      setisFavorite(true);
    } else {
      const filtredFav = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== api.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtredFav));
      setisFavorite(false);
    }
  };

  return (
    <Card sx={{ maxWidth: '90%', margin: '0 auto'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#428e92' }} aria-label="recipe">
            {api.strMeal[0]}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={ () => history.push('/comidas')}
          >
            <RestaurantIcon/>
          </IconButton>
        }
        title={`Category: ${api.strCategory}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={ api.strMealThumb }
        alt={ api.strMeal }
      />
      <CardContent>
        <h2 data-testid="recipe-category">{api.strMeal}</h2>
        <ul>
          {nameandMeasure()
            .map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {ingredient}
              </li>))}
        </ul>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          // Gary Vernon Grubb
          onClick={ () => {
            window.navigator.clipboard.writeText(`http://localhost:3000${url}`);
            setOpen(true);
          } }
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          type="button"
          onClick={ saveFavorite }
        >
          { isFavorite ? <Favorite /> : <FavoriteBorder /> }
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography data-testid="instructions">{api.strInstructions}</Typography>
          <CardMedia
            image={ `https://www.youtube.com/embed/${api.strYoutube.split('=')[1]}` }
            height="300"
            component="iframe"
            frameBorder="0"
            allowFullScreen
            allow={ `accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture` }
          />
        </CardContent>
      </Collapse>
      <CardContent>
        <div className="carousel-div">
          {recomendations.drinks && recomendations.drinks.map((recomendation, index) => (
            index < MAX_RECOMENDATIONS
          && (<RecomendationsCard
            key={ recomendation.strDrink }
            img={ recomendation.strDrinkThumb }
            title={ recomendation.strDrink }
            index={ index }
          />)
          ))}
        </div>
      </CardContent>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Link copied"
        action={action}
      />
    </Card>
  );
}

DetailPage.propTypes = {
  api: PropTypes.objectOf(PropTypes.string).isRequired,
  nameandMeasure: PropTypes.objectOf(PropTypes.string).isRequired,
  recomendations: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailPage;
