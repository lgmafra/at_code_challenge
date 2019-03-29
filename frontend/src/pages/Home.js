import React, { Component } from 'react';

import api from '../services/api'
import Utils from '../services/utils'

import Movie from '../components/Movie'

export default class Home extends Component {

    state = {
        movies: [],
        query_movie: ''
    }

    getMovies = async () => {
        const response = await api.get('movie/upcoming',{
            params: {
                api_key: Utils.getAuthToken()
            }
        })

        this.setState({movies: response.data.results})
    }

    getMovieByFilter = async (filter) => {
        const response = await api.get('search/movie',{
            params: {
                api_key: Utils.getAuthToken(),
                query: filter
            }
        })

        this.setState({movies: response.data.results})
    }

    componentDidMount(){
        this.props.genres()
    }

    handleChange = (event) => {
        this.setState({query_movie: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        
        if(this.state.query_movie !== ''){
            this.getMovieByFilter(this.state.query_movie)
        }else{
            this.getMovies()
        }
    }

    render() {        
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="form-group">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by movie"
                                            onChange={this.handleChange}
                                        />
                                        <button type="submit" className="btn btn-info">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.state.movies.map(movie => (
                        <div className="col-sm-6" key={movie.id}>
                            <Movie key={movie.id} movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
