import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookItem from './BookItem';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  bookShelfs = [{ id: 'currentlyReading', name: 'Currently Reading' }
    , { id: 'wantToRead', name: 'Want To Ready' }, { id: 'read', name: 'Read' }]

  updateBookShelf = (book, newShelf) => {
    book.shelf = newShelf;
    //update book request
    BooksAPI.update(book, newShelf)
      .then((res) => {
        //change state
        this.setState((oldState) => ({
          books: oldState.books
        }))
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
    this.bookShelfs.forEach((shelf) => {
      console.log('shef', shelf)
    })
    return (
      <div className="app">
        {this.state.showSearchPage ? (
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
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.bookShelfs.map((shelf) => (
                  <BookShelf
                    key={shelf.id}
                    books={this.state.books} shelf={shelf}
                    onUpdateBookShelf={this.updateBookShelf} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
