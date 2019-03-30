import React, { Component } from 'react';

import localApi from '../services/localApi'
import Utils from '../services/utils'

import Movie from '../components/Movie'
import Pagination from '../components/Pagination'

export default class Movies extends Component {

    state = {
        movies: [],
        query_movie: '',
        page: null,
        totalPages: null
    }

    getMovies = async (page = 1) => {
        const response = await localApi.get('api/listupcoming',{
            params: {
                api_key: Utils.getAuthToken(),
                page: page
            }
        })

        this.setMovieData(response)
    }

    getMovieByFilter = async (filter, page = 1) => {
        const response = await localApi.get('api/searchmovie',{
            params: {
                api_key: Utils.getAuthToken(),
                query: filter,
                page: page
            }
        })

        this.setMovieData(response)
    }

    componentDidMount(){
        const { page } = this.props.match.params;
        this.props.genres(page)
    }

    setMovieData = (response) => {
        this.setState({
            page: response.data.page,
            totalPages: response.data.total_pages,
            movies: response.data.results
        })
    }

    async componentDidUpdate(prevProps) {
        const { page } = this.props.match.params;
        if ( page !== prevProps.match.params.page) {
            if(this.state.query_movie !== ''){
                this.getMovieByFilter(this.state.query_movie, page)
            }else{
                this.getMovies(page)
            }
        }
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

    rendeClearButton = () => {
        return (
            <button onClick={() => {
                this.setState({query_movie: ''})
                this.getMovies()
            }} className="ml-1 btn btn-danger">
                <i className="fa fa-times"></i>
            </button>
        )
    }

    render() {
        return (
            <div className="col-sm-12 mt-2">
                <div className="col-sm-12 mb-2">
                    <div className="form-group col-sm-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control ml-1"
                                    placeholder="Search by movie"
                                    onChange={this.handleChange}
                                    value={this.state.query_movie}
                                />
                                <button type="submit" className="ml-1 btn btn-info">
                                    <i className="fa fa-search"></i>
                                </button>
                                {this.state.query_movie !== '' && this.rendeClearButton()}
                            </div>
                        </form>
                    </div>
                </div>

                <Pagination url="/movies/" page={this.state.page} totalPages={this.state.totalPages} />

                <div className="row">
                    {this.state.movies.map(movie => (
                        <div className="col-sm-6" key={movie.id}>
                            <Movie key={movie.id} page={this.state.page} movie={movie} />
                        </div>
                    ))}
                </div>

                <Pagination url="/movies/" page={this.state.page} totalPages={this.state.totalPages} />
            </div>
        )
    }
}
