import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import BookList from "./components/Book/BookList";
import AddBook from "./components/Book/AddBook";
import BookDetails from "./components/Book/BookDetails";

import AuthorList from "./components/Author/AuthorList";
import AddAuthor from "./components/Author/AddAuthor";
import AuthorDetails from "./components/Author/AuthorDetails";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <div id="main">
            <h1>Ninja's Reading List</h1>
            <BookList />
            <div className="add-book-div">
              <AddBook />
            </div>

            <AuthorList />
            <div className="add-author-div">
              <AddAuthor />
            </div>
          </div>
          <BookDetails bookId={1} />
          <AuthorDetails authorId={1} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
