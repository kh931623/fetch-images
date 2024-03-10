const R = require('ramda')

const unsplashService = require('./unsplash')
const pixabayService = require('./pixabay')
const storyblocksService = require('./storyblocks')
const { redisClient } = require('../redis')

const searchImageFromCache = async (key) => {
  return redisClient.json.get(key)
}

const setImagesToCache = async (key, values) => redisClient.json.set(key, '$', values)

const searchImages = async (key) => {
  const imagesFromCache = await searchImageFromCache(key)

  if (imagesFromCache) return imagesFromCache

  console.log('ImageSerivce.searchImages: sending req to 3rd parties ...');

  const results = await Promise.all([
    unsplashService.searchImages(key),
    pixabayService.searchImages(key),
    storyblocksService.searchImages(key),
  ]).then(R.flatten)

  await setImagesToCache(key, results)

  return results
}

module.exports = {
  searchImages,
}