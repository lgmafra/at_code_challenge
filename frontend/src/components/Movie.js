import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Genre from '../services/genre'
import Favorire from '../services/favorite'
import Utils from '../services/utils'

export default class Movie extends Component {

    state = {
        genres_name: ''
    }

    getGenres = async (genre_ids) => {
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
        await this.getGenres(this.props.movie.genre_ids)
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

    render() {
        const { movie } = this.props
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
                                <Link to={`/detail/${movie.id}`}>See details</Link>
                            </div>
                            <div className='col-sm-6'>
                                <button type='button' onClick={() => this.favorite(movie)}>
                                    <i className="fa fa-star"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
