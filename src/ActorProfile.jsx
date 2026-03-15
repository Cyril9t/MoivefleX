import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { CircleLoader } from "react-spinners"

import "./Actor.css"


export function ActorBio({ gener, casting, setOverviews, tryVids, actorProfile, actorMovies }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (actorMovies.length <= 0) {
            setLoading(true)

        } else if (actorMovies.length >= 1) {
            setLoading(false)
        }
        // console.log(actorMovies)

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
                    <div className="infoss-grid">
                        <div className="infoss-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="infoss-label">Birthday</span>
                            <span className="infoss-value">{actorProfile.birthday}</span>
                        </div>
                        <div className="infoss-item">
                            <i className="fas fa-venus-mars"></i>
                            <span className="infoss-label">Gender</span>
                            <span className="infoss-value">{actorProfile.gender === 2 ? "MALE" : "FEMALE"}</span>
                        </div>
                        <div className="infoss-item">
                            <i className="fas fa-film"></i>
                            <span className="infoss-label">Known For</span>
                            <span className="infoss-value">{actorProfile.known_for_department}</span>
                        </div>
                        <div className="infoss-item">
                            <i className="fas fa-briefcase"></i>
                            <span className="infoss-label">Department</span>
                            <span className="infoss-value">Acting</span>
                        </div>
                        <div className="infoss-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="infoss-label">Place of Birth</span>
                            <span className="infoss-value">{actorProfile.place_of_birth}</span>
                        </div>
                        <div className="infoss-item">
                            <i className="fas fa-chart-line"></i>
                            <span className="infoss-label">Popularity</span>
                            <span className="infoss-value">{actorProfile.popularity}</span>
                        </div>
                    </div>

                    <section className="known-for">
                        <h2>Known For</h2>
                        <div className="moviess-grid">
                            {actorMovies.map((moviess) => {

                                return (

                                    <div className="moviess-card" key={moviess?.id}
                                        onClick={() => {
                                            tryVids(moviess.id);
                                            setOverviews(moviess);
                                            gener(moviess.id);
                                            casting(moviess.id)
                                        }}
                                    >
                                        <Link to="/player">
                                            <div className="moviess-poster" >
                                                <img src={`https://image.tmdb.org/t/p/w500${moviess?.poster_path}`} className="actor known" alt={moviess?.title} />
                                            </div>
                                            <p className="moviess-title">{moviess?.title}</p>
                                            <p className="moviess-year">{moviess?.release_date}</p>
                                        </Link>
                                    </div>
                                )
                            })}



                            {/* <div className="moviess-card">
                            <div className="moviess-poster"></div>
                            <p className="moviess-title">Scream 2</p>
                            <p className="moviess-year">1997</p>
                        </div>
                        <div className="moviess-card">
                            <div className="moviess-poster"></div>
                            <p className="moviess-title">Scream 3</p>
                            <p className="moviess-year">2000</p>
                        </div>
                        <div className="moviess-card">
                            <div className="moviess-poster"></div>
                            <p className="moviess-title">Scream 4</p>
                            <p className="moviess-year">2011</p>
                        </div> */}
                        </div>
                    </section> </>}
            </main>
        </div>
    )
}