import React, { Component } from 'react';

class BookShelf extends Component {
    render() {

        const { booksList, shelf } = this.props;
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
                                            <select>
                                                {options.map((item) => (
                                                    <option value={item.value}
                                                        disabled={item.value === 'move' ? true : false}
                                                        selected={item.option === shelf ? true : false}>{item.option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">To Kill a Mockingbird</div>
                                    <div className="book-authors">Harper Lee</div>
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




