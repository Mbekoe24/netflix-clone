import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner({ onMovieSelect }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data?.results || [];
        if (results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setMovie(results[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to load banner content:", error);
      }
    }
    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "…" : str;

  const backgroundPath = movie?.backdrop_path || movie?.poster_path;

  const handleSelectMovie = () => {
    if (movie && onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  return (
    <header className="banner">
      {backgroundPath && (
        <img
          className="banner__bg"
          src={`https://image.tmdb.org/t/p/original${backgroundPath}`}
          alt=""
          aria-hidden
        />
      )}
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name || "Featured"}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button" onClick={handleSelectMovie} aria-label={`Play ${movie?.title || movie?.name || "featured content"}`}>
            Play
          </button>
          <button
            className="banner__button banner__button--secondary"
            onClick={handleSelectMovie}
            aria-label={`More info about ${movie?.title || movie?.name || "featured content"}`}
          >
            More Info
          </button>
        </div>

        <p className="banner__description">
          {truncate(movie?.overview || "", 150)}
        </p>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;

