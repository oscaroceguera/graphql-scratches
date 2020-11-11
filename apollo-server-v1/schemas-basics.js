import { ApolloServer, gql } from 'apollo-server'



const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Object type
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Post {
    title: String
    body: String
    mediaUrls: [String]
  }

  type Event {
    name: String
    date: String
    location: Location
  }

  type Location {
    name: String
    weather: WeatherInfo
  }

  type WeatherInfo {
    temperature: Float
    description: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    upcomingEvents: [Event]
  }

  # Mutation type
  type Mutation {
    addBook(title: String, author: String): Book
    # createPost(title: String, body: String, mediaUrls: [String]): Post
    createPost(post: PostAndMediaInput): Post # with input
    updateUserEmail(id: ID!, email: String!): User
  }

  input PostAndMediaInput {
    "A main title the post"
    title: String
    "The text body of the post"
    body: String
    "A lost URLs to render in post"
    mediaUrls: [String]
  }
`

// Data set
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const authors = [
  {
    books: [],
    name: 'Kate Chopin',
  },
  {
    books: [],
    name: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
