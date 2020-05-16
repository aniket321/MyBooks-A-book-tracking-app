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

    update = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((books) => {
                this.update();
            })
    }

    render() {
        return (
            <div className="app">
                {this.state.books.length > 0 && (<Route exact path='/' render={() => (
                    <ListBooks
                        books={this.state.books}
                        onUpdateShelf={this.updateShelf}
                    />
                )}
                />)}
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