import React from 'react';
import App, { mapDispatchToProps } from './App';
import { shallow } from 'enzyme';


describe("App", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call dispatch function when using mapDispatchToProps", () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.addMovies();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
