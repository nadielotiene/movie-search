import React, { useState } from "react";
import MovieCard from "./MovieCard.js";

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const movieSearch = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=d6f3673879d36fd91666106f90374719&language=en-US&query=${query}&page=1&include_adult=false`
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.results);
            setMovies(data.results)
        } catch {
            console.log(err)
        }
    }
    return (
        <>
            <form className="form" onSubmit={movieSearch}>
                <label className="label" htmlFor="query">Search movie</label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. The Godfather"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}
