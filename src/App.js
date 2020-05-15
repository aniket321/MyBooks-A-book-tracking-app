import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
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
                <Route exact path='/' render={() => (
                    <ListBooks
                        books={this.state.books}
                        onUpdateShelf={this.updateShelf}
                    />
                )}
                />
                <Route exact path="/search" render={({ history }) => (
                    <SearchBooks
                        books={this.state.books}
                        onUpdateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf);
                            history.push('/');
                        }
                        }

                    />
                )}
                />

            </div>
        )
    }


}

export default BooksApp;