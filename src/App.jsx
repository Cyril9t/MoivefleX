import { Homepage } from "./FlexMoiveHome"
import { embededVideos } from "./api/tmbD";
import { PlayTrailer } from "./MoviePlayer";
import { useEffect, useState } from "react";
import { Routes, Route, data } from "react-router-dom";
import { ActorBio } from "./ActorProfile"
import { moviCast, genreAndruntime, castProfiles, actorOtherMovies, contryFlags, tvshowsSeasons, tvshowsPlayer } from "./api/tmbD";
import { TvshowsPlayer } from "./TvshowPlayer";
import { SearchPage } from "./searchPage";
function App() {
  const [overviews, setOverviews] = useState("")
  const [movieKeys, setMovieKeys] = useState([])
  const [casts, setCasts] = useState([])
  const [crew, setCrew] = useState([])
  const [directors, setDirectors] = useState([]);
  const [actorProfile, setActorProfile] = useState([]);
  const [actorMovies, setActorMovies] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [genres, setGenres] = useState([]);
  const [eachtvID, setEachtvID] = useState("");
  const [tvTrailer, setTvTrailer] = useState([]);

  const tryVids = (movieId) => {
    embededVideos(movieId).then(data => {
      const trailers = data.results.find((vid) => (vid.type === "Trailer" && vid.site === "YouTube" && vid.name.toLowerCase().includes("official")) || vid.type === "Teaser" || vid.type === "Featurette")
      if (trailers) {
        setMovieKeys(trailers);
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

  const actorBio = (personId) => {
    castProfiles(personId).then((data) => {
      setActorProfile(data);
    })
  }

  const alsoKnownFor = (id) => {
    actorOtherMovies(id).then(data => setActorMovies(data.cast));
  }

  const tvSeasons = (tvId) => {
    tvshowsSeasons(tvId).then((data) => {
      setSeasons(data);
    })
  }

  const playtvShows = (showid) => {
    tvshowsPlayer(showid).then((data) => {
      // console.log(data);
      const trailers = data.results.find((vid) => (vid.type === "Trailer" && vid.site === "YouTube" || vid.type === "Teaser" || vid.type === "Featurette" || vid.type === "Clip"))
      if (trailers) {
        setTvTrailer(trailers.key);
      }
    })

  }


  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage playtvShows={playtvShows} setEachtvID={setEachtvID} tvSeasons={tvSeasons} gener={gener} casting={casting} tryVids={tryVids} setOverviews={setOverviews} />}
      />
      <Route
        path="player"
        element={<PlayTrailer alsoKnownFor={alsoKnownFor} actorBio={actorBio} actorProfile={actorProfile} genres={genres} directors={directors} movieKeys={movieKeys} overviews={overviews} casts={casts} crew={crew} />}
      />

      <Route
        path="searchPage"
        element={<SearchPage playtvShows={playtvShows} tvSeasons={tvSeasons} gener={gener} casting={casting} tryVids={tryVids} setOverviews={setOverviews} />}
      />

      <Route
        path="actorProfile"
        element={<ActorBio gener={gener} casting={casting} setOverviews={setOverviews} tryVids={tryVids} actorMovies={actorMovies} actorProfile={actorProfile} />}
      />
      <Route
        path="tvshowsPlayer"
        element={<TvshowsPlayer tvTrailer={tvTrailer} eachtvID={eachtvID} seasons={seasons} />}
      />

    </Routes>
  )
}

export default App
