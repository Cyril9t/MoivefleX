import { Homepage } from "./FlexMoiveHome"
import { embededVideos } from "./api/tmbD";
import { PlayTrailer } from "./MoviePlayer";
import { useState } from "react";
import { Routes, Route, data } from "react-router-dom";
import { moviCast, genreAndruntime } from "./api/tmbD";
import { SearchPage } from "./searchPage";
function App() {
  const [overviews, setOverviews] = useState("")
  const [movieKeys, setMovieKeys] = useState([])
  const [casts, setCasts] = useState([])
  const [crew, setCrew] = useState([])
  const [directors, setDirectors] = useState([]);

  const [genres, setGenres] = useState([]);

  const tryVids = (movieId) => {
    embededVideos(movieId).then(data => {
      const trailers = data.results.find((vid) => (vid.type === "Trailer" && vid.site === "YouTube" && vid.name.toLowerCase().includes("official")) || vid.type === "Teaser")
      if (trailers) {
        setMovieKeys(trailers.key);
      }
    })
  }

  const casting = (idforCast) => {
    moviCast(idforCast).then(data => {
      setDirectors(data.crew)
      setCasts(data.cast)
      setCrew(data.crew)
    })

  }

  const gener = (idForgener) => {
    genreAndruntime(idForgener).then((data) => {
      setGenres(data)

    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage gener={gener} casting={casting} tryVids={tryVids} setOverviews={setOverviews} />}
      />
      <Route
        path="player"
        element={<PlayTrailer genres={genres} directors={directors} movieKeys={movieKeys} overviews={overviews} casts={casts} crew={crew} />}
      />

      <Route
        path="searchPage"
        element={<SearchPage gener={gener} casting={casting} tryVids={tryVids} setOverviews={setOverviews} />}
      />

    </Routes>
  )
}

export default App
