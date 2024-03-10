const validateCredentials = (req, res, next) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).send('username and password are required!')
  }

  next()
}

module.exports = validateCredentials