import './Card.css';
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({movie}) => {
  const { title, overview, poster, rating } = movie
  return (
    <div>
      <h3>{title}</h3>
       <img src={`https://image.tmdb.org/t/p/w200/${poster}`} alt="movie poster" />
      <p>Rating: {rating}</p>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    poster: PropTypes.string,
    rating: PropTypes.num
  })
}

export default Card;