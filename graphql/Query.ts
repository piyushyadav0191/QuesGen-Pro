import { gql } from "@apollo/client";

export const getJokesQuery = gql`
  query {
    getJokes {
      id
      content
    }
  }
`;
