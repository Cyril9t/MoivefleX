import { data, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchButton, tvshowsSearch, searchNollyHood } from "./api/tmbD";
import { HashLoader, ScaleLoader } from "react-spinners";
export function SearchPage({ playtvShows, tvSeasons, gener, casting, tryVids, setOverviews }) {
    const [movieSearch, setMovieSearch] = useState("");
    const [searchedMovie, setSearchedMovie] = useState([])
    const [searchLoder, setSearchLoder] = useState(true)
    const [doting, setDoting] = useState("");
    const [handleGrid, setHandlGrid] = useState(false);
    const [profilePath, setProfilePath] = useState("moviePic");
    const [tv, setTv] = useState([]);
    const [nolly, setNolly] = useState([]);

    const handleSearch = () => {
        searchButton(movieSearch).then(data => setSearchedMovie(data.results));
        tvshowsSearch(movieSearch).then((data) => {
            setTv(data.results);
        });

        searchNollyHood(movieSearch).then((data) => {
            console.log("nolly", data)
            setNolly(data.results)
        })

    }

    useEffect(() => {

        if (searchedMovie.length <= 0) {
            setSearchLoder(true)
        } else if (searchedMovie.length >= 1) {
            setSearchLoder(false)
        }

    }, [searchedMovie])

    useEffect(() => {

        const time = setInterval(() => {
            setDoting((prev) => (prev.length >= 4 ? "" : prev + "."));
        }, 1000)

        return () => clearInterval(time);
    }, [])

    return (
        <div className="container">
            <header className="navbar">
                <div className="logo">
                    <i className="fas fa-film"></i>
                    <span>MOVIEFLEX</span>
                </div>
                <div className="search-wrapper">
                    <input
                        type="text"
                        className="search-bar "
                        placeholder="Search movie...."
                        onChange={(e) => {
                            setMovieSearch(e.target.value);
                        }}
                    />
                    <button className="buttonsWrap" onClick={() => {
                        handleSearch();

                    }}>
                        <i className="fas fa-search search-icon iconForSearch"></i>
                    </button>
                </div>
                <Link to="/">
                    <div className="profile">
                        <i className="fas fa-home"></i>
                    </div>
                </Link>
            </header>
            {movieSearch ? "" : < h1 > SEARCH MOVIES ON SEARCH BAR</h1>}
            {
                !searchLoder ? <div className="resultsPosition">

                    <h2 className=" forResult">Result For {movieSearch}</h2>

                    <div className="resultbar">
                    </div>
                </div> : ""
            }
            <div className="movie-grid whileResult">

                {
                    searchedMovie.map((movie, index) => {
                        return (
                            <div className="movie-cardGrid" key={movie.id} onClick={() => {
                                tryVids(movie.id);
                                setOverviews(movie);
                                casting(movie.id);
                                gener(movie.id);
                            }}>
                                <>
                                    <Link to="/player">
                                        <div className="movie-posterGrid" ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="grid-Pic " /></div>
                                        <div className="movie-info">
                                            <h3 className="movie-titleGrid">{movie.title}</h3>
                                            <span className="movie-year">{movie.release_date || movie.first_air_date}</span>
                                            {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                        </div>
                                    </Link>
                                </>
                            </div>
                        )

                    })
                }
                {/* Loading Section */}
                {/* <div className="overLay forSearch">
                    <ScaleLoader size={100} color="white" />
                    <p className="load">
                        Fetching Moives{doting}
                    </p>
                </div> */}

            </div>
            <div className="movie-grid whileResult">

                {
                    nolly.map((movie, index) => {
                        return (
                            <div className="movie-cardGrid" key={movie.id} onClick={() => {
                                tryVids(movie.id);
                                setOverviews(movie);
                                casting(movie.id);
                                gener(movie.id);
                            }}>
                                <>
                                    <Link to="/player">
                                        <div className="movie-posterGrid" ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="grid-Pic " /></div>
                                        <div className="movie-info">
                                            <h3 className="movie-titleGrid">{movie.title}</h3>
                                            <span className="movie-year">{movie.release_date || movie.first_air_date}</span>
                                            {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                        </div>
                                    </Link>
                                </>
                            </div>
                        )

                    })
                }


            </div>



            <br />
            <br />

            {!searchLoder ? <div className="resultsPosition"><div className="resultbar">
            </div> <h2 className=" forResult tvS">Tv Shows Result For {movieSearch}</h2> </div> : " "}
            <div className="movie-grid whileResult">
                {tv.map((movie) => {
                    return (
                        <div className="movie-cardGrid" key={movie.id} onClick={() => {
                            tvSeasons(movie.id);
                            playtvShows(movie.id);
                        }}>
                            <>
                                <Link to="/TvshowsPlayer">
                                    <div className="movie-posterGrid" ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="grid-Pic " /></div>
                                    <div className="movie-info">
                                        <h3 className="movie-titleGrid">{movie.title}</h3>
                                        <span className="movie-year">{movie.release_date || movie.first_air_date}</span>
                                        {/* <button className="favorite-btn"><i className="far fa-heart"></i></button> */}
                                    </div>
                                </Link>
                            </>
                        </div>
                    )

                })
                }
            </div>

        </div >
    )
}

