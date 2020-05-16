import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

    state = {
        books: [],
        query: ''
    }

    updateQuery = (query) => {
        BooksAPI.search(query)
            .then((books) => {
                if (books) {
                    if (books.hasOwnProperty('error')) {
                        this.setState(() => ({
                            books: [],
                            query: query
                        }))
                    }
                    else {
                        for (let i = 0; i < books.length; i++) {
                            let flag = 1;
                            for (let j = 0; j < this.props.books.length; j++) {
                                if (books[i].id === this.props.books[j].id) {
                                    flag = 0;
                                    books[i].shelf = this.props.books[j].shelf;
                                }
                            }
                            if (flag) {
                                books[i].shelf = 'none';
                            }
                        }
                        this.setState(() => ({
                            books: books,
                            query: query
                        }))
                    }
                }
                else {
                    this.setState(() => ({
                        books: [],
                        query: ''
                    }))
                }

            })
    }

    render() {

        const { books } = this.state;
        const { onUpdateShelf } = this.props;
        const options = [
            {
                value: "move",
                option: "Move to..."
            },
            {
                value: "currentlyReading",
                option: "Currently Reading"
            },
            {
                value: "wantToRead",
                option: "Want to Read"
            },
            {
                value: "read",
                option: "Read"
            },
            {
                value: "none",
                option: "None"
            }
        ];

        const updateShelf = (book, event) => {
            onUpdateShelf(book, event.target.value);
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.length > 0 && books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={(event) => updateShelf(book, event)}
                                            >
                                                {options.map((item) => (
                                                    <option value={item.value}
                                                        disabled={item.value === 'move' ? true : false}
                                                        key={item.value}
                                                    >
                                                        {item.option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        )
    }
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default SearchBooks