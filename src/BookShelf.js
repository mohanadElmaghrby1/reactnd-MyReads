import React, { Component } from "react";
import ListBooks from "./ListBooks";

class BookShelf extends Component {
    render() {
        const { shelf, books } = this.props;
        const showingBooks = books
            .filter((book) => book.shelf === shelf.id);

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ListBooks books={showingBooks} />
                </div>
            </div>
        );
    }
}

export default BookShelf;