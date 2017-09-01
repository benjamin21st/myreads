import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchForm extends Component {

  state = {
    lastKeyPress: (new Date()).getTime(), // we fire search request every 500ms, not as user types
    timeOutID: null,
    searchTerm: ''
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value }); // update search term regardless of debounce
    if (this.state.timeOutID) {
      // console.log('There is an active search scheduled to fire')
    } else {
      this.setState({
        timeOutID: setTimeout(()=>{
          this.setState({ timeOutID: null }); // clear current timeout
          console.log('Firing your search for: ', this.state.searchTerm);
        }, 500)
      });
    }
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
          <ol className="books-grid"></ol>
        </div>
    </div>
    )
  }
}

export default SearchForm;