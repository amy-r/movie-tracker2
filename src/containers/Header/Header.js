import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions';
import PropTypes from 'prop-types';

const Header = (props) => {
  
  const handleClick = (event) => {
    event.preventDefault();
    props.logOut();
  };

  return <div>
    <NavLink to="/">
      <h1>Movie Tracker</h1>
    </NavLink>
    {props.user.name ? 
      <div>
        <h3>Welcome {props.user.name}</h3>
        <button onClick={handleClick}>Logout</button>
      </div> 
      : 
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>}
  </div>;
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  logOut: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));  
