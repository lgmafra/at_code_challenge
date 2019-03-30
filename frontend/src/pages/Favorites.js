import React, { Component } from 'react';

import Utils from '../services/utils'
import localApi from '../services/localApi'

import Movie from '../components/Movie'
import Pagination from '../components/Pagination'

export default class Favorites extends Component {

    state = {
        movies: [],
        query_movie: '',
        page: null,
        totalPages: null
    }

    getFavoritesMovies = async (page) =>{
        const response = await localApi.get('favorite',{
            params: {
                api_key: Utils.getAuthToken(),
                page: page
            }
        })

        this.setMovieData(response)
    }

    setMovieData = (response) => {
        this.setState({
            page: response.data._meta.currentPage,
            totalPages: response.data._meta.pageCount,
            movies: response.data.items
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

    render() {
        return (
            <div className="col-sm-12 mt-2">
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
    }
}
