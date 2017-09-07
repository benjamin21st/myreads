import React from 'react';
import { Route } from 'react-router-dom';

import SearchForm from './components/search_form';
import BookLibrary from './components/book_library';

import './styles/App.css';

/**
 * This file is the entry point for the application. It also serves as the router
 * that dispatches views accordingly.
 */
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" component={ SearchForm } />
        <Route exact path="/" component={ BookLibrary }/>
      </div>
    )
  }
}

export default BooksApp
