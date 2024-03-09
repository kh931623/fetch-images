var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require("graphql")
const { ruruHTML } = require("ruru/server")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const imageRouter = require('./routes/images')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    test: String,
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!"
  },
  test: () => 'hehehe'
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images', imageRouter)

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Serve the GraphiQL IDE.
app.get("/graphql-ide", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

module.exports = app;
