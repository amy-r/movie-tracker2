import React from 'react';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { getMovies } from '../../apiCalls/getMovies';
import { movieCleaner } from '../../apiCalls/movieCleaner';

jest.mock('../../apiCalls/getMovies');
jest.mock('../../apiCalls/movieCleaner');

describe("App", () => {
  let wrapper;
  let mockAddMovies;
  
  beforeEach(() => {
    mockAddMovies = jest.fn();
    wrapper = shallow(<App addMovies={mockAddMovies} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call getMovies on componentDidMount', () => {
    wrapper.instance().componentDidMount();
    expect(getMovies).toHaveBeenCalled();
  });

  it('should call movieCleaner on componentDidMount', () => {
    wrapper.instance().componentDidMount();
    expect(movieCleaner).toHaveBeenCalled();
  });

  it('should call dispatch function when using mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.addMovies();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
