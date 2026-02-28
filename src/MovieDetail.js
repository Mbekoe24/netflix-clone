import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./MovieDetail.css";

function MovieDetail({ movie, onClose }) {
  const [trailerId, setTrailerId] = useState("");

  const title =
    (movie && (movie.title || movie.name || movie.original_name)) || "Details";
  const releaseDate =
    (movie && (movie.release_date || movie.first_air_date)) || null;

  useEffect(() => {
    if (!movie) {
      setTrailerId("");
      return;
    }

    const name = movie.title || movie.name || movie.original_name || "";
    const year =
      (movie.release_date || movie.first_air_date || "").slice(0, 4) || undefined;

    movieTrailer(name, { year })
      .then((url) => {
        if (!url) {
          setTrailerId("");
          return;
        }
        try {
          const urlObj = new URL(url);
          const params = new URLSearchParams(urlObj.search);
          const id = params.get("v");
          setTrailerId(id || "");
        } catch {
          setTrailerId("");
        }
      })
      .catch(() => {
        setTrailerId("");
      });
  }, [movie, title]);

  const youtubeOpts = {
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  if (!movie) {
    return null;
  }

  return (
    <section className="movieDetail" onClick={onClose}>
      <div
        className="movieDetail__inner"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="movieDetail__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>
        {trailerId && (
          <div className="movieDetail__trailer">
            <YouTube videoId={trailerId} opts={youtubeOpts} />
          </div>
        )}
        <h2 className="movieDetail__title">{title}</h2>
        <div className="movieDetail__meta">
          {releaseDate && <span>{releaseDate.slice(0, 4)}</span>}
          {typeof movie.vote_average === "number" && (
            <span>Rating: {movie.vote_average.toFixed(1)}</span>
          )}
          {movie.vote_count ? <span>{movie.vote_count} votes</span> : null}
        </div>
        {movie.overview && (
          <p className="movieDetail__overview">{movie.overview}</p>
        )}
      </div>
    </section>
  );
}

export default MovieDetail;

