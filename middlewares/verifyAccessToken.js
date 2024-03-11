const { promisify } = require('util')

const R = require('ramda')
const jwt = require('jsonwebtoken')

const verifyToken = promisify(jwt.verify)

const getToken = R.pipe(
  R.split(' '),
  R.propOr('', 1),
)

const verifyAccessToken = async (req, res, next) => {
  if (process.env.DISABLE_AUTH) return next()

  try {
    const authHeader = req.get('Authorization')

    if (!authHeader) throw new Error('')

    const token = getToken(authHeader)
    await verifyToken(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(401).send('invalid access token!')
  }
}

module.exports = verifyAccessToken