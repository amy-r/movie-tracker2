import React from 'react';
import './CardContainer.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

export const CardContainer = ({movies, favorites, error}) => {
  let displayCards;

  if (movies) {
    displayCards = movies.map((movie) => {
      let isFavorite = false;

      favorites.forEach(favorite => {
        if (favorite.movie_id === movie.movie_id) {
          isFavorite = true;
        }
      });
      return <Card
        key={movie.movie_id}
        movie={movie} 
        isFavorite={isFavorite} />;
    });
  }
  return (
    <div>
      <div className="card-container">
        {displayCards}
      </div>
      {error && <h1> Error fetching movies. Please try again later. </h1>}
    </div>
  );
};

export const mapStateToProps = state => ({
  movies: state.movies,
  favorites: state.favorites
});

CardContainer.propTypes = {
  movies: PropTypes.array,
  favorites: PropTypes.array,
  error: PropTypes.string
};

export default connect(mapStateToProps)(CardContainer);
