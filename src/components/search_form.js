import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './../models/BooksAPI';
import BookItem from './book_item';
import { SHELVES } from './book_shelf';

class SearchForm extends Component {

  state = {
    lastKeyPress: (new Date()).getTime(), // we fire search request every 500ms, not as user types
    // TODO: this doesn't need to be in here as it shouldn't trigger unnecessary view rendering
    timeOutID: null,
    searchResults: []
  }

  handleSearch = (e) => {
    let originalInput = e.target.value;
    let searchTerm = originalInput.trim(); // searchTerm doesn't need to be stored permanently, because changing it using setState would cause unwanted/unecessary rerendering of component
    if (this.state.timeOutID) {
      // do nothing, user is typing too fast
    } else if (searchTerm) {
      let timeOutID = setTimeout(()=>{
        this.setState({ timeOutID: null }); // clear current timeout
        console.log('Firing your search for: ', this.state.searchTerm);
        BooksAPI.search(searchTerm, 5).then((results) => {
          if ('error' in results) {
            alert(`No match found for your search of "${originalInput}", please try a different search`);
          } else {
            this.setState({searchResults: results});
          }
        });
      }, 200);
      this.setState({ timeOutID });
    }
  }

  onShelfChange = (bookID, shelf) => {
    BooksAPI.update(bookID, shelf).then(() => {
      this.setState((prevState) => {
        let book = this.state.searchResults.filter((book) => {
          return book.id === bookID;
        })[0];
        if (book) {
          book.shelf = shelf;
        }
      });
    })
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              onKeyUp={(e)=>{ this.handleSearch(e); }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults && (
              this.state.searchResults.map((book) => {
                /* TODO: this is too many params, maybe just throw in one object and use
                    PropType to validate that object? */
                return (<BookItem title={ book.title }
                          author={ book.author }
                          id={ book.id }
                          key={ book.id }
                          thumbnail={ book.imageLinks.smallThumbnail }
                          shelf={ book.shelf || SHELVES.NO_SHELF }
                          onShelfChange={ (bookId, shelf) => { this.onShelfChange(bookId, shelf) }}
                />)
              })
            )}
          </ol>
        </div>
    </div>
    )
  }
}

export default SearchForm;