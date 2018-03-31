const movieReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MOVIES':
    return [...state, ...action.movies];
  default:
    return state;
  }
};

export default movieReducer;