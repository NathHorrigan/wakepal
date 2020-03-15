// Mock functions to make tests work in node env
global.fetch = require('node-fetch')
global.navigator = {
  geolocation: {
    getCurrentPosition: (resolve, reject, config) =>
      resolve({
        latitude: 50.368168,
        longitude: -4.125115,
      }),
  },
}
