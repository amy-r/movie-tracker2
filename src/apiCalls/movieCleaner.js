export const movieCleaner = (moviesArray) => {
  return moviesArray.map((movie, index) => {
    return ({
      key: movie.title + index,
      title: movie.title, 
      overview: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average
    });
  });
};

