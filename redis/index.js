const { createClient } = require('redis')

const redisClient = createClient({
  url: process.env.REDIS
})

module.exports = {
  redisClient,
}