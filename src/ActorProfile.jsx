import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { CircleLoader } from "react-spinners"
import "./Actor.css"


export function ActorBio({ actorProfile, actorMovies }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (actorMovies.length <= 0) {
            setLoading(true)

        } else if (actorMovies.length >= 1) {
            setLoading(false)
        }
        console.log(actorMovies)

    }, [actorMovies])


    return (
        <div className="container">

            <header className="navbar">
                <div className="logo">
                    <i className="fas fa-film"></i>
                    <span>MOVIEFLEX</span>
                </div>

                <div className="search-wrapper">

                    <button className="search-bar BackForplayer">About {actorProfile.name}</button>

                </div>
                <Link to="/player">
                    <div className="profile">
                        <i className="fas fa-video"></i>
                    </div>
                </Link>
            </header>
            <main className="container">


                {loading ? <div className="loading">< CircleLoader size={150} color="red" /> <h6>Loading...</h6>  </div> : <>

                    <div className="profiles">

                        <div className="profiles-card">
                            <div className="profiles-img">
                                <img src={`https://image.tmdb.org/t/p/w500${actorProfile.profile_path}`} className="actorProfile" alt={actorProfile.name} />
                            </div>
                            <h1 className="actor-name">{actorProfile.name}</h1>
                            {/* <p className="actor-role">Actress</p> */}

                        </div>

                        <div className="profiles-details">
                            <div className="bio-section">
                                <h2>Biography</h2>
                                <p>{actorProfile.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="info-label">Birthday</span>
                            <span className="info-value">{actorProfile.birthday}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-venus-mars"></i>
                            <span className="info-label">Gender</span>
                            <span className="info-value">{actorProfile.gender === 2 ? "MALE" : "FEMALE"}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-film"></i>
                            <span className="info-label">Known For</span>
                            <span className="info-value">{actorProfile.known_for_department}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-briefcase"></i>
                            <span className="info-label">Department</span>
                            <span className="info-value">Acting</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="info-label">Place of Birth</span>
                            <span className="info-value">{actorProfile.place_of_birth}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-chart-line"></i>
                            <span className="info-label">Popularity</span>
                            <span className="info-value">{actorProfile.popularity}</span>
                        </div>
                    </div>

                    <section className="known-for">
                        <h2>Known For</h2>
                        <div className="movie-grid">
                            {actorMovies.map((movie) => {
                                return (
                                    <div className="movie-card" key={movie?.id}>
                                        <div className="movie-poster" >
                                            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className="actor known" alt={movie?.title} />
                                        </div>
                                        <p className="movie-title">{movie?.title}</p>
                                        <p className="movie-year">{movie?.release_date}</p>
                                    </div>
                                )
                            })}



                            {/* <div className="movie-card">
                            <div className="movie-poster"></div>
                            <p className="movie-title">Scream 2</p>
                            <p className="movie-year">1997</p>
                        </div>
                        <div className="movie-card">
                            <div className="movie-poster"></div>
                            <p className="movie-title">Scream 3</p>
                            <p className="movie-year">2000</p>
                        </div>
                        <div className="movie-card">
                            <div className="movie-poster"></div>
                            <p className="movie-title">Scream 4</p>
                            <p className="movie-year">2011</p>
                        </div> */}
                        </div>
                    </section> </>}
            </main>
        </div>
    )
}