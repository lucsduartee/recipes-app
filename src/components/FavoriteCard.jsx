import React, { useState } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import Favorite from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import { Card, CardContent, CardMedia, CardActions, IconButton, Snackbar, Button } from '@material-ui/core';

function FavoriteCard({ index, favorite, setUpdate }) {
  const [open, setOpen] = useState(false);
  const { type, area, category, alcoholicOrNot, name, image, id } = favorite;
  const horizontalTopText = type === 'comida' ? `${area} - ${category}` : alcoholicOrNot;

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

  const handleClickDisFav = (idRef) => {
    const fromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const setStorage = fromStorage.filter((ele) => ele.id !== idRef);
    localStorage.setItem('favoriteRecipes', JSON.stringify(setStorage));
    setUpdate((s) => !s);
  };

  return (
    <Card
      sx={{
        marginTop: 3,
      }}
    >
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <CardMedia
          component="img"
          height="140"
          image={ image }
          alt={ name }
        />
      </Link>
      <CardContent>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {horizontalTopText}
        </p>
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {name}
          </h3>
        </Link>
        <CardActions>
          <IconButton
            // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
            // Gary Vernon Grubb
            onClick={ () => {
              window.navigator.clipboard
                .writeText(`http://localhost:3000${type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`}`);
              setOpen(true);
            } }
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={ () => handleClickDisFav(id) }
          >
            <Favorite color="secondary"/>
          </IconButton>
        </CardActions>
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

FavoriteCard.propTypes = {
  index: P.number.isRequired,
  favorite: P.objectOf(P.any).isRequired,
  setUpdate: P.func.isRequired,
};

export default FavoriteCard;
