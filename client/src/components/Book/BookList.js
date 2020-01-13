import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries/queries";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={() => {
              this.props.handleBookOnClick(book);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="books-list">
        <h2>Books:</h2>
        <ul className="app-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
