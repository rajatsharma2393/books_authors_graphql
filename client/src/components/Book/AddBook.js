import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    let currentBook = { ...this.state };
    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorIds: [this.state.authorId]
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: "",
      genre: "",
      authorId: ""
    });
  }

  render() {
    return (
      <form className="add-book form" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={this.state.genre}
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>
              {this.state.authorId ? this.state.name : "Select Author"}
            </option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(getBooksQuery, { name: "getBooksQuery" })
)(AddBook);
