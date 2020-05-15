import React, { Component } from 'react';
import BookShelf from './BookShelf';

class ListBooks extends Component {

    render() {

        const { books } = this.props;

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
                        <BookShelf booksList={currentlyReadingBooks} shelf='Currently Reading' />
                        <BookShelf booksList={wantToRead} shelf='Want to Read' />
                        <BookShelf booksList={read} shelf='Read' />
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks