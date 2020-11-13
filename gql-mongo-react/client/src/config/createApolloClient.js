import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:300/graphql'
})

export default client