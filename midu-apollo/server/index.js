import {ApolloServer, gql} from 'apollo-server'
import fetch from 'node-fetch'

function fetchCharacter(id) {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
}

function fetchCharacters() {
  return fetch('https://rickandmortyapi.com/api/character/')
    .then(res => res.json())
    .then(json => json.results)
}

const typeDefs = gql`
  enum CharacterStatus {
    Alive
    Dead
    unknown
  }

  type Character {
    name: String
    id: ID
    image: String
    status: CharacterStatus
    episodes: [String]
  }

  # definimos las queries
  type Query {
    characters: [Character]
    character(id: ID): Character
  }
`
const resolvers = {
  Query: {
    characters: () => fetchCharacters(),
    character: (parent, args) => {
      const { id } = args
      return fetchCharacter(id)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})