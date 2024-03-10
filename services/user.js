const bcrypt = require('bcrypt');

const { prisma } = require('../prisma')

const hashPassword = (password) => bcrypt.hash(password, 10)
const verifyPassword = bcrypt.compare

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

  return verifyPassword(password, user.password)
}

module.exports = {
  register,
  login,
}