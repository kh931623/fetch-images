var express = require('express');
var router = express.Router();

const unsplashService = require('../services/unsplash')
const pixabayService = require('../services/pixabay')
const storyblocksService = require('../services/storyblocks')

router.get('/', async function (req, res, next) {
  const key = req.query.key
  // const images = await searchImages(key)
  // const images = await pixabayService.searchImages(key)
  const images = await storyblocksService.searchImages(key)

  res.json(images)
});

module.exports = router;
