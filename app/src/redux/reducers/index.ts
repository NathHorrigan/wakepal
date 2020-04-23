import { combineReducers } from 'redux'

import { authenticationReducer } from './authentication'
import { fitnessReducer } from './fitness'

export default combineReducers({
  authentication: authenticationReducer,
  fitness: fitnessReducer,
})
