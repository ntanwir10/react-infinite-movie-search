import React, { useState, useEffect, useCallback, useReducer } from "react";
import List from "../components/List";
import SearchForm from "../components/SearchForm";
import axios from "axios";
// import moviesReducer from "../reducers/moviesReducer";
import moviesReducer from "../reducers/moviesReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListHeader from "../components/ListHeader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const API_ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=2c3c0e8f1cb61b48987f056ae6727d36&query=`;
  const API_ENDPOINT_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=2c3c0e8f1cb61b48987f056ae6727d36`;

  //Queries that can be used api endpoints
  const POPULAR_DESC = `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [url, setUrl] = useState(`${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`);

  const [movies, dispatchMovies] = useReducer(moviesReducer, {
    data: [],
    searchTerm: "",
    queryType: "",
    resultsCount: 0,
    page: 1,
    isLoading: false,
    isError: false,
  });

  const handleSearchInput = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    //if no search term is entered it defaults to popular movies

    if (searchTerm) {
      setUrl(`${API_ENDPOINT_SEARCH}${searchTerm}`);
    } else {
      setUrl(`${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`);
    }
    setIsSubmit(true);
  };

  const findQueryType = (urlString) => {
    if (urlString.includes(`${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`)) {
      return "POPULAR";
    } else if (urlString.includes(`${API_ENDPOINT_SEARCH}`)) {
      return "SEARCH_BY_TERM";
    } else {
      return "";
    }
  };

  const handleFetchMovies = useCallback(async () => {
    dispatchMovies({ type: "MOVIES_FETCH_INIT" });

    //determine what type of query it is to change the result list header
    let queryType = findQueryType(url);

    try {
      const result = await axios.get(url);
      dispatchMovies({
        type: "MOVIES_FETCH_SUCCESS",
        payload: { ...result, queryType, searchTerm },
      });
    } catch (err) {
      dispatchMovies({ type: "MOVIES_FETCH_FAILURE" });
    }
  }, [url]);

  const handleFetchScroll = async () => {
    dispatchMovies({ type: "MOVIES_FETCH_INIT" });
    try {
      const result = await axios.get(`${url}&page=${movies.page + 1}`);

      dispatchMovies({
        type: "MOVIES_FETCH_SCROLL_SUCCESS",
        payload: result,
      });
    } catch (err) {
      dispatchMovies({ type: "MOVIES_FETCH_FAILURE" });
    }
  };

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  const displayMoviesOrNotFound = () => {
    if (movies.data.length !== 0) {
      return (
        !movies.isError && (
          <>
            <ListHeader type={movies.queryType} />
            <List movies={movies.data} />
          </>
        )
      );
    } else if (!movies.isLoading) {
      return <h1> oops...couldn't find any movies with that title</h1>;
    }
  };

  return (
    <div className="App">
      <SearchForm
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        searchTerm={movies.searchTerm}
        resultsCount={movies.resultsCount}
        isSubmit={isSubmit}
      />

      {movies.isError && <p>Something went wrong ...</p>}

      {movies.isLoading && <CircularProgress size={50} />}

      <InfiniteScroll
        dataLength={movies.data.length} //This is important field to render the next data
        next={handleFetchScroll}
        hasMore={true}
        loader={<h4></h4>}
        endMessage={
          <h4 style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </h4>
        }
      >
        {displayMoviesOrNotFound()}
      </InfiniteScroll>

      {!movies.isLoading && !movies.isError && movies.data.length >= 3 && (
        <h2>You've hit the end</h2>
      )}
    </div>
  );
}
