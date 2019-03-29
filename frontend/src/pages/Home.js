import React, { Component } from 'react';
import api from '../services/api'

import Movie from '../components/Movie'

const token = "1f54bd990f1cdfb230adb312546d765d"

export default class Home extends Component {

    state = {
        movies: []
    }

    getMovies = async () => {
        const response = await api.get('discover/movie',{
            params: {
                api_key: token
            },
            config: {
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        })

        this.setState({movies: response.data.results})
    }

    componentDidMount(){
        this.props.genres()
    }

    render() {        
        return (
            <div className="row col-sm-12">
                {this.state.movies.map(movie => (
                    <div className="col-sm-6" key={movie.id}>
                        <Movie key={movie.id} movie={movie} />
                    </div>
                ))}
            </div>
        )
    }
}
