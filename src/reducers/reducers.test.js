import movieReducer from './movieReducer';
import userReducer from './userReducer';
import * as actions from '../actions/index.js';

describe('reducers', () => {
  describe('movieReducer', () => {
    it('should return the default state', () => {
      const expected = []
      expect(movieReducer(undefined, {})).toEqual(expected)
    })

    it('should return a state with movies when given ADD_MOVIES action', () => {
      const movies = [ { title: 'Black Panther'} ];
      const expected = [ { title: 'Black Panther'} ];
      expect(movieReducer(undefined, actions.addMovies(movies))).toEqual(expected)
    })   
  })

  describe('userReducer', () => {
    it('should return the default state', () => {
      const expected = {};
      expect(userReducer(undefined, {})).toEqual(expected);
    })

    it('should return a the user when given VALIDATE_USER action', () => {
      const user = {username: 'Will', password: 'iLoveTesting'};
      const expected = user;

      expect(userReducer(undefined,actions.validateUser(user))).toEqual(expected)
    })

    it('should return an empty object when given LOG_OUT action', () => {
      const expected = {};
      expect(userReducer(undefined, actions.logOut())).toEqual(expected);
    })
  })
})