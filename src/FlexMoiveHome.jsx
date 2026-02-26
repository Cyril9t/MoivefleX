import "./App.css"
export function Homepage() {
    return (
        <>
            <link rel="stylesheet" href="Style.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600;14..32,700&display=swap" rel="stylesheet" />

            <div className="container">

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
                    <div className="movie-grid">
                        <div className="movie-card">
                            <div className="movie-poster">Poster</div>
                            <div className="movie-info">
                                <h3 className="movie-title">Dune: Part Two</h3>
                                <span className="movie-year">2024</span>
                                <button className="favorite-btn"><i className="far fa-heart"></i></button>
                            </div>
                        </div>

                        <div className="movie-card">
                            <div className="movie-poster" >Poster</div>
                            <div className="movie-info">
                                <h3 className="movie-title">Poor Things</h3>
                                <span className="movie-year">2023</span>
                                <button className="favorite-btn"><i className="far fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </main>
            </div >


            <footer className="footer">
                <p>© 2025 MOVIEFLEX · just UI</p>
            </footer>


        </>
    )

}