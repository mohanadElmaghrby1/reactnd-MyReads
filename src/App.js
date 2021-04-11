import React from 'react'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  bookshelves = [{ id: 'currentlyReading', name: 'Currently Reading' }
    , { id: 'wantToRead', name: 'Want To Ready' }, { id: 'read', name: 'Read' }]


  updateBookShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
      .then((res) => {
        const bookExist = this.state.books.find((storedBook) => (
          storedBook.id === book.id
        ));
        book.shelf = newShelf;

        this.setState((oldState) => ({
          books: bookExist ? oldState.books : [...oldState.books, book]
        }));
      });
  };

  componentDidMount() {
    //load books
    BooksAPI.getAll()
      .then(books => {
        this.setState((oldState) => ({
          books
        }));
      });
  }

  render() {
    return (
      <div className="app">

        <Route
          exact path='/search'
          render={() => (
            <SearchBooks
              onUpdateBookShelf={this.updateBookShelf}
              books={this.state.books}
            />
          )}
        />

        <Route
          exact path='/'
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.bookshelves.map((shelf) => (
                    <BooksShelf
                      key={shelf.id}
                      books={this.state.books} shelf={shelf}
                      onUpdateBookShelf={this.updateBookShelf} />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp
