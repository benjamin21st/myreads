import React, { Component } from 'react';
import * as BooksAPI from './../models/BooksAPI';

class BookItem extends Component {
  handleShelfChange (e) {
    const { id } = this.props,
          shelf = e.target.value;
    // Since all that "update" call need from book is its id,
    // we can just construct a simple object like this without having
    // to pass in the entire this.props
    BooksAPI.update({ id: id }, shelf).then(() => {
      this.props.onShelfChange(id, shelf);
    });
  }
  render () {
    let { thumbnail, shelf, title, author } = this.props;
    return (
      <li key={ this.props.id }>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              backgroundImage: `url("${ thumbnail }")` }}></div>
            <div className="book-shelf-changer">
              <select
                value={ shelf }
                onChange={ (e) => this.handleShelfChange(e) }>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ title }</div>
          <div className="book-authors">{ author ? author.join(', ') : '' }</div>
        </div>
      </li>
    );
  }
}

export default BookItem;