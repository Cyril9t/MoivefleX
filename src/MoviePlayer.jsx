import "./index.css"
import { useState, useEffect } from "react";

import { Link } from "react-router-dom"
export function PlayTrailer({ movieKeys, overviews, casts, crew, directors }) {



    const setRate = (rateings) => {
        const star = [];
        const halfstars = [];


        const fullStar = Math.floor(rateings);
        const halfStar = (rateings % 1) >= 0.5 ? 1 : 0;

        for (let i = 0; i < fullStar; i++) {
            star.push(<i className="fas fa-star" key={i}></i>)
        }
        if (halfStar === 1) {
            halfstars.push(<i className="fas fa-star-half-alt" key={Math.random} ></i>)
        }

        return (<div>{star}{halfstars}</div>)
    }


    useEffect(() => {
        const dtails = directors.filter((wrds) => wrds.jobs === "Director")
        if (dtails) {
            console.log(dtails)
        } else {
            console.log("non found");
        }

    }, [])

    console.log(directors)




    return (
        <>


            <div className="container">




                <header className="navbar">
                    <div className="logo">
                        <i className="fas fa-film"></i>
                        <span>MOVIEFLEX</span>
                    </div>
                    <div className="search-wrapper">
                        <Link to="/">
                            <button className="search-bar">Back To Home</button>
                        </Link>
                    </div>
                    <div className="profile">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </header>


                <main className="movie-detail">

                    <div className="video-section">
                        <div className="video-container">

                            <iframe src={`https://www.youtube.com/embed/${movieKeys}?autoplay=1&rel=0`}
                                width="100%"
                                height="550"
                                title="Movies Trailler"
                                allow="autoplay; gyroscope; encrypted-media" allowFullScreen ></iframe>
                        </div>
                    </div>

                    <div className="movie-header">
                        <h1 className="movie-main-title">{overviews.title}</h1>
                        <div className="movie-meta">
                            <span className="release-year">{overviews.release_date}</span>
                            <span className="age-rating">PG-13</span>
                            <span className="runtime">Trailer</span>
                            <span className="genre">Sci-Fi / Adventure</span>
                        </div>
                        <div className="rating-block">
                            <div className="rating-stars">
                                {setRate(overviews.vote_average)}
                                <span className="rating-value">{Math.round(overviews.vote_average)}/10</span>
                            </div>

                            <div className="vote-count">
                                <i className="fas fa-users"></i> {overviews.vote_count}K votes
                            </div>
                        </div>

                    </div>


                    <div className="overview">
                        <h2>Synopsis</h2>
                        <p>{overviews.overview}</p>
                    </div>


                    <div className="cast-section">
                        <h2>Top Cast</h2>
                        <div className="cast-grid">





                            {casts.map((allcast) => {
                                return (
                                    <div className="cast-card" key={allcast.credit_id}>
                                        <div className="cast-photo">{!allcast.profile_path ? <b>{`${allcast.name} "didn't Upload Image"`}</b> : <img src={`https://image.tmdb.org/t/p/w500${allcast.profile_path}`} className="actor" alt={allcast.name} />}</div>
                                        <div className="cast-info">
                                            <h4>{allcast.name}</h4>
                                            <p>played as👇</p>
                                            <p><b>{allcast.character}</b></p>

                                        </div>
                                    </div>
                                )
                            })}

                        </div><br />
                        <br />
                        <h2>Crew</h2>


                        <div className="cast-grid">
                            {crew.map((allCrew) => {
                                return (
                                    <div className="cast-card" key={allCrew.credit_id} >
                                        <div className="cast-photo" >{!allCrew.profile_path ? <b>{`${allCrew.name} "didn't Upload Image"`}</b> : <img src={`https://image.tmdb.org/t/p/w500${allCrew.profile_path}`} className="actor" alt={allCrew.name} />}</div>
                                        <div className="cast-info">
                                            <h4>{allCrew.name}</h4>
                                            <p>{allCrew.job}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>




                    <div className="crew-section">

                        <div className="crew-item">
                            <span className="crew-label">Director:</span>
                            <span className="crew-value">{directors.name}</span>
                        </div>
                        <div className="crew-item">
                            <span className="crew-label">Writers:</span>
                            <span className="crew-value"></span>

                        </div>


                    </div>

                </main >
            </div >


            <footer className="footer">
                <p>© 2025 MOVIEFLEX</p>
            </footer>






        </>
    )

}
