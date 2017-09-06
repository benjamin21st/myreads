import React, { Component } from 'react';
import BookItem from './book_item';

/**
 * These are the shelves we currently support, they should not be modified
 * during the lifetime of the app
 */
const SHELVES = {
  TO_READ: "wantToRead",
  READING: "currentlyReading",
  READ: "read",
  NO_SHELF: "none"
}

class BookShelf extends Component {
  render () {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {/* NOTE: A little confused here, shouldn't books be part of the "state" of
                  the bookshelf? If that's the case, then we will have to maintain
                  two copies of the same data in both state and props; if we only
                  try using state, we will have to control the state from the parent
                  component, which is not necessarily the best idea. */}
              { this.props.getBooksInShelf().map((book) => {
                return (
                  <BookItem title={ book.title }
                            author={ book.author}
                            id={ book.id }
                            key={ book.id }
                            thumbnail={ book.imageLinks.smallThumbnail }
                            shelf={ this.props.shelfID }
                            onShelfChange={ (bookId, shelf) => { this.props.onShelfChange(bookId, shelf) }}/>
                )
              })}
            </ol>
          </div>
        </div>
    );
  }
}

export {
  BookShelf,
  SHELVES
}