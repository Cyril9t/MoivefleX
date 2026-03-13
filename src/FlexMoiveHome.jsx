import "./App.css";
import { populer, searchButton, topRated, trendings, upComings, embededVideos, tvshows } from "../src/api/tmbD.js";
import { useState, useEffect } from "react";
import { HashLoader, ClipLoader } from "react-spinners";
import { data, Link } from "react-router-dom";
export function Homepage({ playtvShows, genres, tryVids, setOverviews, casting, gener, tvSeasons, setEachtvID }) {
    const [weeklyTrends, setweeklyTrends] = useState([]);
    const [populerMovie, setPopulerMovie] = useState([]);
    const [ratedMovie, setRatedMovie] = useState([]);
    const [upComingMovies, setUpComingMovies] = useState([]);
    const [gridHandle, setGridHandle] = useState(false);
    const [populerG, setPopulerG] = useState("movie-flex");
    const [cards, setCards] = useState("movie-card");
    const [infos, setInfos] = useState("movie-poster");
    const [movieTitle, setMovieTitle] = useState("movie-title");
    const [loading, setLoading] = useState(null);
    const [doting, setDoting] = useState("")
    const [profilePath, setProfilePath] = useState("moviePic");
    const [tvshow, setTvshow] = useState([]);


    useEffect(() => {
        trendings().then(data => setweeklyTrends(data.results));
        populer().then(data => setPopulerMovie(data.results));
        topRated().then(data => setRatedMovie(data.results));
        upComings().then(data => setUpComingMovies(data.results));
        tvshows().then(data => setTvshow(data.results));

    }, [])

    useEffect(() => {
        if (weeklyTrends.length <= 0) {
            setLoading(true)

        } else if (weeklyTrends.length >= 1) {

            setLoading(false)
        }

    }, [weeklyTrends])

    const showGrid = () => {
        const condition = gridHandle ? "movie-grid" : "movie-flex";
        const cardCondition = gridHandle ? "movie-cardrGrid" : "movie-card";
        const infoCondition = gridHandle ? "movie-posterGrid" : "movie-poster";
        const tilte = gridHandle ? "movie-titleGrid" : "movie-title";
        const pic = gridHandle ? "grid-Pic" : "moviePic";
        setProfilePath(pic);
        setPopulerG(condition);
        setCards(cardCondition);
        setInfos(infoCondition);
        setMovieTitle(tilte);
    }



    useEffect(() => {

        const time = setInterval(() => {
            setDoting((prev) => (prev.length >= 4 ? "" : prev + "."));
        }, 1000)
        return () => clearInterval(time);
    }, [])
    return (
        <>
            <div className="container">
                <Link to="searchPage">
                    <header className="navbar">
                        <div className="logo">
                            <i className="fas fa-film"></i>

                            <span>MOVIEFLEX</span>
                        </div>

                        <div className="search-wrapper">

                            <button
                                className="search-bar fonts"
                            >Search movie....</button>
                        </div>

                        <div className="profile">
                            <i className="fas fa-user-circle"></i>
                        </div>

                    </header>
                </Link>
                <main>
                    <h2 className="section-title">Recommended</h2>
                    <div className="seeAll">
                        <h1 className="category">🔥Weekly Trends</h1>
                        <h3 className="seeButton"
                            onClick={() => {
                                showGrid();
                                setGridHandle((prev) => !prev)
                            }}
                        >See All</h3>
                    </div>
                    {loading ? <div className="overLay"><  HashLoader size={50} color="white" /><p className="load">Loading{doting}</p></div>
                        :
                        <div className={populerG}>
                            {
                                weeklyTrends.map((movie) => {
                                    return (
                                        <div className={cards} key={movie.id} onClick={() => {
                                            tryVids(movie.id);
                                            setOverviews(movie);
                                            casting(movie.id);
                                            gener(movie.id);

                                        }}>
                                            <Link to="player">
                                                <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={profilePath} /></div>
                                                <div className="movie-info">
                                                    <h3 className={movieTitle}>{movie.title}</h3>
                                                    <span className="movie-year">{movie.release_date}</span>
                                                    {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>}


                    <div className="seeAll">
                        <h1 className="category">🚀Populer</h1>
                        <h3 className="seeButton"
                            onClick={() => {
                                showGrid();
                                setGridHandle((prev) => !prev)
                            }}
                        >See All</h3>
                    </div>
                    {!loading ?
                        <div className={populerG}>
                            {populerMovie.map((movie) => {
                                return (
                                    <div className={cards} key={movie.id} onClick={() => {
                                        tryVids(movie.id);
                                        setOverviews(movie);
                                        casting(movie.id);
                                        gener(movie.id);
                                    }}>

                                        <Link to="player">
                                            <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={profilePath} /></div>
                                            <div className="movie-info">
                                                <h3 className={movieTitle}>{movie.title}</h3>
                                                <span className="movie-year">{movie.release_date}</span>
                                                {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div> : <div className="overLay"><  HashLoader size={50} color="white" /><p className="load">Loading{doting}</p></div>}

                    <div className="seeAll">
                        <h1 className="category">📺Tv Shows</h1>
                        <h3 className="seeButton"
                            onClick={() => {
                                showGrid();
                                setGridHandle((prev) => !prev)
                            }}
                        >See All</h3>
                    </div>
                    {!loading ?
                        <div className={populerG}>
                            {tvshow.map((movie) => {
                                return (
                                    <div className={cards} key={movie.id} onClick={() => {
                                        //  tryVids(movie.id);
                                        // setOverviews(movie);
                                        // casting(movie.id);
                                        // gener(movie.id);
                                        tvSeasons(movie.id);
                                        setEachtvID(movie.id);
                                        playtvShows(movie.id);
                                    }}>

                                        <Link to="/tvshowsPlayer">
                                            <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={profilePath} /></div>
                                            <div className="movie-info">
                                                <h3 className={movieTitle}>{movie.name}</h3>
                                                <span className="movie-year">{movie.first_air_date}</span>
                                                {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div> : <div className="overLay"><  HashLoader size={50} color="white" /><p className="load">Loading{doting}</p></div>}

                    <div className="seeAll">
                        <h1 className="category">⭐Top Rated</h1>
                        <h3 className="seeButton" onClick={() => {
                            showGrid();
                            setGridHandle((prev) => !prev)
                        }}>See All</h3>
                    </div>
                    {!loading ?
                        <div className={populerG}>

                            {ratedMovie.map((movie) => {
                                return (
                                    <div className={cards} key={movie.id} onClick={() => {
                                        tryVids(movie.id);
                                        setOverviews(movie);
                                        casting(movie.id);
                                        gener(movie.id);
                                    }}>
                                        <Link to="player">
                                            <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={profilePath} /></div>
                                            <div className="movie-info">
                                                <h3 className={movieTitle}>{movie.title}</h3>
                                                <span className="movie-year grades">{movie.release_date}</span>
                                                <span className="movie-year grades">{Math.round(movie.vote_average)}⭐ <small>{`(${movie.vote_average}/10)`}</small> <small><i>{`${movie.vote_count} vote`}</i></small></span>
                                                {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div> : <div className="overLay"><  HashLoader size={50} color="white" /><p className="load">Loading{doting}</p></div>}

                    <div className="seeAll">
                        <h1 className="category">⬆️ Up Next</h1>
                        <h3 className="seeButton" onClick={() => {
                            showGrid();
                            setGridHandle((prev) => !prev)
                        }}>See All</h3>
                    </div>

                    {loading ? <div className="overLay"><  HashLoader size={30} color="white" /><p className="load">Loading{doting}</p></div> : <div className={populerG}>
                        {upComingMovies.map((movie) => {
                            return (
                                <div className={cards} key={movie.id} onClick={() => {
                                    tryVids(movie.id);
                                    setOverviews(movie);
                                    casting(movie.id);
                                    gener(movie.id);
                                }}>
                                    <Link to="player">
                                        <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={profilePath} /></div>
                                        <div className="movie-info">
                                            <h3 className={movieTitle}>{movie.title}</h3>
                                            <span className="movie-year">{movie.release_date}</span>
                                            {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>}
                </main>
            </div >
            <footer className="footer">
                <p>© 2025 MOVIEFLEX</p>
            </footer>
        </>
    )

}