import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Row.css";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";

function Row({ title, fetchUrl, isLargeRow, onMovieClick, mediaType = "movie" }) {
  const [movies, setMovies] = useState([]);
  const [logos, setLogos] = useState({});
  const rowRef = useRef(null);

  const truncate = (str, n) =>
    str && str.length > n ? `${str.slice(0, n - 1)}…` : str;

  useEffect(() => {
    async function fetchData() {
      try {
        let request = await axios.get(fetchUrl);
        let results = request.data?.results || [];
        if (mediaType === "all") {
          results = results.filter((r) => r.media_type === "movie" || r.media_type === "tv");
          if (results.length === 0) {
            request = await axios.get(requests.fetchTrendingMovies);
            results = (request.data?.results || []).map((r) => ({ ...r, media_type: "movie" }));
          }
        }
        setMovies(results);
      } catch (error) {
        console.error(`Failed to load movies for row "${title}":`, error);
        setMovies([]);
      }
    }
    fetchData();
  }, [fetchUrl, title, mediaType]);

  useEffect(() => {
    if (movies.length === 0) return;

    const fetchLogos = async () => {
      const batchSize = 5;
      const newLogos = {};

      for (let i = 0; i < movies.length; i += batchSize) {
        const batch = movies.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map(async (movie) => {
            const type = mediaType === "all" ? movie.media_type || "movie" : mediaType;
            if (type === "person") return { id: movie.id, path: null };
            const id = movie.id;
            const res = await axios.get(requests.getImagesUrl(type, id));
            const logoList = res.data?.logos || [];
            if (logoList.length === 0) return { id, path: null };
            const best = logoList.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0];
            return { id, path: best.file_path };
          })
        );
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value?.path) {
            newLogos[r.value.id] = r.value.path;
          }
        });
        if (i + batchSize < movies.length) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      setLogos((prev) => ({ ...prev, ...newLogos }));
    };

    fetchLogos();
  }, [movies, mediaType]);

  const handleScroll = (direction) => {
    if (!rowRef.current) return;
    const { clientWidth } = rowRef.current;
    const scrollAmount = clientWidth * 0.9;

    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__scroll">
        <button
          type="button"
          className="row__arrow row__arrow--left"
          onClick={() => handleScroll("left")}
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => {
            const imagePath = movie.backdrop_path || movie.poster_path;
            if (!imagePath) {
              return null;
            }

            const name =
              movie.title || movie.name || movie.original_name || "Movie";
            const overview = movie.overview || "";
            const logoPath = logos[movie.id];

            return (
              <div
                key={movie.id}
                role="button"
                tabIndex={0}
                className={`row__posterWrapper ${
                  isLargeRow ? "row__posterWrapper--large" : ""
                }`}
                onClick={() => onMovieClick && onMovieClick(movie)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && onMovieClick) {
                    e.preventDefault();
                    onMovieClick(movie);
                  }
                }}
                aria-label={`View details for ${name}`}
              >
                <img
                  className={`row__poster ${
                    isLargeRow ? "row__poster--large" : ""
                  }`}
                  src={`${TMDB_IMG_BASE}/original${imagePath}`}
                  alt={name}
                />
                <div className="row__posterLogo">
                  {logoPath ? (
                    <img
                      className="row__posterLogoImg"
                      src={`${TMDB_IMG_BASE}/${logoPath.endsWith(".svg") ? "original" : "w154"}${logoPath}`}
                      alt=""
                    />
                  ) : (
                    <span className="row__posterLogoText">{name}</span>
                  )}
                </div>
                <div className="row__posterTitle">
                  <div className="row__posterTitleName">{name}</div>
                  {overview && (
                    <div className="row__posterTitleOverview">
                      {truncate(overview, 80)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="row__arrow row__arrow--right"
          onClick={() => handleScroll("right")}
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Row;
