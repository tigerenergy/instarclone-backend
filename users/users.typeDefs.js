import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
    login(username: String!, password: String!): LoginResult!
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): EditProfileResult!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
