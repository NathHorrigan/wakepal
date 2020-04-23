import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// Configure how we will store state between app openings...
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

// Create a persitable reducer instance
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Retrun persitor and redux store to root providers
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
