import React, { useContext } from 'react';
import { MovieContext } from '../../pages/Home';
import './MovieGrid.scss';


const MovieGrid = () => {
    const {state:{movies}, imageUrl, onViewMovie} = useContext(MovieContext);
    return (
        <div className="movie-grid">
            {
                movies.length !== 0 ?
                movies.map((movie, i)=>{
                    const {title, vote_average, poster_path, overview, vote_count, release_date} = movie
                    return (
                        <div className="grid-item" key={i} onClick={()=>{onViewMovie(title, overview, poster_path, vote_average, vote_count, release_date)}}>
                            <div className="movie-rating">
                                <p>{vote_average}</p>
                            </div>
                            <img src={imageUrl+ poster_path} alt="img" className="movie-image" />
                            
                            <div className="movie-title">
                                <p className="movie-title-text">{title}</p>
                            </div>
                        </div>
                    )
                })
                :
                null
            }
        </div>
    )
}   

export default MovieGrid
