import React, { createContext, useEffect, useState } from 'react';
import logo from '../images/logo.svg';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Divider from '../components/Divider/Divider';
import {ReactComponent as Search} from '../images/search.svg';
import Modal from '../components/Modal/Modal';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import moment from 'moment';

export const MovieContext = createContext();
const Home = () => {
    const [state, setState] = useState({
        movies:[],
        viewMovie: false,
        title:'',
        desc:'',
        votes:'',
        image:'',
        totalVotes:'',
        date:'',
        search:''
    })

    const domainName = process.env.REACT_APP_API_DOMAIN;
    const key = process.env.REACT_APP_MOVIE_DB_API_KEY;
    const imageUrl = process.env.REACT_APP_API_BASE_IMAGE_URL;

    useEffect(()=>{
		axios({
			url:`${domainName}/movie/popular?api_key=${key}`,
			method:'get',
			headers:{
                'Content-Type': 'application/json',
            },
		}).then(res=>{
            if(res.status === 200){
                setState(state=>({
                    ...state,
                    movies: res.data.results
                }))
            }
		})

	},[domainName, key])

    const onChange =(e)=>{
        setState(state=>({
            ...state,
           [ e.target.name]: e.target.value
        }))
    }

    const onSearch = () =>{
        axios({
			url:`${domainName}/search/movie?api_key=${key}&language=en-US&query=${state.search}`,
			method:'get',
			headers:{
                'Content-Type': 'application/json',
            },
		}).then(res=>{
            if(res.status === 200){
                setState(state=>({
                    ...state,
                    movies: res.data.results
                }))
            }
		})
    }

    const onViewMovie = (title, overview, image, votes, totalVotes, date) =>{
        
        let releaseDate="June 9, 2021"

        if(date){
          releaseDate = moment(date).format('LL');; 
        }
        
        setState(state=>({
            ...state,
            viewMovie: true,
            title: title,
            desc: overview,
            image: image,
            votes: votes,
            totalVotes: totalVotes,
            date: releaseDate
        }))
    }

    const cancelViewMovie = () =>{
        setState(state=>({
            ...state,
            viewMovie: false,
            title:'',
            desc:'',
            votes:'',
            image:'',
            totalVotes:'',
            date:''
        }))
    }

    const {viewMovie} = state;
    return (
        <MovieContext.Provider value={{
            state,
            imageUrl,
            onViewMovie,
            cancelViewMovie
        }}>
            <Modal open={viewMovie} modalClosed={cancelViewMovie}>
                <MovieDetails/>
            </Modal>
            <div className="home">
                <div className="header">
                    <img src={logo} alt="Timescale" />

                    <div className="input-group">
                        <input type="text" placeholder="Search for a movie" className="formcontrol" onChange={onChange} name="search" />
                        <Search className="profile-password-icon" onClick={onSearch}/>
                    </div>

                </div>
                <Divider />
                <div className="title">
                    <h3 className="title-text">Most Recent Movies</h3>
                </div>
                <MovieGrid />
            </div>
        </MovieContext.Provider>
    )
}

export default Home
