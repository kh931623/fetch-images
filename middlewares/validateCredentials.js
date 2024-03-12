const R = require('ramda')

const validateCredentials = (req, res, next) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).send('username and password are required!')
  }

  req.body = {
    username: R.trim(username),
    password: R.trim(password)
  }

  next()
}

module.exports = validateCredentials