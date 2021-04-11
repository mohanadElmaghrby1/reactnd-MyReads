import React, { Component } from "react";
import ListBooks from "./ListBooks";
import PropTypes from 'prop-types';

class BooksShelf extends Component {
    render() {
        const { shelf, books } = this.props;
        const showingBooks = books.filter((book) => book.shelf === shelf.id);

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ListBooks
                        books={showingBooks}
                        onUpdateBookShelf={this.props.onUpdateBookShelf} />
                </div>
            </div>
        );
    }
}
BooksShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
};
export default BooksShelf;