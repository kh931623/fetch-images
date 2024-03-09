const imageService = require('../services/image')

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!"
  },
  test: () => {
    return {
      name: 'Simon',
      age: 25,
    }
  },
  images: async ({ key }) => {
    return imageService.searchImages(key)
  }
}

module.exports = root