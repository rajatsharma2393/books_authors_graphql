import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../../queries/queries";

// components
class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayAuthors() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Authors...</div>;
    } else {
      return data.authors.map(author => {
        return (
          <li
            key={author.id}
            onClick={() => {
              this.props.handleAuthorOnClick(author);
            }}
          >
            {author.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="authors-list">
        <h2>Authors:</h2>
        <ul className="app-list">{this.displayAuthors()}</ul>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AuthorList);
