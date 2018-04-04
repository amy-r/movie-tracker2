import React from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

export const Favorites = ({favorites}) => {
  const displayFavorites = favorites.map(favorite => {
    return <Card key={favorite.movie_id} 
      movie={favorite}
      isFavorite={true}/>;
  });
  return (
    <div>
      <div className="favorites">
        {displayFavorites.length > 0 ? 
          displayFavorites : 
          <h4>There are no favorites to display.</h4>}
      </div>
    </div>
  );
};

export const mapStateToProps = state => ({
  favorites: state.favorites
});

export default connect(mapStateToProps)(Favorites);

Favorites.propTypes = {
  favorites: PropTypes.array
};
