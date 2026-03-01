import "./index.css"
import { Link } from "react-router-dom"
export function PlayTrailer({ movieKeys, overviews }) {

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
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
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

                            <div className="cast-card">
                                <div className="cast-photo">Photo</div>
                                <div className="cast-info">
                                    <h4>Timothée Chalamet</h4>
                                    <p>Paul Atreides</p>
                                </div>
                            </div>

                            <div className="cast-card">
                                <div className="cast-photo" >Photo</div>
                                <div className="cast-info">
                                    <h4>Zendaya</h4>
                                    <p>Chani</p>
                                </div>
                            </div>

                            <div className="cast-card">
                                <div className="cast-photo" >Photo</div>
                                <div className="cast-info">
                                    <h4>Rebecca Ferguson</h4>
                                    <p>Lady Jessica</p>
                                </div>
                            </div>

                            <div className="cast-card">
                                <div className="cast-photo" >Photo</div>
                                <div className="cast-info">
                                    <h4>Austin Butler</h4>
                                    <p>Feyd-Rautha</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="crew-section">
                        <div className="crew-item">
                            <span className="crew-label">Director:</span>
                            <span className="crew-value">Denis Villeneuve</span>
                        </div>
                        <div className="crew-item">
                            <span className="crew-label">Writers:</span>
                            <span className="crew-value">Denis Villeneuve, Jon Spaihts, Frank Herbert (novel)</span>
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
