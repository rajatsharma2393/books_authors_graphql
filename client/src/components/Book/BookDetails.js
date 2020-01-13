import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { deleteBookQuery, getBooksQuery } from "../../queries/queries";

class BookDetails extends Component {
  displayBookDetails() {
    let book = this.props.book;
    if (book) {
      return (
        <div>
          <h1>Book Details: </h1>
          <h2>Name: {book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>All authors of this book:</p>
          <ul className="other-books">
            {book.authors.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <button
            className="delete-button"
            onClick={() => {
              this.props.handleDeleteBookClick(book.id);
            }}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }
  render() {
    return <div className="book-details">{this.displayBookDetails()}</div>;
  }
}
export default compose(
  graphql(deleteBookQuery, { name: "deleteBookQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" })
)(BookDetails);
