import React, { useState, useEffect } from "react";
import axios from "./axios";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  // const base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      Row
      <h2> {title} </h2>
      {/*container => poster */}
    </div>
  );
}

export default Row;
