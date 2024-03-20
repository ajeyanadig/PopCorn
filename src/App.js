import { useEffect, useState } from "react";
import { NavBar, SearchBar, NumResults, Logo } from "./Navigation/NavBar";
import { Main } from "./Main";
import { MoviesList } from "./MoviesBox/MovieListBox";
import { WatchedSummary, WatchMovieList } from "./WatchedBox/WatchedBox";
import { MovieDetails } from "./WatchedBox/MovieDetails";
import { Box } from "./Box";

const key = "2b437c3f";
// SEARCH QUERY `http://www.omdbapi.com/?s=${'Avengers'}`

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(false);

          const response = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${key}`,
            { signal: controller.signal }
          );
          if (!response.ok) {
            console.log(response);
            throw new Error("⛔️ Something Went Wrong");
          }
          const res = await response.json();
          console.log(res);

          if (res.Response === "False") {
            setMovies([]);
            if (res.Error === "Too many results.")
              throw new Error("A little more accurate please");
            throw new Error("⛔️ Movie not found");
          }
          setMovies(res.Search);
          setError(false);
        } catch (e) {
          if (e.name !== "AbortError") setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedID(id);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleCloseMovie() {
    setSelectedID("");
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((curr) => curr.imdbID !== id));
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
            <MoviesList movies={movies} onSelect={handleSelectMovie} />
          )}
          {error && <ErrorMessage msg={error} />}
        </Box>

        <Box>
          {/* */}
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onAddWatched={handleAddWatched}
              onCloseMovie={handleCloseMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
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
