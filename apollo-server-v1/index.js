const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  enum AllowedColor {
    RED
    GREEN
    BLUE
  }

  type Query {
    favoriteColor: AllowedColor # As a return value
    avatar(borderColor: AllowedColor): String # As an argument
  }
`;

const resolvers = {
  Query: {
    favoriteColor: () => 'RED',
    avatar: (parent, args) => {
      // args.borderColor is 'RED', 'GREEN', or 'BLUE'
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});