const axios = require('axios').default

const client = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
  }
})

const searchImages = async (key) => {
  try {
    const res = await client.get('/search/photos', {
      params: {
        query: key
      }
    })

    return res.data
  } catch (error) {
    console.error(error);
    return []
  }
}

module.exports = {
  searchImages,
}