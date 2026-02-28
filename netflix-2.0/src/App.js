import "./App.css";
import Row from "./Row";
import requests from "./request";
function App() {
  return (
    <div className="App">
      <Row title="Netflix Originals" fetchUrl={requests.getNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={requests.getTrending} />
      <Row title="Top Rated" fetchUrl={requests.getTopRated} />
      <Row title="Action Movies" fetchUrl={requests.getActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.getComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.getHorrorMovies} />
      <Row title="Documentaries" fetchUrl={requests.getDocumentaries} />
      <Row title="Romance Movies" fetchUrl={requests.getRomanceMovies} />
    </div>
  );
}

export default App;
