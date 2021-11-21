import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterMeal() {
  const { categoryMeals, setMeals, fetchRecipes } = useContext(GlobalContext);
  const [saveCate, setSaveCate] = useState();
  const MAX_MAP = 5;

  const handleClick = async (category) => {
    if (saveCate === category || category === 'All') {
      fetchRecipes('themealdb');
      setSaveCate('');
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await response.json();
      setMeals(json);
      setSaveCate(category);
    }
  };

  return (
    <div>
      {categoryMeals.meals && categoryMeals.meals
        .map((category, index) => (index < MAX_MAP && (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        )))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
      >
        All
      </button>
    </div>
  );
}

export default FilterMeal;
