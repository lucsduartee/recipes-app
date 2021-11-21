import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();
  const [surprise, setSurprise] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await response.json();
      setSurprise(json);
    })();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" hasBtn={ false } />
      <div>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/comidas/${surprise.meals[0].idMeal}`) }
        >
          Me Surpreenda!
        </button>
        <button
          data-testid="explore-by-area"
          type="button"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
