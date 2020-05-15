import React, { Component } from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
    render() {
        return (
            <div className="app">
                <ListBooks />
            </div>
        )
    }


}

export default BooksApp;