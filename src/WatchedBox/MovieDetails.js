import { useEffect, useState } from "react";
import StarRating from "../Components/StarRating";

const key = "2b437c3f";
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
export function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const foundMovie = watched.find((curr) => curr.imdbID === selectedID);
  const isWatched = Boolean(foundMovie);
  const {
    Title: title,
    // Year: year,
    Plot: plot,
    Actors: actors,
    Director: director,
    Poster: poster,
    Runtime: runtime,
    Released: released,
    Genre: genre,
    imdbRating,
    imdbID,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=${selectedID}&apikey=${key}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = `Use Popcorn`;
      };
    },
    [title]
  );
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") onCloseMovie();
      }
      document.addEventListener("keyup", callback);
      return function () {
        document.removeEventListener("keyup", callback);
      };
    },
    [onCloseMovie]
  );

  function handleAdd() {
    const newMovie = {
      imdbID,
      title,
      poster,
      runtime: Number(runtime.split(" ")[0]),
      released,
      genre,
      imdbRating,
      userRating,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              {"<-"}
            </button>

            <img src={poster} alt={`Poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            {isWatched ? (
              <p className="rating">
                You gave this movie of {foundMovie.userRating} ⭐️ already !
              </p>
            ) : (
              <>
                <div className="rating">
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="#FFD700"
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add To List
                    </button>
                  )}
                </div>
              </>
            )}
            <em>{plot}</em>
            <p>
              <strong>Starring : </strong> {actors}
            </p>
            <p>
              <strong>Directed by :</strong> {director}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
function Loader() {
  return <p className="loader">{"    "}Loading...</p>;
}
