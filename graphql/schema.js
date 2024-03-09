const { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Person {
    name: String
    age: Int
  }

  type Image {
    image_ID: String!
    thumbnails: String!
    preview: String!
    title: String!
    source: String!
    tags: [String]!
  }

  type Query {
    hello: String,
    test: Person,
    images(key: String): [Image]
  }
`)

module.exports = schema
