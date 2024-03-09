const crypto = require('crypto')

const axios = require('axios').default
const R = require('ramda')

const PRIVATE_KEY = process.env.STORYBLOCKS_PRIVATE_KEY

const client = axios.create({
  baseURL: 'https://api.graphicstock.com',
  params: {
    APIKEY: process.env.STORYBLOCKS_PUBLIC_KEY,
    user_id: '1',
    project_id: '1',
  }
})

const formatImage = (image) => {
  return {
    image_ID: image.id,
    thumbnails: image.thumbnail_url,
    preview: image.preview_url,
    title: image.title,
    source: 'Storyblocks',
    tags: []
  }
}

const formatRes = R.pipe(
  R.pathOr([], [
    'data',
    'results'
  ]),
  R.map(formatImage)
)

const generateHmac = (key, text) => {
  const hmacBuilder = crypto.createHmac('sha256', key);
  hmacBuilder.update(text);
  return hmacBuilder.digest('hex');
}

const searchImages = async (key) => {
  const endpoint = '/api/v2/images/search'
  const expires = Math.floor(Date.now() / 1000) + 100
  const hmac = generateHmac(PRIVATE_KEY + expires, endpoint)

  try {
    const res = await client.get(endpoint, {
      params: {
        EXPIRES: expires,
        HMAC: hmac,
        keywords: key
      }
    })

    return formatRes(res)
  } catch (error) {
    console.error(error);
    return []
  }
}

module.exports = {
  searchImages,
}