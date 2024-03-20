export function MoviesList({ movies, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  );
}
function MoviesListItem({ movie, onSelect }) {
  function onClickHandler(e) {
    onSelect(movie.imdbID);
  }
  return (
    <li key={movie.imdbID} onClick={onClickHandler}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
