import { useEffect, useRef } from "react";
import { useKey } from "../CustomHooks/useKey";
export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function SearchBar({ query, setQuery }) {
  const inputEle = useRef(null);
  //for enter press here and there
  useKey("Enter", function () {
    if (document.activeElement === inputEle.current) return;
    inputEle.current.focus();
    setQuery("");
  });
  //just for on mount
  useEffect(() => inputEle.current.focus(), []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(() => e.target.value)}
      ref={inputEle}
    />
  );
}
export function NumResults({ children }) {
  return (
    <p className="num-results">
      Found <strong>{children}</strong> results
    </p>
  );
}
