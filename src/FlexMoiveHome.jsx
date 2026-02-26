import "./App.css";
import { populer, trendings } from "../src/api/tmbD.js";
import { useState, useEffect } from "react";
import { RotateLoader } from "react-spinners";
export function Homepage() {
    const [weeklyTrends, setweeklyTrends] = useState([]);
    const [populerMovie, setPopulerMovie] = useState([]);


    useEffect(() => {
        trendings().then(data => setweeklyTrends(data.results));
        console.log(weeklyTrends)
    }, [])


    useEffect(() => {
        populer().then(data => setPopulerMovie(data.results));

    }, [])


    return (

        <>
            <div className="container">
                {/* <div className="overLay">
                    <RotateLoader size={50} color="white" />
                </div> */}
                <header className="navbar">
                    <div className="logo">
                        <i className="fas fa-film"></i>
                        <span>MOVIEFLEX</span>
                    </div>
                    <div className="search-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" className="search-bar" placeholder="Search movies..." />
                    </div>
                    <div className="profile">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </header>


                <main>

                    <h2 className="section-title">Recommended for you</h2>


                    <div className="seeAll">
                        <h1 className="category">🔥Weekly Trends</h1>
                        <h3 className="seeButton">See All</h3>
                    </div>


                    <div className="movie-flex">

                        {weeklyTrends.map((movie) => {
                            return (
                                <div className="movie-card" key={movie.id}>
                                    <div className="movie-poster" ><img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                    <div className="movie-info">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <span className="movie-year">{movie.release_date}</span>
                                        <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                    </div>
                                </div>

                            )

                        })}
                    </div>

                    <div className="seeAll">
                        <h1 className="category">🚀Populer</h1>
                        <h3 className="seeButton">See All</h3>
                    </div>
                    <div className="movie-flex">

                        {populerMovie.map((movie) => {
                            return (

                                <div className="movie-card" key={movie.id}>
                                    <div className="movie-poster" ><img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                    <div className="movie-info">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <span className="movie-year">{movie.release_date}</span>
                                        <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="movie-flex">

                        {populerMovie.map((movie) => {
                            return (

                                <div className="movie-card" key={movie.id}>
                                    <div className="movie-poster" ><img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="moviePic" /></div>
                                    <div className="movie-info">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <span className="movie-year">{movie.release_date}</span>
                                        <button className="favorite-btn"><i className="far fa-heart"></i></button>
                                    </div>
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