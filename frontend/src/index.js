import React from 'react';
import ReactDOM from 'react-dom';

import "@babel/polyfill"
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./components/App"
// import Home from './pages/Home'

ReactDOM.render((<App/>),document.getElementById("app"))
