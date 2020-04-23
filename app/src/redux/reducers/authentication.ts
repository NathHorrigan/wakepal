import { AuthSession } from '@api/auth'
import { SET_AUTH_SESSION, LOGOUT } from '@redux/actions'

// Here we store 3rd party auth providers for future use
type AuthProviderStorage = Object

// Types for the data object for how we use
interface AuthenticationState {
  userAuthenticated: boolean
  userProvider: string | null
  userSession: AuthSession | null
  authProviders: AuthProviderStorage
}

const initial: AuthenticationState = {
  userAuthenticated: false,
  userProvider: null,
  userSession: null,
  authProviders: {},
}

export function authenticationReducer(state: Object, action: any) {
  switch (action.type) {
    case SET_AUTH_SESSION:
      console.log(action)
      return {
        ...state,
        userAuthenticated: true,
        userProvider: action.provider,
        userSession: action.session,
      }

    case LOGOUT:
      return initial
  }

  return state || initial
}
