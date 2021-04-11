import React, { Component } from "react";
import BookItem from "./BookItem";
import PropTypes from 'prop-types';

class ListBooks extends Component {

    render() {
        const { books } = this.props;
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