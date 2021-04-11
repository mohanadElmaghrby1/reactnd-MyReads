import React, { Component } from "react";
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
        BooksAPI.search(query)
            .then((res) => {
                this.setState((oldstate) => ({
                    books: res
                }));
            });
    }

    render() {
        const books = this.state.books.map((book) => this.updateBookShelf(book));
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ListBooks
                        books={books}
                        onUpdateBookShelf={this.props.onUpdateBookShelf} />
                </div>
            </div>
        );
    }
}
export default SearchBooks;