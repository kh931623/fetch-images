const validateKey = (req, res, next) => {
  const key = req.query.key

  if (!key) {
    res.status(400)
    res.send('url params `key` is required!')
    return
  }

  next()
}

module.exports = validateKey