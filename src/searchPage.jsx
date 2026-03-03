import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchButton } from "./api/tmbD";
import { HashLoader, ScaleLoader } from "react-spinners";
export function SearchPage({ gener, casting, tryVids, setOverviews }) {
    const [movieSearch, setMovieSearch] = useState("");
    const [searchedMovie, setSearchedMovie] = useState([])
    const [searchLoder, setSearchLoder] = useState(null)
    const [doting, setDoting] = useState("")


    const handleSearch = () => {
        searchButton(movieSearch).then(data => setSearchedMovie(data.results));
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
                        console.log(searchedMovie);
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
            {!movieSearch ? <h1>SEARCH MOVIES ON SEARCH BAR</h1> : <>
                {searchedMovie && <>
                    {movieSearch && <div className="resultsPosition"><div className="resultbar"><div className="exitIcon">
                    </div> <h2 className=" forResult">Result For {movieSearch}</h2> </div></div>}
                    <div className="movie-grid whileResult">
                        {searchLoder ? <div className="overLay forSearch"><ScaleLoader size={100} color="white" /><p className="load">Fetching Moives{doting}</p></div> :
                            <>
                                {
                                    searchedMovie.map((movie) => {
                                        return (
                                            <div className="movie-cardGrid" key={movie.id} onClick={() => {
                                                tryVids(movie.id);
                                                setOverviews(movie);
                                                casting(movie.id);
                                                gener(movie.id);
                                            }}>
                                                <>
                                                    <Link to="/player">
                                                        <div className="movie-posterGrid" ><img src={!movie.poster_path ? "/gallery-svgrepo-com.svg" : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                                        <div className="movie-info">
                                                            <h3 className="movie-title">{movie.title}</h3>
                                                            <span className="movie-year">{movie.release_date}</span>
                                                            <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                                        </div>
                                                    </Link>
                                                </>
                                            </div>
                                        )

                                    })
                                }
                            </>}
                    </div> </>}</>}

        </div>
    )
}