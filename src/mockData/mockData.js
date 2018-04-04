/* eslint-disable camelcase */

export const mockMovieArrayData = [
  {
    movie_id: 284054,
    overview: "King T'Challa returns home from America to the reclusive",
    poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    release_date: "2018-02-13",
    title: "Black Panther",
    vote_average: 7.3
  },
  {
    movie_id: 354912,
    overview: "Despite his family’s baffling generations-old ban on music",
    poster_path: "/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
    release_date: "2017-10-27",
    title: "Coco",
    vote_average: 7.8
  },
  {
    movie_id: 338970,
    overview: "Lara Croft, the fiercely independent daughter of",
    poster_path: "/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg",
    release_date: "2018-03-08",
    title: "Tomb Raider",
    vote_average: 6.2
  }
];

export const mockMovieData = { 
  movie_id: 338970, 
  overview: "Lara Croft, the fiercely independent daughter of", 
  poster_path: "/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg", 
  release_date: "2018-03-08", 
  title: "Tomb Raider", 
  vote_average: 6.2,
  isFavorite: false 
};

export const mockFavoriteMovieData = { 
  movie_id: 338970, 
  overview: "Lara Croft, the fiercely independent daughter of", 
  poster_path: "/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg", 
  release_date: "2018-03-08", 
  title: "Tomb Raider", 
  vote_average: 6.2,
  isFavorite: true
};

export const mockUser = {
  id: 1,
  name: "Taylor",
  password: "password",
  email: "tman2272@aol.com"
};

export const mockNotAUser = {
  id: 1,
  name: "Taylor",
  password: "password",
  email: "tman2272@aol.com"
};

export const mockGetMoviesApiData = [
  { 
    title: "Tomb Raider", 
    overview: "mockOverview", 
    poster_path: "mockPosterPath", 
    vote_average: "5" 
  }
];

export const mockSignupDbResponse = {
  id: 31,
  message: "New user created",
  status: "success"
};

export const mockGetFavoritesDbResponse = [
  {
    id: 64,
    movie_id: 354912,
    overview: "Despite his family’s baffling generations-old ban on music",
    poster_path: "/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
    release_date: "2017-10-27",
    title: "Coco",
    user_id: 1,
    vote_average: "7.8"
  }
];

export const mockAddToFavoritesDbResponse = {
  id: 70,
  message: "Movie was added to favorites",
  status: "success"
};

export const mockRemoveFromFavoritesDbResponse = {
  message: "1 row was deleted.",
  status: "success"
};

export const mockDirtyMovieData = [
  {
    adult: false,
    backdrop_path: "/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
    genre_ids: (4) [12, 35, 10751, 16],
    id: 354912,
    original_language: "en",
    original_title: "Coco",
    overview: "Despite his family’s baffling generations-old",
    popularity: 237.912795,
    poster_path: "/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
    release_date: "2017-10-27",
    title: "Coco",
    video: false,
    vote_average: 7.8,
    vote_count: 3570
  }
];

export const cleanMovieData = [
  {
    movie_id: 354912,
    overview: "Despite his family’s baffling generations-old",
    poster_path: "/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
    release_date: "2017-10-27",
    title: "Coco",
    vote_average: 7.8
  }
];

