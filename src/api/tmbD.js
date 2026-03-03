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
