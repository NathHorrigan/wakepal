import { combineReducers } from 'redux'

import { authenticationReducer, AuthenticationState } from './authentication'
import { fitnessReducer, FitnessState } from './fitness'

export interface State {
  authentication: AuthenticationState
  fitness: FitnessState
}

export default combineReducers({
  authentication: authenticationReducer,
  fitness: fitnessReducer,
})
