var express = require('express');
var router = express.Router();

const userService = require('../services/user');

// register
router.post('/', async (req, res) => {
  const {
    username,
    password
  } = req.body

  try {
    await userService.register(username, password)
    res.send('OK')
  } catch (error) {
    console.error(error);
    res.status(400).json(error)
  }
});

router.post('/login', async (req, res) => {
  const {
    username,
    password
  } = req.body

  const token = await userService.login(username, password)

  if (!token) {
    return res.status(401).send('wrong credentials')
  }

  res.json({
    access_token: token
  })
})

module.exports = router;
