import "./TvshowsPlayer.css"
import { Link } from "react-router-dom"

import { tvshowsEpisodes, tvshowsEpisodesPlays } from "./api/tmbD";
import { useState, useEffect } from "react";

export function TvshowsPlayer({ tvTrailer, seasons, eachtvID }) {
    const [forEpisodes, setForEpisodes] = useState([]);
    const [appenButton, setAppenButton] = useState(false);
    const [hideButton, setHideButton] = useState("hide");
    const [sesNum, setSesNum] = useState("");
    const [key, setKey] = useState("");

    useEffect(() => {
        const condition = forEpisodes ? true : false;
        setAppenButton(condition);
    }, [])
    const episode = (eachtvID, seasonNumber) => {
        tvshowsEpisodes(eachtvID, seasonNumber).then((data) => {
            setForEpisodes(data);

        })
    }
    const playerEpi = (eachtvID, sesNum, epiNum) => {
        tvshowsEpisodesPlays(eachtvID, sesNum, epiNum).then((data) => {
            setKey(data);
            console.log(data);
            console.log("keysApi resp", data);
        })
    }
    if (seasons.length <= 0) {
        console.log("Seasons laoding...")
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
                    <div className="hero-section">
                        <img src={`https://image.tmdb.org/t/p/w1280/${seasons?.backdrop_path}`} className="backdrop" alt={seasons?.name} />
                    </div>
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
                    <br />
                    <br />



                    <div className="video-section">
                        <h2 className="section-title">Trailer</h2>
                        <div className="video-container">
                            <iframe src={`https://www.youtube.com/embed/${tvTrailer}?autoplay=1&rel=0`}
                                title="TV Trailer"
                                allow="autoplay; gyroscope; encrypted-media" allowFullScreen >
                            </iframe>
                        </div>
                    </div>

                    <button className={hideButton}
                        onClick={() => {
                            setAppenButton((prev) => !prev);
                            setHideButton("hide")
                        }}
                    >
                        Back To Seasons
                    </button>

                    <div className="seasons-section">

                        <div className="episode-grid">

                            {!appenButton ?

                                <>

                                    {forEpisodes?.episodes?.map((epi) => {
                                        return (
                                            <div className="episode-card" key={epi.id}
                                                onClick={() => {
                                                    playerEpi(eachtvID, sesNum, epi.episode_number)
                                                }}
                                            >
                                                <div className="episode-thumb" >
                                                    <img src={`https://image.tmdb.org/t/p/w500/${epi.still_path || forEpisodes.poster_path}`} className="seasonPoster" alt={epi.name} />
                                                </div>
                                                <div className="episode-info">
                                                    <h4>Episode {epi.episode_number}</h4>
                                                    <span className="episode-date">{epi.air_date}</span>
                                                    <h5 className="episode-desc">{epi.name}.</h5>
                                                    <p className="episode-desc">{epi.overview}</p>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </> : <>
                                    {seasons?.seasons?.map((seasonNum) => {

                                        return (
                                            <div className="episode-card" key={crypto.randomUUID()}>
                                                <div className="episode-thumb"
                                                    onClick={() => {
                                                        episode(eachtvID, seasonNum.season_number);
                                                        // console.log("episodseoftheseasons", forEpisodes);
                                                        setAppenButton((prev) => !prev);
                                                        setHideButton("play-btn");
                                                        setSesNum(seasonNum.season_number);
                                                    }}
                                                >
                                                    <img src={`https://image.tmdb.org/t/p/w500/${seasonNum.poster_path}`} className="seasonPoster" alt="The Last of Us Poster" />
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
                                </>}

                            {/*
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
                                {seasons?.networks?.map((net) => {
                                    return (
                                        <span className="detail-value" key={net.id}>
                                            <img src={`https://image.tmdb.org/t/p/original/${net.logo_path}`} alt={net.name} className="network-logo" />
                                            {net.name} <small>{net.origin_country}</small>
                                        </span>
                                    )

                                })}

                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status:</span>
                                <span className="detail-value">{seasons.status}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Created by:</span>
                                {seasons?.created_by?.map((creator) => {
                                    return (
                                        <span className="detail-value" key={creator.id}>
                                            {/* <img src={`https://image.tmdb.org/t/p/w500/${creator.logo_path}`} alt={creator.name} className="network-logo" /> */}
                                            {creator.name}
                                            <small>{creator.gender === 2 ? "Male" : "Female"}</small>
                                        </span>
                                    )
                                })}

                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Production:</span>
                                {seasons?.production_companies?.map((proDcom) => {
                                    return (
                                        <span className="detail-value">{proDcom.name},</span>
                                    )
                                })}

                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Origin:</span>
                                {seasons?.origin_country?.map((country) => {
                                    return (
                                        <span className="detail-value" key={crypto.randomUUID()}>{country}</span>
                                    )
                                })}

                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Language:</span>
                                {seasons?.spoken_languages?.map((lang) => {
                                    return (
                                        <span className="detail-value" key={crypto.randomUUID()}>{lang.name} <small>{lang.english_name}</small> </span>
                                    )
                                })}

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