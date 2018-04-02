import React from 'react';
import './CardContainer.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = ({movies, favorites}) => {
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
      <h2>Movies</h2>
      <div className="card-container">
        {displayCards}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.movies,
  favorites: state.favorites
});

export default connect(mapStateToProps)(CardContainer);

CardContainer.propTypes = {
  movies: PropTypes.array,
  favorites: PropTypes.array
};
