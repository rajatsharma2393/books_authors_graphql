import React, { Component } from "react";
import AuthorDetails from "../Author/AuthorDetails";
import BookDetails from "../Book/BookDetails";
import "./details.css";

export default class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="details-list">
        <BookDetails
          book={this.props.book}
          handleDeleteBookClick={this.props.handleDeleteBookClick}
        />
        <AuthorDetails
          author={this.props.author}
          handleDeleteAuthorClick={this.props.handleDeleteAuthorClick}
        />
      </div>
    );
  }
}
