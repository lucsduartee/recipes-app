import React, { useState } from 'react';
import Header from '../components/Header';
import { Container, ButtonGroup, Button } from '@material-ui/core';
import RecipesDoneCard from '../components/RecipesDoneCard';

function RecipesDone() {
  const [filter, setFilter] = useState('all');

  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    return storage;
  };

  return (
    <div>
      <Header title="Recipes Done" hasBtn={ false } />
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
      </Container>
      {getStorage() !== null && getStorage()
        .filter((favorite) => (filter === 'all' ? favorite : favorite.type === filter))
        .map((rec, index) => (
          <RecipesDoneCard key={ index } index={ index } recipe={ rec } />
        ))}
    </div>
  );
}

export default RecipesDone;
