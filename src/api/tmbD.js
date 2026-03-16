const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const trendings = async () => {
    const resp = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);

    return resp.json();
}

export const populer = async () => {
    const resp = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return resp.json();
}
export const topRated = async () => {
    const resp = await fetch(`${baseUrl}/movie/top_rated?api_key=${apiKey}`);
    return resp.json();
}

const today = new Date().toISOString().split("T")[0];

export const upComings = async () => {
    const resp = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&region=NG&sort_by=primary_release_date.asc&primary_release_date.gte=${today}`);
    return resp.json();
}

export const searchButton = async (query) => {
    const resp = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);

    return resp.json();
}

export const embededVideos = async (movieId) => {
    const resp = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);

    return resp.json();

}


export const moviCast = async (idforCast) => {
    const resp = await fetch(`${baseUrl}/movie/${idforCast}/credits?api_key=${apiKey}`);

    return resp.json();

}

export const genreAndruntime = async (idForgener) => {
    const resp = await fetch(`${baseUrl}/movie/${idForgener}?api_key=${apiKey}`);

    return resp.json();
}


export const castProfiles = async (personId) => {
    const resp = await fetch(`${baseUrl}/person/${personId}?api_key=${apiKey}&language=en-US`);

    return resp.json();
}

export const actorOtherMovies = async (id) => {
    const resp = await fetch(`${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`);

    return resp.json();
}
export const contryFlags = async (alpha) => {
    const resp = await fetch(`https://restcountries.com/v3.1/alpha/${alpha}`);


    return resp.json();
}

export const tvshows = async () => {
    const resp = await fetch(`${baseUrl}/tv/popular?api_key=${apiKey}`);

    return resp.json();
}
export const tvshowsSeasons = async (tvId) => {
    const resp = await fetch(`${baseUrl}/tv/${tvId}?api_key=${apiKey}`);

    return resp.json();
}
export const tvshowsEpisodes = async (tvId, seasonNumber) => {
    const resp = await fetch(`${baseUrl}/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}`);

    return resp.json();
}

export const tvshowsEpisodesPlays = async (tvId, seasonNumber, epiNumber) => {
    const resp = await fetch(`${baseUrl}/tv/${tvId}/season/${seasonNumber}/episode/${epiNumber}/videos?api_key=${apiKey}`);

    return resp.json();
}
export const tvshowsSearch = async (search) => {
    const resp = await fetch(`${baseUrl}/search/tv?api_key=${apiKey}&query=${search}`);

    return resp.json();
}
export const tvshowsPlayer = async (showId) => {
    const resp = await fetch(`${baseUrl}/tv/${showId}/videos?api_key=${apiKey}`);

    return resp.json();
}

export const consistNollyHood = async () => {
    const resp = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_origin_country=NG&sort_by=release_date.desc`);

    return resp.json();
}
export const searchNollyHood = async (searchNolly) => {
    const resp = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${searchNolly}&region=NG`);

    return resp.json();
}


export const tvShowmoviCast = async (tvshowidforCast) => {
    const resp = await fetch(`${baseUrl}/tv/${tvshowidforCast}/credits?api_key=${apiKey}`);

    return resp.json();

}