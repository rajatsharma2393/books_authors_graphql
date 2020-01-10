import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  getBooksQuery,
  addAuthorMutation
} from "../../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: ""
    };
  }
  displayBooks() {
    var data = this.props.getBooksQuery;
    if (data.loading) {
      return <option disabled>Loading Books</option>;
    } else {
      return data.books.map(book => {
        return (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    // use the addBookMutation
    this.props.addAuthorMutation({
      variables: {
        name: this.state.name,
        age: this.state.age
      },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
    this.setState({
      name: "",
      age: ""
    });
  }
  render() {
    return (
      <form className="add-author form" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Author name:</label>
          <input
            type="text"
            placeholder=""
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Age:</label>
          <input
            type="text"
            value={this.state.age}
            onChange={e => this.setState({ age: parseInt(e.target.value) })}
          />
        </div>
        <div className="field">
          <label>Current Books:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select Book</option>
            {this.displayBooks()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddBook);
