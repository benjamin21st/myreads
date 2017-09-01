import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import SearchForm from './search_form';
import BookShelf from './book_shelf';

import './App.css';

const SHELVES = {
  TO_READ: "wantToRead",
  READING: "currentlyReading",
  READ: "read"
}

class BooksApp extends React.Component {
  state = {}

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      console.log('Fetched from server')
      console.log(allBooks);
      this.setState({
        allBooks: allBooks
      });
    });
  }

  filterBooks = (shelf) => {
    return this.state.allBooks.filter((book) => {
      return book.shelf === shelf;
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchForm />
          )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.state.allBooks && (
              <div className="list-books-content">
                <BookShelf shelfTitle="Currently Reading"
                  booksInShelf={ this.filterBooks(SHELVES.READING) }
                />
                <BookShelf shelfTitle="Want to Read"
                  booksInShelf={ this.filterBooks(SHELVES.TO_READ) }
                />
                <BookShelf shelfTitle="Read"
                  booksInShelf={ this.filterBooks(SHELVES.READ) }
                />
              </div>
            )}
            <div className="open-search">
              <Link to='search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
