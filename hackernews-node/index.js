import { GraphQLServer } from 'graphql-yoga'

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `this is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, { id }) => links.find(item => item.id === id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const { id } = args

      const filterLinks = links.filter(item => item.id !== id)
      const newObject = [...filterLinks, args]

      links = newObject

      return args
    },
    deleteLink: (_, args) => {
      const { id } = args

      const filterLinks = links.filter(item => item.id !== id)

      links = filterLinks

      return args
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))