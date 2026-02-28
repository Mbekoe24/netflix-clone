const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "REACT_APP_TMDB_API_KEY is not set. TMDB requests will fail without an API key."
  );
}

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchAnime: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  // high-rated, fun, rewatchable movies
  fetchBoredomBusters: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=7&with_genres=35,28`,
  getImagesUrl: (mediaType, id) =>
    `/${mediaType}/${id}/images?api_key=${API_KEY}`,
};

export default requests;
