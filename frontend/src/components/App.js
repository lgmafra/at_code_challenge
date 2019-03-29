import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import logo from '../logo.svg';
import '../css/App.css';

import Home from '../pages/Home'

import api from '../services/api'
import Genre from '../services/genre'

class App extends Component {

    constructor(props){
        super(props)
        this.homeRef = React.createRef()
    }

    loadGenres = async () => {
        const genres = await api.get('/genre/movie/list', {
            params: {
                api_key: "1f54bd990f1cdfb230adb312546d765d"
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
                    <img src={logo} className="App-logo" alt="logo" />
                    
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={() => <Home genres={this.loadGenres} ref={this.homeRef} />} />
                        </Switch>
                    </BrowserRouter>
                </header>
            </div>
        );
    }
}

export default App;
