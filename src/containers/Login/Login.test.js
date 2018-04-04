import React from 'react';
import { Login, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { userLogin } from '../../apiCalls/userLogin';
import { getFavorites } from '../../apiCalls/getFavorites';

jest.mock('../../apiCalls/userLogin');
jest.mock('../../apiCalls/getFavorites');

describe('Login', () => {

  let wrapper;
  const mockValidateUser = jest.fn();
  const mockAddFavorites = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Login
        name={''}
        email={''}
        validateUser={mockValidateUser}
        addFavorites={mockAddFavorites}
      />
    );
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('loads with an emtpy state', () => {
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });


  it('updates the state as the user types', () => {
    const expected = {
      email: 'me@gmail.com',
      password: 'password'
    };
    const event1 = {
      target: {
        name: 'email',
        value: 'me@gmail.com'
      }
    };
    const event2 = {
      target: {
        name: 'password',
        value: 'password'
      }
    };
    wrapper.instance().handleChange(event1);
    wrapper.instance().handleChange(event2);
    expect(wrapper.state()).toEqual(expected);
  });

  it('calls userLogin with correct parameters on handleSubmit', () => {
    const expectedState = {
      email: 'me@gmail.com',
      password: 'password'
    };
    const event = { preventDefault: jest.fn() };
    wrapper.setState({
      email: 'me@gmail.com',
      password: 'password'
    });
    wrapper.instance().handleSubmit(event);
    expect(userLogin).toHaveBeenCalledWith(expectedState);
  });

  it('calls getFavorites on handleSubmit', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    expect(getFavorites).toHaveBeenCalled();
  });

  it('calls validateUser on handleSubmit', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    expect(mockValidateUser).toHaveBeenCalled();
  });

  it('calls addFavorites on handleSubmit', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    expect(mockAddFavorites).toHaveBeenCalled();
  });

  it.skip('displays an error message when credentials dont match', () => {
    const expected = "Email and password do not match.";
    const event = { preventDefault: jest.fn() };
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        ok: false
      })
    );
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state('errorMessage')).toEqual(expected);
  });

  it('disables submit button unless both fields contain data', () => {
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    wrapper.setState({ email: 'me@gmail.com', password: ''});
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    wrapper.setState({ email: 'me@gmail.com', password: 'password'});
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('should call dispatch function when using mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setError();
    mapped.addFavorites();
    mapped.validateUser();
    expect(mockDispatch).toHaveBeenCalled();
  });


});