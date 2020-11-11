import { gql } from "apollo-server";

const typeDefs = gql`
  type Product {
    id: Int,
    name: String,
    description: String
  }

  input ProductInput {
    name: String,
    description: String
  }

  type Query {
    products: [Product]
    product(id: Int!): Product
  }
  
  
  type Mutation {
    createProduct(product: ProductInput): Product
  }
`

export default typeDefs