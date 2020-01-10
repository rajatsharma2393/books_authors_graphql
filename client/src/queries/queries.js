import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorIds: [ID]!) {
    addBook(name: $name, genre: $genre, authorIds: $authorIds) {
      name
      id
    }
  }
`;

const addAuthorMutation = gql`
  mutation AddAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      authors {
        id
        name
        age
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  addAuthorMutation
};
