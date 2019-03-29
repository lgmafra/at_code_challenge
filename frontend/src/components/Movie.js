import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Genre from '../services/genre'
import Utils from '../services/utils'

export default class Movie extends Component {

    state = {
        genres_name: ''
    }

    getGenres = async (genre_ids) => {
        const genres_name = []
        let genres = await Genre.getGenreNames(genre_ids)

        genres.data.map(genre => (
            genres_name.push(genre.name)
        ))

        this.setState({genres_name: genres_name.join(', ')})
    }

    async componentDidMount(){
        await this.getGenres(this.props.movie.genre_ids)
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
                            <Link to={`/detail/${movie.id}`}>See details</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
