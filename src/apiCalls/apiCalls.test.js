import * as apiCalls from './apiCalls';

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
    apiCalls.getMovies(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl)
  })

  it('returns a movie object when status is ok', async () => {
    const expected = [{ 
      key: 'Tomb Raider0',
      title: 'Tomb Raider',
      overview: 'mockOverview',
      poster : "mockPosterPath",
      rating: '5'
    }]
    await expect(apiCalls.getMovies(mockUrl)).resolves.toEqual(expected)
  })

  it('throws an error when status is not ok', () => {
    // window.fetch = jest.fn().mockImplementation(() => (
    //   Promise.reject({
    //     ok: false
    //   })
    // )) 

    const getMoviesError = () => {
      try {
        apiCalls.getMovies(mockUrl)
      } catch (error) {
        return ('Error getting movies')
      }
    }

    expect(getMoviesError).toThrow('Error getting movies')
  })
})