var express = require('express');
const compression = require('compression')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ruruHTML } = require("ruru/server")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const imageRouter = require('./routes/images')

const { graphqlHandler } = require('./graphql')

var app = express();

app.use(compression())
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
  graphqlHandler,
)

// Serve the GraphiQL IDE.
app.get("/graphql-ide", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

module.exports = app;
