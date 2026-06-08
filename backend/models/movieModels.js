const toMovieDTO = (movie) => ({
  id: movie.id,
  title: movie.title,
  description: movie.description,
  duration: movie.duration,
  releaseDate: movie.release_date,
  director: movie.director,
  posterUrl: movie.poster_url,
});

module.exports = { toMovieDTO };
