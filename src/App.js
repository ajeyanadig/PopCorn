import { useState } from "react";
import { NavBar, SearchBar, NumResults, Logo } from "./Navigation/NavBar";
import { Main } from "./Main";
import { MoviesList } from "./MoviesBox/MovieListBox";
import { WatchedSummary, WatchMovieList } from "./WatchedBox/WatchedBox";
import { MovieDetails } from "./WatchedBox/MovieDetails";
import { Box } from "./Box";
import { useMovie } from "./CustomHooks/useMovie";
import { useLocalStorageState } from "./CustomHooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovie(query);
  const [selectedID, setSelectedID] = useState(null);

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
