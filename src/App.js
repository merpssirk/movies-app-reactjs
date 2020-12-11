import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e5bd4438a869e7e4846c2385b28347ba&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=e5bd4438a869e7e4846c2385b28347ba&query=";

function App() {
  //const movies = ['1', '2', '3'];

  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

  const getMovies = ( API ) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data);
      });
  }
  const handlerOnSubmit = (event) => {
    event.preventDefault();

    if ( searchWord ) {
      getMovies(SEARCH_API + searchWord);
      setSearchWord("");
    }
  };

  const handleOnChange = (event) => {
    setSearchWord(event.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handlerOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search Movie"
            value={searchWord}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
