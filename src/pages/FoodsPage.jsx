import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterMeal from '../components/FilterMeal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';

const MAX_NUMBER = 12;

function FoodsPage() {
  const { fetchRecipes, meals, showBar } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecipes('themealdb');
  }, []);

  return (
    <>
      <Header title="Meals" />
      <FilterMeal />
      {showBar && <SearchBar />}
      {
        meals.meals && meals.meals.map((meal, index) => index < MAX_NUMBER && (
          <Link to={ `/comidas/${meal.idMeal}` }>
            <RecipeCard
              key={ meal.idMeal }
              str={ meal.strMeal }
              src={ meal.strMealThumb }
              id={ index }
            />
          </Link>))
      }
      <Footer />
    </>
  );
}

export default FoodsPage;
