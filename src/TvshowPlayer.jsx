import "./TvshowsPlayer.css"
import { Link } from "react-router-dom"

import { tvshowsEpisodes } from "./api/tmbD";
import { useState } from "react";

export function TvshowsPlayer({ seasons, eachtvID }) {
    const [forEpisodes, setForEpisodes] = useState([])

    const episode = (eachtvID, seasonNumber) => {
        tvshowsEpisodes(eachtvID, seasonNumber).then((data) => {
            setForEpisodes(data);
            console.log(data);
        })
    }


    if (seasons.length <= 0) {
        console.log("laoding...")
    } else if (seasons.length >= 1) {
        console.log(seasons);
    }


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

        return (<div className="stars">{star}{halfstars}</div>)
    }

    // console.log(seasons.seasons);



    return (
        <>



            <div className="container">

                <header className="navbar">
                    <div className="logo">
                        <i className="fas fa-film"></i>
                        <span>MOVIEFLEX</span>
                    </div>
                    <div className="search-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" className="search-bar" placeholder="Search TV shows..." />
                    </div>
                    <Link to="/">

                        <div className="profile">
                            <i className="fas fa-home"></i>
                        </div>

                    </Link>
                </header>


                <main className="tv-detail">

                    <div className="hero-section">Back Drop</div>
                    <div className="hero-content">
                        <div className="poster">
                            <img src={`https://image.tmdb.org/t/p/w500/${seasons.poster_path}`} alt="The Last of Us Poster" />

                        </div>
                        <div className="hero-info">
                            <h1 className="tv-title">{seasons?.name}</h1>
                            <div className="tv-meta">
                                <span className="year">First air Date {seasons?.first_air_date}</span>
                                <span className="year">Last air Date {seasons?.last_episode_to_air?.air_date}</span>
                                <span className="seasons">{seasons?.last_episode_to_air?.season_number} Season</span>
                                <span className="episodes">{seasons?.last_episode_to_air?.episode_number} Episodes</span>
                                {/* <span className="runtime">~50 min per ep</span> */}
                                {seasons?.genres?.map((gener) => {
                                    return (
                                        <span className="tv-genres" key={gener?.id}>{gener?.name}</span>
                                    )
                                })}
                            </div>


                            <div className="tv-rating">
                                <div className="stars">
                                    {/* <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i> */}
                                    <span className="rating-value">{setRate(seasons?.last_episode_to_air?.vote_average)} {Math.floor(seasons?.last_episode_to_air?.vote_average)}/10</span>
                                </div>
                                <div className="vote-count">
                                    <i className="fas fa-users"></i> {seasons?.last_episode_to_air?.vote_count} Vote
                                </div>
                            </div>
                            <p className="overview">
                                {seasons?.last_episode_to_air?.overview}
                            </p>

                        </div>
                    </div>

                    <div className="video-section">
                        <h2 className="section-title">Trailer</h2>
                        <div className="video-container">
                            <iframe src="https://www.youtube.com/embed/lW5ki0kq1TQ?si=wfZv_NcJx4S6byUY"
                                title="YouTube video player"
                                allow="accelerometer; autoplay">
                            </iframe>
                        </div>
                    </div>

                    <div className="seasons-section">
                        <h2 className="section-title">Seasons & Episodes</h2>
                        <div className="season-selector">
                            <h3 >Select Season:</h3>
                            <select id="season" className="season-dropdown">
                                <option value="1">Season 1 (2023) | 9 Episodes</option>

                            </select>
                        </div>
                        <div className="episode-grid">

                            {seasons?.seasons?.map((seasonNum) => {

                                return (
                                    <div className="episode-card" key={crypto.randomUUID()}>
                                        <div className="episode-thumb" style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${seasonNum.poster_path})`,
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            height: "35em"
                                        }}

                                            onClick={() => {
                                                episode(eachtvID, seasonNum);
                                                console.log("episodseoftheseasons", forEpisodes);
                                            }}
                                        >
                                            {/* <img src={`https://image.tmdb.org/t/p/w500/${seasonNum.poster_path}`} alt="The Last of Us Poster" /> */}
                                        </div>
                                        <div className="episode-info">
                                            <h4>{seasonNum.name}</h4>
                                            <h5>{seasonNum.episode_count} Episodes</h5>
                                            <span className="episode-date">{seasonNum?.air_date}</span>
                                            <p className="episode-desc">{seasonNum?.overview}</p>
                                        </div>
                                    </div>
                                )
                            })}



                            {/* <div className="episode-card">
                                <div className="episode-thumb" ></div>
                                <div className="episode-info">
                                    <h4>2. Infected</h4>
                                    <span className="episode-date">Jan 22, 2023</span>
                                    <p className="episode-desc">Joel agrees to smuggle Ellie to the Fireflies in exchange for supplies. They set off across Boston.</p>
                                </div>
                            </div>

                            <div className="episode-card">
                                <div className="episode-thumb" ></div>
                                <div className="episode-info">
                                    <h4>3. Long, Long Time</h4>
                                    <span className="episode-date">Jan 29, 2023</span>
                                    <p className="episode-desc">Joel and Ellie cross paths with a survivor living alone in the woods.</p>
                                </div>
                            </div> */}

                        </div>
                    </div>


                    <div className="cast-section">
                        <h2 className="section-title">Top Cast</h2>
                        <div className="cast-grid">
                            <div className="cast-card">
                                <div className="cast-photo" ></div>
                                <div className="cast-info">
                                    <h4>Pedro Pascal</h4>
                                    <p>Joel Miller</p>
                                </div>
                            </div>
                            <div className="cast-card">
                                <div className="cast-photo" ></div>
                                <div className="cast-info">
                                    <h4>Bella Ramsey</h4>
                                    <p>Ellie</p>
                                </div>
                            </div>
                            <div className="cast-card">
                                <div className="cast-photo" ></div>
                                <div className="cast-info">
                                    <h4>Anna Torv</h4>
                                    <p>Tess</p>
                                </div>
                            </div>
                            <div className="cast-card">
                                <div className="cast-photo" ></div>
                                <div className="cast-info">
                                    <h4>Lamar Johnson</h4>
                                    <p>Henry Burrell</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="details-section">
                        <h2 className="section-title">Show Details</h2>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Network:</span>
                                <span className="detail-value"><img src="https://image.tmdb.org/t/p/original/9xluH2Jv2FvW2VYcJuPJQvWwB1O.png" alt="HBO" className="network-logo" /> HBO</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status:</span>
                                <span className="detail-value">Returning Series</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Created by:</span>
                                <span className="detail-value">Craig Mazin, Neil Druckmann</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Production:</span>
                                <span className="detail-value">Sony Pictures Television, PlayStation Productions, The Mighty Mint, Word Games</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Origin:</span>
                                <span className="detail-value">United States</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Language:</span>
                                <span className="detail-value">English</span>
                            </div>
                        </div>
                    </div>


                    <div className="recommendations">
                        <h2 className="section-title">You May Also Like</h2>
                        <div className="movie-grid">

                            <div className="movie-card">
                                <div className="movie-poster" >                            <h3 className="movie-title">The Walking Dead</h3>
                                    <span className="movie-year">2010</span>
                                </div>
                            </div>
                            <div className="movie-card">
                                <div className="movie-poster"  >                           <h3 className="movie-title">Chernobyl</h3>
                                    <span className="movie-year">2019</span>
                                </div>
                            </div>
                            <div className="movie-card">
                                <div className="movie-poster"   >                          <h3 className="movie-title">The Mandalorian</h3>
                                    <span className="movie-year">2019</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <p>© 2025 MOVIEFLEX · just UI</p>
            </footer>




        </>
    )
}