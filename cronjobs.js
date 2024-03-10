const cron = require('node-cron')
const { redisClient } = require('./redis')

const registerCronjobs = () => {
  cron.schedule('*/10 * * * *', async () => {
    await redisClient.flushDb()
    console.log('redis cache flushed!');
  })
}

module.exports = {
  registerCronjobs,
}