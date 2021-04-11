import React, { Component } from "react";
import BookItem from "./BookItem";
import PropTypes from 'prop-types';

class ListBooks extends Component {


    filterCorruptedBooks = (books) => {
        return books.filter((book) => book.author || book.imageLinks)
    }

    render() {
        const books = this.filterCorruptedBooks(this.props.books);
        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <BookItem
                        key={book.id}
                        book={book}
                        onUpdateBookShelf={this.props.onUpdateBookShelf} />
                ))}
            </ol>
        );
    }
}
ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
};
export default ListBooks;