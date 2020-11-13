import express from 'express'
import {ApolloServer} from 'apollo-server-express'

import mongoose from './config/databasee'

import typeDefs from './modules/post/graphqlSchema'

import resolvers from './modules/post/resolvers'

// Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// Initialize an Express application
const app = express()

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app })

// Set the port that the Express application will listen to
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}${server.graphqlPath}`)
})