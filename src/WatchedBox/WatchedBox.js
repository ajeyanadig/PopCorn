const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
export function WatchMovieList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovieListItem
          movie={movie}
          key={movie.imdbID}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
function WatchMovieListItem({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          <strong>X</strong>
        </button>
      </div>
    </li>
  );
}
// let x = {
//   Title: "Batman v Superman: Dawn of Justice",
//   Year: "2016",
//   Rated: "PG-13",
//   Released: "25 Mar 2016",
//   Runtime: "151 min",
//   Genre: "Action, Adventure, Sci-Fi",
//   Director: "Zack Snyder",
//   Writer: "Bob Kane, Bill Finger, Jerry Siegel",
//   Actors: "Ben Affleck, Henry Cavill, Amy Adams",
//   Plot: "Batman is manipulated by Lex Luthor to fear Superman. Superman´s existence is meanwhile dividing the world and he is framed for murder during an international crisis. The heroes clash and force the neutral Wonder Woman to reemerge.",
//   Language: "English",
//   Country: "United States",
//   Awards: "14 wins & 33 nominations",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//   Ratings: [
//     {
//       Source: "Internet Movie Database",
//       Value: "6.5/10",
//     },
//     {
//       Source: "Rotten Tomatoes",
//       Value: "29%",
//     },
//     {
//       Source: "Metacritic",
//       Value: "44/100",
//     },
//   ],
//   Metascore: "44",
//   imdbRating: "6.5",
//   imdbVotes: "748,011",
//   imdbID: "tt2975590",
//   Type: "movie",
//   DVD: "25 Nov 2016",
//   BoxOffice: "$330,360,194",
//   Production: "N/A",
//   Website: "N/A",
//   Response: "True",
// };

// export function MovieData({ selectedID }) {
//   const [movie, setMovie] = useState({});
//   const {
//     Title: title,
//     Year: year,
//     Plot: plot,
//     Actors: actors,
//     Director: director,
//     Poster: poster,
//     Runtime: runtime,
//     Released: Released,
//     Genre: genre,
//   } = movie;
//   useEffect(
//     function () {
//       async function fetchMovie(selectedID) {
//         const response = await fetch(
//           `http://www.omdbapi.com/?i=${selectedID}&apikey=${key}`
//         );
//         const data = await response.json();
//         console.log(data);
//       }
//       fetchMovie(selectedID);
//     },
//     [selectedID]
//   );

//   return (
//     <div className="details">
//       <header>
//         <button className="btn-back">{"<-"}</button>
//         <img src={poster} />
//       </header>
//     </div>
//   );
// }
