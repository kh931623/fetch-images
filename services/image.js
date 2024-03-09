const R = require('ramda')

const unsplashService = require('./unsplash')
const pixabayService = require('./pixabay')
const storyblocksService = require('./storyblocks')

const searchImages = async (key) => {
  return Promise.all([
    unsplashService.searchImages(key),
    pixabayService.searchImages(key),
    storyblocksService.searchImages(key),
  ]).then(R.flatten)
}

module.exports = {
  searchImages,
}