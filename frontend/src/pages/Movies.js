import React, { Component } from 'react';

import MovieService from '../services/movie'

import Movie from '../components/Movie'
import Pagination from '../components/Pagination'

export default class Movies extends Component {

    state = {
        movies: [],
        query_movie: '',
        page: null,
        totalPages: null,
        isLoading: false
    }

    getMovies = async (page = 1) => {
        this.setIsLoading()

        const response = await MovieService.getUpcomingMovies(page)

        this.setMovieData(response)
    }

    getMovieByFilter = async (filter, page = 1) => {
        this.setIsLoading()

        const response = await MovieService.searchMovie(page, filter)

        this.setMovieData(response)
    }

    setIsLoading = () => {
        this.setState({isLoading: !this.state.isLoading})
    }

    componentDidMount(){
        const { page } = this.props.match.params;
        this.props.genres(page)
    }

    setMovieData = (response) => {
        this.setState({
            page: response.data.page,
            totalPages: response.data.total_pages,
            movies: response.data.results,
            isLoading: !this.state.isLoading
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

    renderInformation = () => {
        if(this.state.movies.length > 0){
            return (
                <div>
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
        }else{
            return <h1>No data found.</h1>
        }
    }

    showLoading = () => {
        return <h1>Loading...</h1>
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

                {this.state.isLoading ? this.showLoading() : this.renderInformation()}
            </div>
        )
    }
}
