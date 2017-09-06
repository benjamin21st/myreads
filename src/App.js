import React from 'react';
import { Route } from 'react-router-dom';

import SearchForm from './components/search_form';
import BookLibrary from './components/book_library';

import './styles/App.css';

// TODO: due to routing complication, move the two main page components into their own module
//       so that we can leverage their life cycle events
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchForm />
          )}
        />
        <Route exact path="/" render={() => (
            <BookLibrary />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
