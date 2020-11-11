/*
  CUSTOM SCALAR TYPES 
*/

import { ApolloServer, gql } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json'

const schemaString = gql`
  scalar JSON

  type Foo {
    aField: JSON
  }

  type Query {
    foo: Foo
  }
`

const reolveFunctions =  {
  JSON: GraphQLJSON
}

const server = new ApolloServer({
  typeDefs: schemaString,
  resolvers: reolveFunctions
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})