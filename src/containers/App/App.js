import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';
import { getMovies } from '../../apiCalls/getMovies';
import { addMovies } from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Favorites from '../Favorites/Favorites';
import PropTypes from 'prop-types';
import { movieCleaner } from '../../apiCalls/movieCleaner';


class App extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }

  async componentDidMount() {
    try {
      const movies = await getMovies();
      const cleanMovies = movieCleaner(movies);
      this.props.addMovies(cleanMovies);     
    } catch (error) {
      this.setState({error});
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/' render={() => <CardContainer 
          error={this.state.error}/>} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
        <Route path='/favorites' render={() => <Favorites />} />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});


App.propTypes = {
  addMovies: PropTypes.func
};

export default withRouter(connect(null, mapDispatchToProps)(App));
