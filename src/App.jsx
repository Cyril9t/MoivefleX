import { Homepage } from "./FlexMoiveHome"
import { embededVideos } from "./api/tmbD";
import { PlayTrailer } from "./MoviePlayer";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
function App() {
  const [overviews, setOverviews] = useState("")
  const [movieKeys, setMovieKeys] = useState([])

  const tryVids = (movieId) => {
    embededVideos(movieId).then(data => {
      const trailers = data.results.find((vid) => (vid.type === "Trailer" && vid.site === "YouTube" && vid.name.toLowerCase().includes("official")) || vid.type === "Teaser")
      if (trailers) {
        setMovieKeys(trailers.key);
      }
    })
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage tryVids={tryVids} setOverviews={setOverviews} />}
      />
      <Route
        path="player"
        element={<PlayTrailer movieKeys={movieKeys} overviews={overviews} />}
      />

    </Routes>
  )
}

export default App
