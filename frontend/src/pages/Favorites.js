import React, { Component } from 'react';

import Favorite from '../services/favorite'

import Movie from '../components/Movie'
import Pagination from '../components/Pagination'

export default class Favorites extends Component {

    state = {
        movies: [],
        query_movie: '',
        page: null,
        totalPages: null,
        isLoading: false
    }

    getFavoritesMovies = async (page) =>{
        this.setIsLoading()

        const response = await Favorite.getFavorites(page)

        this.setMovieData(response)
    }

    setIsLoading = () => {
        this.setState({isLoading: !this.state.isLoading})
    }

    setMovieData = (response) => {
        this.setState({
            page: response.data._meta.currentPage,
            totalPages: response.data._meta.pageCount,
            movies: response.data.items,
            isLoading: !this.state.isLoading
        })
    }

    async componentDidMount() {
        const { page } = this.props.match.params;
        this.getFavoritesMovies(page)
    }

    async componentDidUpdate(prevProps) {
        const { page } = this.props.match.params;
        if ( page !== prevProps.match.params.page) {
            this.getFavoritesMovies(page)
        }
    }

    renderInformation = () => {
        if(this.state.movies.length > 0){
            return (
                <div>
                    <Pagination url="/favorites/" page={this.state.page} totalPages={this.state.totalPages} />

                    <div className="row">
                        {this.state.movies.map(movie => (
                            <div className="col-sm-6" key={movie.id}>
                                <Movie
                                    key={movie.movie_id}
                                    movie={movie}
                                    page={this.state.page}
                                    isFavorite={true}
                                />
                            </div>
                        ))}
                    </div>

                    <Pagination url="/favorites/" page={this.state.page} totalPages={this.state.totalPages} />
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
                {this.state.isLoading ? this.showLoading() : this.renderInformation()}
            </div>
        )
    }
}
