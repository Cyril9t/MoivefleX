import "./App.css";
import { populer, searchButton, topRated, trendings, upComings, embededVideos } from "../src/api/tmbD.js";
import { useState, useEffect } from "react";
import { RotateLoader } from "react-spinners";
import { data, Link } from "react-router-dom";
export function Homepage({ tryVids, setOverviews, casting }) {
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
    const [movieSearch, setMovieSearch] = useState("");
    const [searchedMovie, setSearchedMovie] = useState([])
    const [lnum, setLnum] = useState("50px");

    useEffect(() => {
        trendings().then(data => setweeklyTrends(data.results));
        populer().then(data => setPopulerMovie(data.results));
        topRated().then(data => setRatedMovie(data.results));
        upComings().then(data => setUpComingMovies(data.results));
    }, [])

    const handleSearch = () => {
        searchButton(movieSearch).then(data => setSearchedMovie(data.results));
    }

    useEffect(() => {
        if (weeklyTrends.length <= 0) {
            setLoading(true)

        } else if (weeklyTrends.length >= 1) {
            // console.log("fetdhhd", weeklyTrends)
            setLoading(false)
        }
    }, [weeklyTrends])

    const showGrid = () => {
        const condition = gridHandle ? "movie-grid" : "movie-flex";
        const cardCondition = gridHandle ? "movie-cardrGrid" : "movie-card";
        const infoCondition = gridHandle ? "movie-posterGrid" : "movie-poster";
        const tilte = gridHandle ? "movie-titleGrid" : "movie-title";
        setPopulerG(condition);
        setCards(cardCondition);
        setInfos(infoCondition);
        setMovieTitle(tilte);
    }
    return (

        <>
            <div className="container">

                <header className="navbar">
                    <div className="logo">
                        <i className="fas fa-film"></i>

                        <span>MOVIEFLEX</span>
                    </div>
                    <div className="search-wrapper">
                        <input type="text"
                            className="search-bar"
                            placeholder="Search movies..."
                            onChange={(e) => {
                                setMovieSearch(e.target.value);
                            }}
                        />

                    </div>
                    <button className="buttonsWrap" onClick={() => {
                        handleSearch();
                        console.log(searchedMovie);
                    }}><i className="fas fa-search search-icon"></i></button>
                    <div className="profile">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </header>


                <main>

                    {searchedMovie && <>
                        {movieSearch && <div className="resultsPosition"><div className="resultbar"><div className="exitIcon"><button className="exit" onClick={() => {
                            setSearchedMovie(prev => !prev);
                        }}>&times;</button>
                        </div> <h2 className=" forResult">Result For {movieSearch}</h2> </div></div>}

                        <div className="movie-grid whileResult">

                            {
                                searchedMovie.map((movie) => {
                                    return (
                                        <div className="movie-cardGrid" key={movie.id}>
                                            <div className="movie-posterGrid" ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                            <div className="movie-info">
                                                <h3 className="movie-title">{movie.title}</h3>
                                                <span className="movie-year">{movie.release_date}</span>
                                                <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                            </div>
                                        </div>

                                    )

                                })
                            }
                        </div> </>}

                    <h2 className="section-title">Recommended for you</h2>
                    <div className="seeAll">
                        <h1 className="category">🔥Weekly Trends</h1>
                        <h3 className="seeButton"
                            onClick={() => {
                                showGrid();
                                setGridHandle((prev) => !prev)
                            }}
                        >See All</h3>
                    </div>
                    {loading ? <div className="overLay"><RotateLoader size={lnum} color="red" /></div>
                        :
                        <div className={populerG}>
                            {
                                weeklyTrends.map((movie) => {
                                    return (
                                        <div className={cards} key={movie.id} onClick={() => {
                                            tryVids(movie.id);
                                            setOverviews(movie);
                                            casting(movie.id);
                                        }}>
                                            <Link to="player">
                                                <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                                <div className="movie-info">
                                                    <h3 className={movieTitle}>{movie.title}</h3>
                                                    <span className="movie-year">{movie.release_date}</span>
                                                    <button className="favorite-btn"><i className="far fa-heart"></i></button>
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
                                    }}>

                                        <Link to="player">
                                            <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                            <div className="movie-info">
                                                <h3 className={movieTitle}>{movie.title}</h3>
                                                <span className="movie-year">{movie.release_date}</span>
                                                <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div> : <div className="overLay"><RotateLoader size={50} color="red" /></div>}

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
                                    }}>
                                        <Link to="player">
                                            <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                            <div className="movie-info">
                                                <h3 className={movieTitle}>{movie.title}</h3>
                                                <span className="movie-year">{movie.release_date}</span>
                                                <span className="movie-year">{Math.round(movie.vote_average)}⭐ <small>{`(${movie.vote_average}/10)`}</small> <small><i>{`${movie.vote_count} vote`}</i></small></span>
                                                <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div> : <div className="overLay"><RotateLoader size={50} color="red" /></div>}
                    <div className="seeAll">
                        <h1 className="category">⬆️ Up Next</h1>
                        <h3 className="seeButton" onClick={() => {
                            showGrid();
                            setGridHandle((prev) => !prev)
                        }}>See All</h3>
                    </div>
                    <div className="movie-flex">
                        {upComingMovies.map((movie) => {
                            return (
                                <div className={cards} key={movie.id} onClick={() => {
                                    tryVids(movie.id);
                                    setOverviews(movie);
                                    casting(movie.id);
                                }}>
                                    <Link to="player">
                                        <div className={infos} ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                        <div className="movie-info">
                                            <h3 className={movieTitle}>{movie.title}</h3>
                                            <span className="movie-year">{movie.release_date}</span>
                                            <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </main>
            </div>
            <footer className="footer">
                <p>© 2025 MOVIEFLEX</p>
            </footer>
        </>
    )

}