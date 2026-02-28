import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import MovieDetail from "./MovieDetail";
import Footer from "./Footer";
import requests from "./requests";

const LOADER_DURATION_MS = 3000;

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Nav />
      <main id="main-content" tabIndex={-1}>
      <Banner onMovieSelect={setSelectedMovie} />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        onMovieClick={setSelectedMovie}
        mediaType="tv"
      />
      <Row
        title="Trending"
        fetchUrl={requests.fetchTrending}
        onMovieClick={setSelectedMovie}
        mediaType="all"
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Boredom Busters"
        fetchUrl={requests.fetchBoredomBusters}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Action"
        fetchUrl={requests.fetchActionMovies}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Comedy"
        fetchUrl={requests.fetchComedyMovies}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Horror"
        fetchUrl={requests.fetchHorrorMovies}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Romance"
        fetchUrl={requests.fetchRomanceMovies}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Documentary"
        fetchUrl={requests.fetchDocumentaries}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Anime"
        fetchUrl={requests.fetchAnime}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Sci-Fi"
        fetchUrl={requests.fetchSciFi}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Thriller"
        fetchUrl={requests.fetchThriller}
        onMovieClick={setSelectedMovie}
      />
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {showLoader && (
        <div className="app__loaderOverlay" role="status" aria-live="polite" aria-busy="true">
          <div className="app__spinner" aria-hidden="true" />
          <span className="sr-only">Loading content...</span>
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
  