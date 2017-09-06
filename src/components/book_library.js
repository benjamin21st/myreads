/**
 * This component is composed of multiple book shelves
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './../models/BooksAPI';

import { SHELVES, BookShelf } from './book_shelf';

class BookLibrary extends Component {
  state = {};

  componentDidMount() {
    // TODO: on search page, this is unnecessary
    // TODO: books added on search page are not updated into the shelves
    BooksAPI.getAll().then((allBooks) => {
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

  /**
   * To avoid unnecessary server requests, this function will simply update current
   * allBooks database with the new "shelf" for "bookId", and causing a rerender
   */
  moveBookToShelf = (bookId, shelf) => {
    this.setState((prevState) => {
      for (let book of prevState.allBooks) {
        if (book.id === bookId) {
          book.shelf = shelf;
          break;
        }
      }
    });
  }

  render () {
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {this.state.allBooks && (
        <div className="list-books-content">
          <BookShelf shelfTitle="Currently Reading"
            shelfID={ SHELVES.READING }
            getBooksInShelf={ () => { return this.filterBooks(SHELVES.READING) } }
            onShelfChange={(bookId, shelf) => { this.moveBookToShelf(bookId, shelf) }}
          />
          <BookShelf shelfTitle="Want to Read"
            shelfID={ SHELVES.TO_READ }
            getBooksInShelf={ () => { return this.filterBooks(SHELVES.TO_READ) } }
            onShelfChange={(bookId, shelf) => { this.moveBookToShelf(bookId, shelf) }}
          />
          <BookShelf shelfTitle="Read"
            shelfID={ SHELVES.READ }
            getBooksInShelf={ () => { return this.filterBooks(SHELVES.READ) } }
            onShelfChange={(bookId, shelf) => { this.moveBookToShelf(bookId, shelf) }}
          />
        </div>
      )}
      <div className="open-search">
        <Link to='search'>Add a book</Link>
      </div>
    </div>
    );
  }
}

export default BookLibrary;