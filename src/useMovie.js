import { useEffect, useState } from "react";
const KEY = "2b437c3f";
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
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
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
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
  return { movies, isLoading, error };
}
