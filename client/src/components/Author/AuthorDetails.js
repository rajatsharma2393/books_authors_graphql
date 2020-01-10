import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../../queries/queries";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    console.log(book);
    if (book) {
      return (
        <div>
          <h2>Name: {book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.authors.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }
  render() {
    return <div className="author-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
