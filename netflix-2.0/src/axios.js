import axios from "axios";

/** base url to make request to the themoviedatabase */

const instance = axios.create(
  { baseURL: "https://api.themoviedb.org/3" })
  ;

// using axios .create it allows you to create multiple instances of Axios. These instances will have
// different paths.

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar


export default instance;
