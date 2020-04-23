import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { providers, AuthSession } from '@api/auth'

export const SET_AUTH_SESSION = 'SET_AUTH_SESSION'
export const LOGOUT = 'LOGOUT'

export const setAuthSession = (providerId: string, session: AuthSession) => {
  return {
    type: SET_AUTH_SESSION,
    provider: providerId,
    session: session,
  }
}

// Logout of main applicatoon
export const logout = () => ({
  type: LOGOUT,
})

// Login in to the main application with the following provider...
export const loginWithProvider = (providerId: string) => async dispatch => {
  try {
    const provider = providers[providerId]
    const session = await provider.login()
    // Update state with logged in data
    dispatch(setAuthSession(providerId, session))
  } catch (e) {
    console.log(e)
  }
}
