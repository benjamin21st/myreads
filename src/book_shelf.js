import React, { Component } from 'react';
import BookItem from './book_item';

class BookShelf extends Component {

  state = {};

  componentDidMount () {
    this.setState({ books: this.props.booksInShelf });
  }

  render () {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              { this.state.books && (this.state.books.map((book) => {
                return (
                  <li key={ book.id }>
                    <BookItem title={ book.title }
                              author={ book.author}
                              thumbnail={ book.imageLinks.smallThumbnail } />
                  </li>
                )
              }))}
            </ol>
          </div>
        </div>
    );
  }
}

export default BookShelf;