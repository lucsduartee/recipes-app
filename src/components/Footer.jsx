import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: '0',
      } }
    >
      <Link to="/bebidas">
        <button type="button">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
