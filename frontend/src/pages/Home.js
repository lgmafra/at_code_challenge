import React, { Component } from 'react';
import api from '../services/api'

import Movie from '../components/Movie'

const token = "1f54bd990f1cdfb230adb312546d765d"

export default class Home extends Component {

    state = {
        movies: []
    }

    async componentDidMount(){
        const response = await api.get('discover/movie',{
            params: {
                api_key: token
            }
        })

        this.setState({movies: response.data.results})
    }

    render() {        
        return (
            <div className="row">
                {this.state.movies.map(movie => (
                    <div className="col-sm-6" key={movie.id}>
                        <Movie key={movie.id} movie={movie} />
                    </div>
                ))}
            </div>
        )
    }
}
