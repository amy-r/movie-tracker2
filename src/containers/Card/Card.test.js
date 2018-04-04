import React from 'react';
import { Card, mapStateToProps, mapDispatchToProps } from "./Card";
import { shallow } from 'enzyme';
import { 
  mockMovieData,  
  mockUser } from '../../mockData/mockData';
import { addToFavoritesDb } from '../../apiCalls/addToFavoritesDb';
import { removeFromFavoritesDb } from '../../apiCalls/removeFromFavoritesDb';

jest.mock('../../apiCalls/addToFavoritesDb.js');
jest.mock('../../apiCalls/removeFromFavoritesDb.js');

describe('Card', () => {
  let wrapper;
  let setError;
  let mockAddFavoriteToStore;
  let mockRemoveFavoriteFromStore;

  beforeEach(() => {
    setError = jest.fn();
    mockAddFavoriteToStore = jest.fn();
    mockRemoveFavoriteFromStore = jest.fn();
    
    wrapper = shallow(
      <Card
        movie={mockMovieData}
        user={mockUser}
        setError={setError}
        addFavoriteToStore={mockAddFavoriteToStore}
        removeFavoriteFromStore={mockRemoveFavoriteFromStore}
        isFavorite={false} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state('favErrorHidden')).toEqual(true);
  });

  it('should update state on favoriteError when there is no user ', () => {
    const mockEmptyUser = {};
    wrapper = shallow(<Card movie={mockMovieData} user={mockEmptyUser} />);
    wrapper.instance().favoriteError();
    expect(wrapper.state('favErrorHidden')).toEqual(false); 
  });

  it('calls addFavoritesToDb and ToStore on addFavorite w/params', () => {
    wrapper.instance().addFavorite();
    expect(addToFavoritesDb).toHaveBeenCalledWith(mockMovieData, mockUser.id);
    expect(mockAddFavoriteToStore).toHaveBeenCalledWith(mockMovieData);
  });

  it('calls removeFavesFromDb and FromStore on removeFaves w/params', () => {
    wrapper = shallow(<Card movie={mockMovieData} 
      user={mockUser} 
      isFavorite={true} 
      removeFavoriteFromStore={mockRemoveFavoriteFromStore}/>);
    wrapper.instance().removeFavorite();
    expect(removeFromFavoritesDb).toHaveBeenCalledWith(mockMovieData.movie_id,
      mockUser.id);
    expect(mockRemoveFavoriteFromStore).toHaveBeenCalledWith(mockMovieData.movie_id); 
  });

  it('calls favoriteError on handleClick', () => {
    const spyFavoriteError = jest.spyOn(wrapper.instance(), 'favoriteError');
    wrapper.instance().handleClick();
    expect(spyFavoriteError).toHaveBeenCalled();
  });

  it('calls addFavorite on handleClick', () => {
    const spyAddFavorite = jest.spyOn(wrapper.instance(), 'addFavorite');
    wrapper.instance().handleClick();
    expect(spyAddFavorite).toHaveBeenCalled();
  });

  it('calls removeFavorite on handleClick', () => {
    const spyRemoveFavorite = jest.spyOn(wrapper.instance(), "removeFavorite");
    wrapper.instance().handleClick();
    expect(spyRemoveFavorite).toHaveBeenCalled();
  });

  it('should map to the store', () => {
    const mockStore = { user: mockUser };
    const mapped = mapStateToProps(mockStore);
    expect(mapped).toEqual(mockStore);
  });

  it('should call dispatch function when using mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setError();
    mapped.addFavoriteToStore();
    mapped.removeFavoriteFromStore();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
