import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import api from '../services/api'
import Utils from '../services/utils'

export default class MovieDetail extends Component {

    state = {
        movie: {},
        genres_name: ''
    }

    loadMovieDetail = async () => {
        const movie = await api.get(`/movie/${this.props.match.params.id}`, {
            params: {
                api_key: Utils.getAuthToken()
            }
        })

        const genres_name = []
        
        movie.data.genres.map(genre => (
            genres_name.push(genre.name)
        ))

        this.setState({
            movie: movie.data,
            genres_name: genres_name.join(', ')
        })
    }

    async componentDidMount(){
        await this.loadMovieDetail()
    }

    getBackUrl = (page) => {
        return `/${this.props.location.state.prevPath}/${page}`
    }

    render() {
        const { page } = this.props.match.params;

        return (
            <div className="col-sm-8">
                <Link to={this.getBackUrl(page)}>Voltar</Link>
                <div className="px-2">
                    <img src={this.state.movie.backdrop_path && Utils.getBackdropUrl() + this.state.movie.backdrop_path} alt="" />
                </div>
                <div className="px-2">
                    <div className="row">
                        <div className="col-sm-6">
                            {this.state.movie.title}
                        </div>
                        <div className="col-sm-6">
                            {this.state.movie.release_date}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {this.state.genres_name}
                        </div>
                    </div>
                    <div className="row">
                        {this.state.movie.overview}
                    </div>
                </div>
            </div>
        )
    }
}
