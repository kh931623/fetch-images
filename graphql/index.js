const { createHandler } = require("graphql-http/lib/use/express")

const schema = require('./schema')
const resolvers = require('./resolvers')

const graphqlHandler = createHandler({
  schema,
  rootValue: resolvers,
})

module.exports = {
  graphqlHandler,
}