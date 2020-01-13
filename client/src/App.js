import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, graphql, compose } from "react-apollo";

// components
import BookList from "./components/Book/BookList";
import AddBook from "./components/Book/AddBook";

import AuthorList from "./components/Author/AuthorList";
import AddAuthor from "./components/Author/AddAuthor";

import Details from "./components/common/Details";
import {
  deleteBookQuery,
  getBooksQuery,
  deleteAuthorQuery,
  getAuthorsQuery
} from "./queries/queries";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
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
  };

  handleDeleteAuthorClick = id => {
    this.props.deleteAuthorQuery({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <div id="main">
            <h1>Ninja's Reading List</h1>
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
      </ApolloProvider>
    );
  }
}

export default compose(
  graphql(deleteBookQuery, { name: "deleteBookQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(deleteAuthorQuery, { name: "deleteAuthorQuery" }),
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
)(App);
