import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Pagination extends Component {

    renderPageButton = (page, index, lastPage, url) => {
        const actualPage = (page-index)
        if(actualPage < 1 || actualPage > lastPage){
            return
        }

        return (
            <Link
                key={index}
                to={`${url}${actualPage}`}
                className={
                    index === 0
                    ? "btn btn-success ml-1"
                    : "btn btn-light ml-1"
                }
            >{actualPage}</Link>
        )
    }

    renderExtremsButton = (symbol, page, url) => {
        return (
            <Link to={`${url}${page}`} className="ml-1 btn btn-light">{symbol}</Link>
        )
    }

    render() {
        const { url, page, totalPages } = this.props
        const arrayIncrementPage = [2, 1, 0, -1, -2]
        const previousPage = (page-1) < 1 ? 1 : (page-1)
        const nextPage = (page+1) > totalPages ? totalPages : (page+1)

        return (
            <div className="App col-sm-12 mb-2">
                {this.renderExtremsButton("<<", 1, url)}
                {this.renderExtremsButton("<", previousPage, url)}
                {
                    arrayIncrementPage.map(index => (
                        this.renderPageButton(page, index, totalPages, url)
                    ))
                }
                {this.renderExtremsButton(">", nextPage, url)}
                {this.renderExtremsButton(">>", totalPages, url)}
            </div>
        )
    }
}
