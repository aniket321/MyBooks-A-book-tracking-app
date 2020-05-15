import React, { Component } from 'react';

class BookShelf extends Component {
    render() {

        const { booksList, shelf, onUpdateShelf } = this.props;
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
            <div className='bookshelf'>
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksList.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                onChange={(event) => updateShelf(book, event)}
                                                value={book.shelf}
                                            >
                                                {options.map((item) => (
                                                    <option value={item.value}
                                                        disabled={item.value === 'move' ? true : false}
                                                        // selected={item.option === shelf ? true : false}
                                                        key={item.value}
                                                    >
                                                        {item.option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        )
    }
}

export default BookShelf




