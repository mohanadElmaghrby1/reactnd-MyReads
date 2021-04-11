import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks";

class SearchBooks extends Component {

    state = {
        books: [],
        query: ''
    }


    updateBookShelf(newBook) {
        const book = this.props.books.find((book) => book.id === newBook.id);
        return book || newBook;
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }));
        if (query) {
            BooksAPI.search(query)
                .then((res) => {
                    this.setState((oldstate) => ({
                        books: res
                    }));
                });
        }

    }

    render() {
        let books = [];
        if (this.state.query && !this.state.books.error)
            books = this.state.books.map((book) => this.updateBookShelf(book));
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>

                { books.length !== 0 ?
                    (<div className="search-books-results">
                        <ListBooks
                            books={books}
                            onUpdateBookShelf={this.props.onUpdateBookShelf} />
                    </div >)
                    : (<div className="search-books-results">
                        <p>Use these terms Please: 'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography',
                        'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design',
                        'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football',
                        'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
                        'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux',
                        'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy',
                          'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>
                    </div>)}

            </div>
        );
    }
}
export default SearchBooks;