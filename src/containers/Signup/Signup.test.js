import React from 'react';
import { Signup, mapDispatchToProps } from './Signup';
import { shallow } from 'enzyme';
import { userSignup } from '../../apiCalls/userSignup';
import { userLogin } from '../../apiCalls/userLogin';

jest.mock('../../apiCalls/userSignup');
jest.mock('../../apiCalls/userLogin.js');

describe('Signup', () => {

  let wrapper;
  const event = { preventDefault: jest.fn() };
  const mockValidateUser = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      <Signup
        validateUser={mockValidateUser}
      />
    );
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('loads with an empty state', () => {
    expect(wrapper.state()).toEqual({
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    });
  });

  it('calls validateEmail on handleSubmit', () => {
    wrapper.instance().validateEmail = jest.fn();
    const mockState = {
      name: 'me',
      email: 'me@gmail.com',
      password: 'password',
      errorMessage: ''
    };
    wrapper.setState({ email: 'me@gmail.com'});
    wrapper.instance().handleSubmit(event);
    expect(wrapper.instance().validateEmail).toHaveBeenCalledWith(mockState.email);
  });

  it('validates the email address input', () => {
    expect(wrapper.instance().validateEmail('me@gmail.com')).toEqual(true);
    expect(wrapper.instance().validateEmail('megmail.com')).toEqual(false);
    expect(wrapper.instance().validateEmail('megmailcom')).toEqual(false);
  })

  it('calls userSignup on handleSubmit when email address is valid', () => {
    wrapper.setState({
      name: 'me',
      email: 'me@gmail.com',
      password: 'password',
      errorMessage: ''
    });
    
    wrapper.instance().handleSubmit(event);
    expect(userSignup).toHaveBeenCalledWith(wrapper.state());
  });

  it('calls userLogin on handleSubmit when email address is valid', () => {
    wrapper.setState({
      name: "me",
      email: "me@gmail.com",
      password: "password",
      errorMessage: ""
    });

    wrapper.instance().handleSubmit(event);
    expect(userLogin).toHaveBeenCalledWith(wrapper.state());
  });

  it("calls validateUser on handleSubmit", () => {
    wrapper.instance().handleSubmit(event);
    expect(mockValidateUser).toHaveBeenCalled();
  });

  it('updates state with an error when email is invalid', () => {
    wrapper.setState({
      name: 'me',
      email: 'megmailcom',
      password: 'password',
      errorMessage: ''
    });
    const expected = "Please enter a valid email address.";
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state('errorMessage')).toEqual(expected);
  });

  it.skip('updates state with an error when email is a duplicate', () => {
    wrapper.setState({
      name: "me",
      email: "tman2272@aol.com",
      password: "password",
      errorMessage: ""
    });
    const mockResponse = { error: "Key (email)=(tman2272@aol.com) already exists."};
    const expected = "Email address has already been used.";
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state('errorMessage')).toEqual(expected);
  });

  it('resets the state and inputs when not redirected', () => {
    wrapper.setState({
      name: 'me',
      email: 'megmailcom',
      password: 'password',
      errorMessage: ''
    });
    const expected = {
      name: '',
      email: '',
      password: '',
      errorMessage: 'Please enter a valid email address.'
    };
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state()).toEqual(expected);
  });

  it('updates the state as the user types', () => {
    const expected = {
      name: 'me',
      email: 'me@gmail.com',
      password: 'password',
      errorMessage: ''
    };
    const event1 = {
      target: {
        name: 'name',
        value: 'me'
      }
    };
    const event2 = {
      target: {
        name: 'email',
        value: 'me@gmail.com'
      }
    };
    const event3 = {
      target: {
        name: 'password',
        value: 'password'
      }
    };
    wrapper.instance().handleChange(event1);
    wrapper.instance().handleChange(event2);
    wrapper.instance().handleChange(event3);
    expect(wrapper.state()).toEqual(expected);
  });


  it.skip('updates state with an error message when credentials dont match', () => {
    const expected = "Email and password do not match."
    //mock throw error
    expect(wrapper.state('errorMessage').toEqual(expected));
  });

  it('disables submit button unless both fields contain data', () => {
    wrapper.setState({
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    });
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    wrapper.setState({
      name: 'me',
      email: '',
      password: '',
      errorMessage: ''
    });
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    wrapper.setState({
      name: 'me',
      email: 'me@gmail.com',
      password: '',
      errorMessage: ''
    });
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    wrapper.setState({
      name: 'me',
      email: 'me@gmail.com',
      password: 'password',
      errorMessage: ''
    });
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('should call dispatch function when using mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.validateUser();
    expect(mockDispatch).toHaveBeenCalled();
  });
});