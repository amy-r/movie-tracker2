import * as helper from './apiCalls';
import { movieCleaner } from './movieCleaner';
jest.mock('./movieCleaner')

describe ('helper functions', () => {
  describe('getMovies', () => {
    let mockUrl;
    let mockMovieData


    beforeAll( () => {

      mockMovieData = {
        results: [ 
          { title: 'Tomb Raider',
            overview: 'mockOverview',
            poster_path: 'mockPosterPath',
            vote_average: '5'
          }
        ]
      }

      window.fetch = jest.fn().mockImplementation(() => (
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMovieData)
        })
      ))

      mockUrl = 'http://www.movies.com'

    })

    it('calls fetch with expected params', () => {
      helper.getMovies(mockUrl);
      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })

    it('calls movieCleaner with expected params', async () => {
      await helper.getMovies(mockUrl);
      await expect(movieCleaner).toHaveBeenCalled();
    })

    it('returns a movie object when status is ok', async () => {
      const expected = [{ 
        key: 'Tomb Raider0',
        title: 'Tomb Raider',
        overview: 'mockOverview',
        poster : "mockPosterPath",
        rating: '5'
      }]
      await expect(helper.getMovies(mockUrl)).resolves.toEqual(expected)
    })

    it('throws an error when status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => (
        Promise.reject({
          ok: false,
        })
      )) 
      const expected = Error('Error getting movies')
      
      expect(helper.getMovies(mockUrl)).rejects.toEqual(expected)
    })
  })

})
