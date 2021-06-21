import React, { useContext } from 'react';
import {ReactComponent as Close} from '../../images/close.svg';
import { MovieContext } from '../../pages/Home';


const MovieDetails = () => {
    const {state:{title, desc, image, votes, totalVotes, date}, cancelViewMovie, imageUrl} = useContext(MovieContext)
    return (
        <div className="movie-details">
            <div className="details-heading">
                <h2 className="details-title">{title}</h2>
                <div className="details-close">
                    <Close className="mt-05 pointer" onClick={cancelViewMovie}/>
                </div>
            </div>
            <div className="details-grid">
                <div className="grid-image">
                    <img src={imageUrl+image} alt="img" className="size"/>
                </div>

                <div className="movie-breakdown">
                    <p><strong>Release date:</strong> {date}</p>
                    <p className="ln">{desc}</p>
                    <p><strong>{votes}</strong> / 10 ({totalVotes} total votes)</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
