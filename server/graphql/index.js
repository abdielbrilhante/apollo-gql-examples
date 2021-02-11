const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

module.exports = new ApolloServer({ typeDefs, resolvers });
