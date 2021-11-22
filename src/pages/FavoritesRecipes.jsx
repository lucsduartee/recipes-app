import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, Button } from '@material-ui/core';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FavoritesRecipes() {
  const [shouldUpdate, setShouldUpdateFavorite] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {}, [shouldUpdate]);

  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return storage;
  };

  return (
    <div>
      <Header title="Favorite Recipes" hasBtn={ false } />
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
            onClick={ () => setFilter('comida') }
          >
            Food
          </Button>
          <Button
            onClick={ () => setFilter('bebida') }
          >
            Drink
          </Button>
          <Button
            onClick={ () => setFilter('all') }
          >
            All
          </Button>
        </ButtonGroup>
        { getStorage() !== null && getStorage()
          .filter((favorite) => (filter === 'all' ? favorite : favorite.type === filter))
          .map((favorite, index) => (
            <FavoriteCard
              setUpdate={ setShouldUpdateFavorite }
              key={ index }
              index={ index }
              favorite={ favorite }
            />
          ))}
      </Container>
      <Footer />
    </div>
  );
}

export default FavoritesRecipes;
