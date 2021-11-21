import React, { useContext } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import GlobalContext from '../context/GlobalContext';

function Header({ title = '', hasBtn = true }) {
  const { setShowBar } = useContext(GlobalContext);
  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      <Link to="/perfil">
        <button
          type="button"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </button>
      </Link>

      {
        hasBtn
        && (
          <button
            type="button"
            onClick={ () => setShowBar((s) => !s) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: P.string.isRequired,
  hasBtn: P.bool.isRequired,
};

export default Header;
