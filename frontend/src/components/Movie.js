import React, { Component } from 'react';

import api from '../services/api'

const URL_POSTER = "https://image.tmdb.org/t/p/w342"

export default class Movie extends Component {

    getGenres = async () =>{
        await api.get('')
    }

    render() {
        const { movie } = this.props
        return (
            <div className="row col-sm-12">
                <div className="col-sm-6">
                    <img width={200} src={URL_POSTER + movie.poster_path} />
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        {movie.title}
                    </div>
                    <div className="row">
                        {movie.genre_ids}
                    </div>
                    <div className="row">
                        {movie.release_date}
                    </div>
                </div>
            </div>
        )
    }
}
