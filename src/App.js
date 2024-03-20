import { useEffect, useState } from "react";

import { NavBar, SearchBar, NumResults, Logo } from "./Navigation/NavBar";
import { Main } from "./Main";
import { MoviesList } from "./MoviesBox/MovieListBox";
import { WatchedSummary, WatchMovieList } from "./WatchedBox/WatchedBox";
import { MovieDetails } from "./WatchedBox/MovieDetails";
import { Box } from "./Box";
const key = "2b437c3f";
// SEARCH QUERY `http://www.omdbapi.com/?s=${'Avengers'}`

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(false);

          const response = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${key}`
          );
          if (!response.ok) {
            console.log(response);
            throw new Error("⛔️ Something Went Wrong");
          }
          const res = await response.json();

          console.log(res);

          if (res.Response === "False") {
            setMovies([]);
            if (res.Error === "Too many results.") {
              throw new Error("A little more accurate please");
            }
            throw new Error("⛔️ Movie not found");
          }
          setMovies(res.Search);
        } catch (e) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        return;
      }
      fetchMovies();
    },
    [query]
  );
  function onSelectMovie(id) {
    setSelectedID(id);
  }
  function onCloseSelectedMovie() {
    setSelectedID("");
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults>{movies.length}</NumResults>
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelect={onSelectMovie} />
          )}
          {error && <ErrorMessage msg={error} />}
        </Box>

        <Box>
          {/* */}
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onBack={onCloseSelectedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ msg }) {
  return <p className="error">{msg}</p>;
}
function Loader() {
  return <p className="loader">{"    "}Loading...</p>;
}
