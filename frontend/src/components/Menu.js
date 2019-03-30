import React from 'react';
import { Link } from 'react-router-dom'

const Menu = () => (
    <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item mr-2">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="mr-2">|</li>
                    <li className="nav-item mr-2">
                        <Link to="/movies">Movies</Link>
                    </li>
                    <li className="mr-2">|</li>
                    <li className="nav-item mr-2">
                        <Link to="/favorites">Favorites</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)

export default Menu;
