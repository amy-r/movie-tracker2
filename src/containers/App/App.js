import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';
import { getMovies, url } from '../../apiCalls/apiCalls';
import { addMovies } from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Favorites from '../Favorites/Favorites';
import PropTypes from 'prop-types';

class App extends Component {

  async componentDidMount() {
    const movies = await getMovies(url);
    this.props.addMovies(movies);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/' render={() => <CardContainer />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
        <Route path='/favorites' render={() => <Favorites />} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});

export default withRouter(connect(null, mapDispatchToProps)(App));

App.propTypes = {
  addMovies: PropTypes.func
};