import './Card.css';
import React from 'react';
import { connect } from "react-redux";
import { setError, addFavoriteToStore, removeFavoriteFromStore } from '../../actions';
import { addToFavoritesDb, removeFromFavoritesDb } from '../../apiCalls/apiCalls';
import PropTypes from 'prop-types';

const Card = ({movie, user, setError, addFavoriteToStore, isFavorite, removeFavoriteFromStore}) => {
  // eslint-disable-next-line
  const { title, overview, poster_path, vote_average, movie_id } = movie;
  const favorite = isFavorite ? 'favorite' : '';

  const handleClick = (event) => {
    if (!user.id) {
      const allErrorDivsArray = document.querySelectorAll(".addFaveError");
      allErrorDivsArray.forEach(errorDiv => {
        errorDiv.classList.add("hidden");
      });
      const errorDiv = event.target.nextSibling;
      errorDiv.classList.remove("hidden");
      const error = 'Create an account or Login';
      setError(error);
    }

    if (user.id && !isFavorite) {
      addToFavoritesDb(movie, user.id);
      addFavoriteToStore(movie);
    } 
    
    if (user.id && isFavorite) {
      removeFromFavoritesDb(movie_id, user.id);
      removeFavoriteFromStore(movie_id);
    }
  };

  return (
    <div className={`card ${favorite}`}>
      <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} 
        alt="movie poster" />
      <div className="movieDetails">
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div className="overview">
          <p>{overview}</p>
        </div>
        <div className="rating">
          <h4>Rating: {vote_average}</h4>
        </div>
      </div>
      <button onClick={(event) => handleClick(event)}>Favorite</button>
      <div className={"addFaveError hidden"}>
        <p>You must</p>
        <h4><a href="/login">Log In</a></h4>
        <p>or</p>
        <h4><a href="/signup">Sign Up</a></h4>
        <p>before adding favorites.</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  addFavoriteToStore: favorite => dispatch(addFavoriteToStore(favorite)),
  removeFavoriteFromStore: movie_id => dispatch(removeFavoriteFromStore(movie_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

Card.propTypes = {
  movie: PropTypes.object,
  user: PropTypes.object,
  setError: PropTypes.function,
  addFavoriteToStore: PropTypes.function,
  isFavorite: PropTypes.function,
  removeFavoriteFromStore: PropTypes.function
};
