import * as actions from './index';

describe('actions', () => {

  describe('addMovies', () => {
    it('creates a type of ADD_MOVIES', () => {

      const movies = [
        { title: 'Black Panther',
          poster: "/v5HlmJK9bdeHxN2QhaFP1ivjX3U.jpg" 
        },
        { title: 'Tomb Raider', 
          poster: '/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg'
        }  
      ]

      const expected = {
        type: 'ADD_MOVIES',
        movies
      }

      expect(actions.addMovies(movies)).toEqual(expected);
    })
  })
  
  describe('validateUser', () => {
    it('should create a type of VALIDATE_USER', () => {

      const user = { username: 'Will', password: 'iHeartTesting' }

      const expected = {
        type: 'VALIDATE_USER',
        user
      }

      expect(actions.validateUser(user)).toEqual(expected)
    })
  })

  describe('logOut', () => {
    it('should create a type of LOG_OUT', () => {
      const expected = {type: 'LOG_OUT'}
      expect(actions.logOut()).toEqual(expected)
    })
  })
})