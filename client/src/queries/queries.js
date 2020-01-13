import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
      age
      books {
        id
        name
      }
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      authors {
        id
        name
        age
      }
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

const deleteBookQuery = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const deleteAuthorQuery = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  addAuthorMutation,
  deleteBookQuery,
  deleteAuthorQuery
};
