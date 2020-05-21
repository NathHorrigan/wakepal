import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

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

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
jest.mock('@react-native-community/google-signin', () => {})
jest.mock('@invertase/react-native-apple-authentication', () => {})
jest.mock('rn-apple-healthkit', () => {})
jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: (resolve, reject) => {
    return resolve({
      coords: {
        latitude: 50.368168,
        longitude: -4.125115,
      }
    })
  }
}))
