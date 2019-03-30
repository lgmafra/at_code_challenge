import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Genre from '../services/genre'
import Favorire from '../services/favorite'
import Utils from '../services/utils'

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

        await Favorire.saveFavorite(data)
    }

    renderFavoriteButton = (isFavorite, movie) => {
        if(!isFavorite){
            return (
                <div className='col-sm-6'>
                    <button type='button' onClick={() => this.favorite(movie)}>
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
            <div className="col-sm-12">
                <div className="row px-2">
                    <div className="col-md-4">
                        <img alt="poster" src={Utils.getPosterUrl() + movie.poster_path} />
                    </div>
                
                    <div className="col-sm-8">
                        <div className="row">
                            {this.state.genres_name}
                        </div>
                        <div className="row">
                            {movie.title}
                        </div>
                        <div className="row">
                            Release date: <label className="btn btn-sm btn-success">{movie.release_date}</label>
                        </div>
                        <div className="row">
                            <div className='col-sm-6'>
                                <Link to={this.getDetailsUrl(isFavorite, page, movie)}>See details</Link>
                            </div>
                            {this.renderFavoriteButton(isFavorite, movie)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
