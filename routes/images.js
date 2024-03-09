var express = require('express');
var router = express.Router();

const { searchImages } = require('../services/unsplash')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  const key = req.query.key
  const images = await searchImages(key)

  res.json(images)
});

module.exports = router;
