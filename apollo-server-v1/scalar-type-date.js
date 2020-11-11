/*
  CUSTOM GraphQLScalarType INSTANCE
*/
import { ApolloServer, gql } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast){
      if(ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string  format
      }
      return null
    }
  })
}

const typeDefs = gql`
  scalar Date

  type MyType {
    created: Date
  }

  type Query {
    chingadera: MyType
  }
`

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})