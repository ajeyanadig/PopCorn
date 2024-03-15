export function MoviesList({ movies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
function MoviesListItem({ movie }) {
  return (
    <li key={movie.imdbID}>
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
