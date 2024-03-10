const { promisify } = require('util')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { prisma } = require('../prisma');

const hashPassword = (password) => bcrypt.hash(password, 10)
const verifyPassword = bcrypt.compare
const signToken = promisify(jwt.sign)

const register = async (username, password) => {
  const hashedPassword = await hashPassword(password)

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword
    }
  })
}

const login = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) return null

  const valid = await verifyPassword(password, user.password)

  if (!valid) return null

  const token = await signToken(user, process.env.JWT_SECRET, {
    expiresIn: '30m'
  })

  return token
}

module.exports = {
  register,
  login,
}