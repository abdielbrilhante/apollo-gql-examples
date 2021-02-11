const gql = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    profilePicture: String
  }

  type Hotel {
    id: String!
    name: String!
    starRating: String!
    thumbnail: String!
    pictures: [String!]
    description: String!
    rate: String

    address: String!
    city: String!
    state: String!
    zipcode: String

    averageRating: Float
    reviews: [Review]
  }

  type Review {
    id: ID!
    user: User!
    rating: Int!
    comments: String
  }

  type Reservation {
    id: ID!
    hotel: Hotel!
    startDate: String!
    endDate: String!
    canceled: Boolean
  }

  type Query {
    userInfo: User

    hotels(search: String!): [Hotel]
    hotel(id: ID!): Hotel

    reservations: [Reservation]
  }

  type Mutation {
    placeReservation(hotelId: ID!, startDate: String!, endDate: String!): Reservation!
    cancelReservation(id: ID!): Reservation!
  }
`;
