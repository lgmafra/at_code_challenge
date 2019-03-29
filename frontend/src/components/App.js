import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../css/App.css';

import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'

import api from '../services/api'
import Genre from '../services/genre'
import Utils from '../services/utils'

class App extends Component {

    constructor(props){
        super(props)
        this.homeRef = React.createRef()
    }

    loadGenres = async () => {
        const genres = await api.get('/genre/movie/list', {
            params: {
                api_key: Utils.getAuthToken()
            }
        })

        const result = genres.data.genres.map(async genre => {
            return Genre.insertGenresIfNotExists(genre)
        })

        Promise.all(result).then(() => {
            this.homeRef.current.getMovies()
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={() => <Home genres={this.loadGenres} ref={this.homeRef} />} />
                            <Route path="/detail/:id" component={MovieDetail} />
                        </Switch>
                    </BrowserRouter>
                </header>
            </div>
        );
    }
}

export default App;
