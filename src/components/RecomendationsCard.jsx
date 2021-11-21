import React from 'react';
import PropTypes from 'prop-types';
import '../css/Recomendations.css';

const RecomendationsCard = ({ img, title, index }) => (
  <div className="recomendationCard" data-testid={ `${index}-recomendation-card` }>
    <img src={ img } alt={ title } />
    <p data-testid={ `${index}-recomendation-title` }>
      { title }
    </p>
  </div>
);

RecomendationsCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationsCard;
