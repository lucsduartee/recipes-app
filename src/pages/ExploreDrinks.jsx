import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  const [surprise, setSurprise] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const json = await response.json();
      setSurprise(json);
    })();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" hasBtn={ false } />
      <div>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/bebidas/${surprise.drinks[0].idDrink}`) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
