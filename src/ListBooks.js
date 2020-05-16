import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {

    render() {

        const { books, onUpdateShelf } = this.props;
        const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const read = books.filter(book => book.shelf === 'read');

        return (
            <div className='list-books'>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf booksList={currentlyReadingBooks} shelf='Currently Reading' onUpdateShelf={onUpdateShelf} />
                        <BookShelf booksList={wantToRead} shelf='Want to Read' onUpdateShelf={onUpdateShelf} />
                        <BookShelf booksList={read} shelf='Read' onUpdateShelf={onUpdateShelf} />
                        <div className="open-search">
                            <Link
                                to="/search"
                                className="open-search"
                            >
                                Add a book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default ListBooks