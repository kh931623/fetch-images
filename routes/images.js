var express = require('express');
var router = express.Router();

const imageService = require('../services/image')
const validateKey = require('../middlewares/validateKey')

router.get('/', validateKey, async function (req, res) {
  const key = req.query.key
  const images = await imageService.searchImages(key)

  res.json(images)
});

module.exports = router;
