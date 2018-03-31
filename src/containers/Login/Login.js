import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { userLogin } from '../../apiCalls/apiCalls';
import { validateUser } from '../../actions';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',

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
      this.props.validateUser(user);
      this.props.history.push('/');
    } catch (error) {
      this.setState({
        email: "",
        password: "",
        errorMessage: "Email and Password do not match"
      });
    }
  }
  
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="email" 
            value={this.state.email}
            placeholder="Enter your email address." 
            onChange={this.handleChange} />
          <input 
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter your password"
            onChange={this.handleChange} />
          <button
            type="submit" 
            name="submit">Submit</button>
        </form>
        <h2>{this.state.errorMessage}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(validateUser(user))
});

Login.propTypes = {
  validateUser: PropTypes.func
}
export default withRouter(connect(null, mapDispatchToProps)(Login));