const axios = require('axios').default
const R = require('ramda')

const client = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: process.env.PIXABAY_API_KEY
  }
})

const getTagsFromImage = R.pipe(
  R.propOr('', 'tags'),
  R.split(','),
  R.map(R.trim),
)

const formatImage = (image) => {
  return {
    image_ID: image.id,
    thumbnails: image.previewURL,
    preview: image.webformatURL,
    title: '',
    source: 'Pixabay',
    tags: getTagsFromImage(image)
  }
}

const formatRes = R.pipe(
  R.pathOr([], [
    'data',
    'hits'
  ]),
  R.map(formatImage)
)

const searchImages = async (key) => {
  try {
    const res = await client.get('/', {
      params: {
        q: key
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