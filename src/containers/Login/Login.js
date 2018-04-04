import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { userLogin } from '../../apiCalls/userLogin';
import { getFavorites } from '../../apiCalls/getFavorites';
import { validateUser, setError, addFavorites } from '../../actions';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target; 
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await userLogin(this.state);
      const favorites = await getFavorites(user.id);
      this.props.validateUser(user);
      this.props.addFavorites(favorites);
      this.props.history.push('/');
    } catch (error) {
      this.setState({
        email: "",
        password: "",
        errorMessage: "Email and password do not match."
      });
    }
  }
  
  render() {
    const enableSubmit = this.state.email && this.state.password; 
    return (
      <div className="login">
        <h4>Please enter your email address and password to login.</h4>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="email" 
            value={this.state.email}
            placeholder="Email address" 
            onChange={this.handleChange} />
          <input 
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange} />
          <button
            type="submit" 
            name="submit"
            disabled={!enableSubmit}>
              Submit
          </button>
        </form>
        <h2 className="errorMessage">{this.state.errorMessage}</h2>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(validateUser(user)),
  setError: error => dispatch(setError(error)),
  addFavorites: favorites => dispatch(addFavorites(favorites))
});

Login.propTypes = {
  validateUser: PropTypes.func,
  setError: PropTypes.func,
  addFavorites: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
