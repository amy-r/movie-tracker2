import React, { Component } from 'react';
import './Signup.css';
import { userSignup } from '../../apiCalls/apiCalls';
import { validateUser } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Signup extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  validateEmail = (email) => {
    // eslint-disable-next-line
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
  }

  handleSubmit = async event => {
    event.preventDefault();
    let errorMessage = "";
    const validEmail = this.validateEmail(this.state.email);
    if (validEmail) {
      try {
        const signUpFetch = await userSignup(this.state);
        if (signUpFetch.error) {
          throw new Error("Error");
        } else {
          const success = "You have successfully created an account.  ";
          const redirect = "You will now be redirected to the login page.";
          alert(success + redirect);
          this.props.history.push("/login");
        }
      } catch (error) {
        errorMessage = "Email address has already been used.";
      }
    } else {
      errorMessage = "Please enter a valid email address.";
    }
    this.setState({
      name: "",
      email: "",
      password: "",
      errorMessage: errorMessage
    });

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const enableSubmit =
      this.state.name &&
      this.state.email &&
      this.state.password;
    return <div>
      <h2>Sign Up</h2>
      <h4>Please enter your name, email address, and password to create an account.</h4>
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={this.state.name} 
          placeholder="Enter your name." 
          onChange={this.handleChange} />
        <input 
          type="text" 
          name="email" 
          value={this.state.email} 
          placeholder="Enter your email address." 
          onChange={this.handleChange} />
        <input 
          type="password" 
          name="password" 
          value={this.state.password} 
          placeholder="Enter your password" 
          onChange={this.handleChange} />
        <button 
          type="submit" 
          name="submit"
          disabled={!enableSubmit}>
            Submit
        </button>
      </form>
      <h2 className="errorMessage">{this.state.errorMessage}</h2>
    </div>;
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(validateUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(Signup));

Signup.propTypes = {
  validateUser: PropTypes.func,
  history: PropTypes.object
};
