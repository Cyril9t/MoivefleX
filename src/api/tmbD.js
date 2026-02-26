const apiKey = "72efc125d507428a211dfad392cfe13f";
const baseUrl = "https://api.themoviedb.org/3";

export const trendings = async () => {
    const resp = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);

    return resp.json();
}

export const populer = async () => {
    const resp = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return resp.json();
}

