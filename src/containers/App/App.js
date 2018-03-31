import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';
import { getMovies, url, userLogin } from '../../apiCalls/apiCalls';
import { addMovies, validateUser } from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import PropTypes from 'prop-types';

class App extends Component {

  async componentDidMount() {
    const movies = await getMovies(url);
    this.props.addMovies(movies);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Header />
        <Route exact path='/' render={() => <CardContainer />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});

App.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  addMovies: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
