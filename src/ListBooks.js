import React, { Component } from "react";
import BookItem from "./BookItem";

class ListBooks extends Component {
    render() {
        const { books } = this.props;
        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </ol>
        );
    }
}

export default ListBooks;