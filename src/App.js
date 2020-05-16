import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends Component {

    /**
    State to store the books object(array)
    */
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

    /**
    * @description Calls getAll() api to fetch books and updates the state
    */

    update = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    /**
    * @description updates the shelf of book using the update() api
    * @param {object} book
    * @param {string} shlef
    */

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