import React, { Component } from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    update = (books, id, shelf) => {
        const booksList = []
        books.forEach((book) => {
            if (book.id === id) {
                book.shelf = shelf;
            }
            booksList.push(book);
        });
        return booksList;
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((books) => {
                this.setState((currentState) => ({
                    books: this.update(currentState.books, book.id, shelf)
                }))
            })
    }

    render() {
        return (
            <div className="app">
                <ListBooks books={this.state.books} onUpdateShelf={this.updateShelf} />
            </div>
        )
    }


}

export default BooksApp;