var express = require('express');
var router = express.Router();

const userService = require('../services/user');

// register
router.post('/', async (req, res) => {
  const {
    username,
    password
  } = req.body

  await userService.register(username, password)

  res.send('OK')
});

router.post('/login', async (req, res) => {
  const {
    username,
    password
  } = req.body

  const isValidUser = await userService.login(username, password)

  console.log('a', isValidUser);

  if (!isValidUser) {
    return res.status(401).send('wrong credentials')
  }

  res.send('OK')
})

module.exports = router;
