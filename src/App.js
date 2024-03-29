import { useState, useEffect } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=2c9fd69b'
// const API_URL = `http://www.omdbapi.com?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`;
// const check = ['hallo', API_URL];
// console.log(check);

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search); 
    }
    useEffect(() => {
        searchMovies('Game Of Thrones')
    }, [])
    
    return (
        <div className="app">
            <h1>Novlo Films</h1>
            <h4>The Home Of Video...</h4>

            <div className="search">
                <input
                    placeholder="Search For Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
            
        </div>
    );
}

export default App;