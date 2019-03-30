import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../css/App.css';

import Home from '../pages/Home'
import Movies from '../pages/Movies'
import MovieDetail from '../pages/MovieDetail'
import Favorites from '../pages/Favorites'

import Menu from './Menu'

import api from '../services/api'
import Genre from '../services/genre'
import Utils from '../services/utils'

class App extends Component {

    constructor(props){
        super(props)
        this.homeRef = React.createRef()
    }

    loadGenres = async (page = 1) => {
        const genres = await api.get('/genre/movie/list', {
            params: {
                api_key: Utils.getAuthToken()
            }
        })

        const result = genres.data.genres.map(async genre => {
            return Genre.insertGenresIfNotExists(genre)
        })

        Promise.all(result).then(() => {
            this.homeRef.current.getMovies(page)
        })
    }

    render() {
        return (
            <div className="App App-header">
                <BrowserRouter>
                    <div className="col-sm-12">
                        <Menu />
                    </div>
                    <Switch>    
                        <Route exact path="/" component={Home} />
                        <Route path="/movies/:page?" component={(props) => <Movies {...props} genres={this.loadGenres} ref={this.homeRef} />} />
                        <Route path="/detail/:id/:page?" component={MovieDetail} />
                        <Route path="/favorites/:page?" component={Favorites} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
