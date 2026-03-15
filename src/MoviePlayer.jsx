import "./index.css"
import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom"
import { HashLoader } from "react-spinners";
export function PlayTrailer({ alsoKnownFor, movieKeys, overviews, actorBio, actorProfile, casts, crew, directors, genres }) {
    const [flagsConut, setFlagsConut] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        genres?.origin_country?.forEach(async (alpha) => {
            const resp = await fetch(`https://restcountries.com/v3.1/alpha/${alpha}`);
            const country = await resp.json();
            setFlagsConut(country[0].flags.png);
        });


    }, [])




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

        } else {
            console.log("non found");
        }


    }, [genres])



    return (
        <>


            <div className="container">
                <header className="navbar">
                    <div className="logo">
                        <i className="fas fa-film"></i>
                        <span>MOVIEFLEX</span>
                    </div>

                    <div className="search-wrapper">

                        <button className="search-bar BackForplayer">Back To Home ➡️</button>

                    </div>
                    <Link to="/">
                        <div className="profile">
                            <i className="fas fa-home"></i>
                        </div>
                    </Link>
                </header>

                <main className="movie-detail">
                    <div className="video-section">
                        <div className="video-container">
                            <iframe src={`https://www.youtube.com/embed/${movieKeys.key}?autoplay=1&rel=0`}
                                width="100%"
                                height="550"
                                title="Movies Trailler"
                                allow="autoplay; gyroscope; encrypted-media" allowFullScreen ></iframe>
                        </div>
                    </div>
                    <div className="movie-header">
                        <h1 className="movie-main-title">{overviews.title}</h1>
                        <h2><small><mark>Tagline:</mark></small> {genres.tagline}</h2><br />
                        <div className="movie-meta">

                            <span className="release-year"><mark><small>Released on:</small></mark> {overviews.release_date}</span>
                            <span className="runtime"><mark><small>Budget: </small></mark>${genres.budget}</span>
                            <span><mark><small>Revenue: </small></mark>${genres.revenue}</span>
                            <span><mark><small>Status: </small></mark>{genres.status}.</span>

                            {genres?.production_countries?.map((coun) => {
                                return (<div key={crypto.randomUUID()}>
                                    <span className="runtime"><mark><small>Production countries:</small></mark> {coun.name}</span>
                                </div>)

                            })}



                            {genres?.genres?.map((check) => {
                                return (
                                    <div className="runtime" key={crypto.randomUUID()}>
                                        <span className="runtime">{check.name}</span>
                                    </div>
                                );
                            })}



                        </div>

                        <table>
                            <caption>Spoken Languages</caption>
                            <thead>
                                <tr>
                                    <th>Languages</th>
                                    <th>Lang in English</th>
                                </tr>
                            </thead>
                            <tbody>
                                {genres?.spoken_languages?.map((lang) => {
                                    return (
                                        <tr key={crypto.randomUUID()}>
                                            <td>{lang.name}</td>
                                            <td>{lang.english_name}</td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>
                        <br />
                        <h4>Contry(ies)</h4>
                        {genres?.origin_country?.map((countryName) => {
                            return (
                                <div key={crypto.randomUUID()}>
                                    {countryName}
                                </div>
                            )
                        })}
                        <div>
                            <img src={flagsConut} width={150} alt="countyr flag" />
                        </div>
                    </div>


                    <div className="cast-section">
                        <h2>Production Companies</h2>
                        <div className="cast-grid">
                            {genres?.production_companies?.map((com) => {
                                return (
                                    <div className="cast-card" key={com.id}>
                                        <div className="cast-photo">
                                            {!com.logo_path ? <b>{`${com.name} "didn't Upload Image"`}</b> : <img src={`https://image.tmdb.org/t/p/w500${com.logo_path}`} className="actor" alt={com.name} />}
                                        </div>
                                        <div className="cast-info">
                                            <h4>{com.name}</h4>

                                            <p><b>{com.origin_country}</b></p>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="rating-block">
                            <div className="rating-stars">
                                {setRate(overviews.vote_average)}
                                <span className="rating-value">{Math.round(overviews.vote_average)}/10</span>
                            </div>
                            <div className="vote-count">
                                <i className="fas fa-users"></i>{overviews.vote_count}K votes
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

                                    <div className="cast-card" key={crypto.randomUUID()} onClick={() => {
                                        actorBio(allcast.id)
                                        alsoKnownFor(allcast.id)
                                    }}>
                                        <Link to="/actorProfile" key={crypto.randomUUID()}>
                                            <div className="cast-photo">{!allcast.profile_path ? <b>{`${allcast.name} "didn't Upload Image"`}</b> : <img src={`https://image.tmdb.org/t/p/w500${allcast.profile_path}`} className="actor" alt={allcast.name} />}</div>
                                            <div className="cast-info">
                                                <h4>{allcast.name}</h4>
                                                <p>Cast as 👇</p>
                                                <p><b>{allcast.character}</b></p>

                                            </div>
                                        </Link>
                                    </div>

                                )
                            })}

                        </div><br />
                        <br />
                        <h2>Crew</h2>


                        <div className="cast-grid">
                            {crew.map((allCrew) => {
                                return (
                                    <div className="cast-card" key={crypto.randomUUID()} >
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

                </main >
            </div >
            <footer className="footer">
                <p>© 2025 MOVIEFLEX</p>
            </footer>
        </>
    )

}
