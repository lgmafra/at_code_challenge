import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Pagination extends Component {

    renderPageButton = (page, index, lastPage) => {
        const actualPage = (page-index)
        if(actualPage < 1 || actualPage > lastPage){
            return
        }

        return (
            <Link
                key={index}
                to={`/${actualPage}`}
                className={
                    index === 0
                    ? "btn btn-info ml-1"
                    : "btn btn-primary ml-1"
                }
            >{actualPage}</Link>
        )
    }

    renderExtremsButton = (symbol, page) => {
        return (
            <Link to={`/${page}`} className="ml-1 btn btn-primary">{symbol}</Link>
        )
    }

    render() {
        const { page, totalPages } = this.props
        const arrayIncrementPage = [2, 1, 0, -1, -2]
        const previousPage = (page-1) < 1 ? 1 : (page-1)
        const nextPage = (page+1) > totalPages ? totalPages : (page+1)

        return (
            <div className="col-sm-12 row">
                {this.renderExtremsButton("<<", 1)}
                {this.renderExtremsButton("<", previousPage)}
                {
                    arrayIncrementPage.map(index => (
                        this.renderPageButton(page, index, totalPages)
                    ))
                }
                {this.renderExtremsButton(">", nextPage)}
                {this.renderExtremsButton(">>", totalPages)}
            </div>
        )
    }
}
