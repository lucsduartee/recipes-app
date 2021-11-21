import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import FilterDrink from '../components/FilterDrink';

const MAX_NUMBER = 12;

function DrinksPage() {
  const {
    fetchRecipes,
    drinks,
    showBar,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecipes('thecocktaildb');
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <FilterDrink />
      {showBar && <SearchBar />}
      {
        drinks.drinks && drinks.drinks
          .map((drink, index) => index < MAX_NUMBER && (
            <Link to={ `/bebidas/${drink.idDrink}` }>
              <RecipeCard
                key={ drink.idDrink }
                str={ drink.strDrink }
                src={ drink.strDrinkThumb }
                id={ index }
              />
            </Link>))
      }
      <Footer />
    </div>
  );
}

export default DrinksPage;
