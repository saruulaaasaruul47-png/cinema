class Movie {
  constructor(title, description, duration, poster_url, release_date, director) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.poster_url = poster_url;
    this.release_date = release_date;
    this.director = director;
  }
}

const toMovieDTO = (movie) => ({
  id: movie.id,
  title: movie.title,
  description: movie.description,
  duration: movie.duration,
  posterUrl: movie.poster_url,
  releaseDate: movie.release_date,
  director: movie.director,
});

module.exports = Movie;
module.exports.toMovieDTO = toMovieDTO;
