import React, { Component } from "react";
import { graphql } from "react-apollo";

class AuthorDetails extends Component {
  displayAuthorDetails() {
    let author = this.props.author;
    if (author) {
      return (
        <div>
          <h1>Author Details: </h1>
          <h2>Name: {author.name}</h2>
          <h3>Age: {author.age}</h3>

          {author.books.length > 0 && (
            <React.Fragment>
              <p>All Books by this author:</p>
              <ul className="other-books">
                {author.books.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </React.Fragment>
          )}
          <button class="delete-button">Delete</button>
        </div>
      );
    } else {
      return <div>No author selected...</div>;
    }
  }
  render() {
    return <div className="author-details">{this.displayAuthorDetails()}</div>;
  }
}

export default AuthorDetails;
