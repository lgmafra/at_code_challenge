import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import Genre from '../services/genre'
import Favorire from '../services/favorite'
import Utils from '../services/utils'

import 'react-toastify/dist/ReactToastify.css'

export default class Movie extends Component {

    state = {
        genres_name: ''
    }

    getGenres = async (movie, isFavorite = false) => {
        if(!isFavorite){
            await this.getGenresTMDb(movie.genre_ids)
        }else{
            const genres_name = []
        
            if(movie.genres){
                movie.genres.map(genre => (
                    genres_name.push(genre.genre.name)
                ))
        
                this.setState({genres_name: genres_name.join(', ')})
            }
        }
    }

    getGenresTMDb = async (genre_ids) => {
        const genres_name = []
        let genres = await Genre.getGenreNames(genre_ids)
    
        if(genres.data){
            genres.data.map(genre => (
                genres_name.push(genre.name)
            ))
    
            this.setState({genres_name: genres_name.join(', ')})
        }
    }

    async componentDidMount(){
        await this.getGenres(this.props.movie, this.props.isFavorite)
    }

    favorite = async (movie) => {
        const data = {
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date,
            movie_id: movie.id,
            genre_ids: movie.genre_ids
        }

        const result = await Favorire.saveFavorite(data)
        if(result){
            toast.success("Movie marked as favorite successfully.", {
                position: toast.POSITION.TOP_RIGHT
            })
        }else{
            toast.error("Error trying mark the movie as favorite.", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    renderFavoriteButton = (isFavorite, movie) => {
        if(!isFavorite){
            return (
                <div className='col-sm-2'>
                    <button title="Favorite" className="btn btn-sm btn-info" type='button' onClick={() => this.favorite(movie)}>
                        <i className="fa fa-star"></i>
                    </button>
                </div>
            )
        }
    }

    getDetailsUrl = (isFavorite, page, movie) => {
        if(isFavorite){
            return { pathname: `/detail/${movie.movie_id}/${page}`, state: { prevPath: 'favorites' } }
        }else{
            return { pathname: `/detail/${movie.id}/${page}`, state: { prevPath: 'movies' } }
        }
    }

    render() {
        const { movie, isFavorite, page } = this.props
        return (
            <div className="col-sm-10 m-4 pull-right">
                <div className="row px-2">
                    <div className="card-movie col-md-4 p-2">
                        <img alt="poster" src={Utils.getPosterUrl() + movie.poster_path} />
                    </div>
                
                    <div className="col-sm-6 ml-2">
                        <div className="row">
                            <small><i>{this.state.genres_name}</i></small>
                        </div>
                        <div className="row">
                            {movie.title}
                        </div>
                        <div className="row">
                            <small>Release date: <label className="label label-success">{movie.release_date}</label></small>
                        </div>
                        <div className="row">
                            <div className='col-sm-6'>
                                <small><Link to={this.getDetailsUrl(isFavorite, page, movie)}>See details</Link></small>
                            </div>
                            {this.renderFavoriteButton(isFavorite, movie)}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
