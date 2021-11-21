import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FoodsPage from '../pages/FoodsPage';
import FoodPage from '../pages/FoodPage';
import FoodInProgress from '../pages/FoodInProgress';
import ExploreIngredientsFoods from '../pages/ExploreIngredientsFoods';
import ExploreFoods from '../pages/ExploreFoods';
import DrinksPage from '../pages/DrinksPage';
import DrinkPage from '../pages/DrinkPage';
import DrinkInProgress from '../pages/DrinkInProgress';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreIngredientsDrinks from '../pages/ExploreIngredientsDrinks';
import Explore from '../pages/Explore';
import ExploreAreaFood from '../pages/ExploreAreaFood';
import Perfil from '../pages/Perfil';
import RecipesDone from '../pages/RecipesDone';
import FavoritesRecipes from '../pages/FavoritesRecipes';

function Switcher() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodsPage } />
      <Route
        exact
        path="/comidas/:id"
        render={ ({ match }) => <FoodPage match={ match } /> }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ ({ match }) => <FoodInProgress match={ match } /> }
      />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route
        exact
        path="/bebidas/:id"
        render={ ({ match }) => <DrinkPage match={ match } /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ ({ match }) => <DrinkInProgress match={ match } /> }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredientsFoods }
      />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredientsDrinks }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreAreaFood }
      />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default Switcher;
