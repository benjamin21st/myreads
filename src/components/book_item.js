import React, { Component } from 'react';
import * as BooksAPI from './../models/BooksAPI';

class BookItem extends Component {
  handleShelfChange (e) {
    const id = this.props.id, shelf = e.target.value;
    // Since all that "update" call need from book is its id,
    // we can just construct a simple object like this without having
    // to pass in the entire this.props
    BooksAPI.update({ id: id }, shelf).then(() => {
      this.props.onShelfChange(id, shelf);
    });
  }
  render () {
    return (
      <li key={ this.props.id }>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${ this.props.thumbnail }")` }}></div>
            <div className="book-shelf-changer">
              <select
                value={ this.props.shelf }
                onChange={ (e) => this.handleShelfChange(e) }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ this.props.title }</div>
          <div className="book-authors">{ this.props.author }</div>
        </div>
      </li>
    );
  }
}

export default BookItem;