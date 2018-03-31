import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions';


const Header = ({ logOut, error, user}) => {
  
  const handleClick = () => {
    logOut();
  };

  return <div>
    <NavLink to="/">
      <h1>Movie Tracker</h1>
    </NavLink>
    {user.name ? 
      <div>
        <h3>Welcome {user.name}</h3>
        <NavLink to="/login" onClick={handleClick}>Logout</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div> 
      : 
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>}
    <h2>{error}</h2>
  </div>;
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));