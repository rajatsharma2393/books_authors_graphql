import React, { Component } from "react";
// components
import BookList from "../Book/BookList";
import AddBook from "../Book/AddBook";

import AuthorList from "../Author/AuthorList";
import AddAuthor from "../Author/AddAuthor";

import Details from "./Details";
import { graphql, compose } from "react-apollo";
import {
  deleteBookQuery,
  getBooksQuery,
  deleteAuthorQuery,
  getAuthorsQuery
} from "../../queries/queries";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorClicked: null,
      bookClicked: null
    };
  }

  handleBookOnClick = book => {
    this.setState({
      ...this.state,
      bookClicked: book
    });
  };

  handleAuthorOnClick = author => {
    this.setState({
      ...this.state,
      authorClicked: author
    });
  };

  handleDeleteBookClick = id => {
    this.props.deleteBookQuery({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      ...this.state,
      bookClicked: null
    });
  };

  handleDeleteAuthorClick = id => {
    this.props.deleteAuthorQuery({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
    this.setState({
      ...this.state,
      authorClicked: null
    });
  };

  render() {
    return (
      <div>
        <div id="main">
          <h1>Rajat's Reading List</h1>
          <BookList handleBookOnClick={this.handleBookOnClick} />
          <div className="add-book-div">
            <AddBook />
          </div>

          <AuthorList handleAuthorOnClick={this.handleAuthorOnClick} />
          <div className="add-author-div">
            <AddAuthor />
          </div>
        </div>
        <Details
          book={this.state.bookClicked}
          author={this.state.authorClicked}
          handleDeleteBookClick={this.handleDeleteBookClick}
          handleDeleteAuthorClick={this.handleDeleteAuthorClick}
        />
      </div>
    );
  }
}

export default compose(
  graphql(deleteBookQuery, { name: "deleteBookQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(deleteAuthorQuery, { name: "deleteAuthorQuery" }),
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
)(Main);
