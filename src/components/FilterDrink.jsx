import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterDrink() {
  const { setDrinks, categoryDrinks, fetchRecipes } = useContext(GlobalContext);
  const [saveCate, setSaveCate] = useState();
  const MAX_MAP = 5;

  const handleClick = async (category) => {
    if (saveCate === category || category === 'All') {
      fetchRecipes('thecocktaildb');
      setSaveCate('');
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await response.json();
      setDrinks(json);
      setSaveCate(category);
    }
  };

  return (
    <div>
      {categoryDrinks.drinks && categoryDrinks.drinks
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

export default FilterDrink;
