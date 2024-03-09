const axios = require('axios').default
const R = require('ramda')

const client = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
  }
})

const getTagsFromImage = R.pipe(
  R.propOr([], 'tags'),
  R.map(R.prop('title'))
)

const formatImage = (image) => {
  return {
    image_ID: image.id,
    thumbnails: image.urls.thumb,
    previews: image.urls.regular,
    title: image.alt_description,
    source: 'Unsplash',
    tags: getTagsFromImage(image)
  }
}

const formatRes = R.pipe(
  R.pathOr([], [
    'data',
    'results'
  ]),
  R.map(formatImage)
)

const searchImages = async (key) => {
  try {
    const res = await client.get('/search/photos', {
      params: {
        query: key
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