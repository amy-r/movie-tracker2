import React from 'react';
import './CardContainer.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = ({movies}) => {
  let displayCards;

  if (movies) {
    displayCards = movies.map((movie) => {
      return <Card
        key={movie.key}
        movie={movie} />;
    });
  }
  return (
    <div>
      {displayCards}
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.movies
});

CardContainer.propTypes = {
  movies: PropTypes.array
}

export default connect(mapStateToProps)(CardContainer);