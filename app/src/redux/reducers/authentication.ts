import { AuthSession } from '@api/auth'
import { SET_AUTH_SESSION, SET_USER_ONBOARDED, LOGOUT } from '@redux/actions'

// Here we store 3rd party auth providers for future use
type AuthProviderStorage = Object

// Types for the data object for how we use
interface AuthenticationState {
  userOnboarded: boolean
  userAuthenticated: boolean
  userProvider: string | null
  userSession: AuthSession | null
  authProviders: AuthProviderStorage
}

// The inital state, I.e When app first opens
const initial: AuthenticationState = {
  userOnboarded: false,
  userAuthenticated: false,
  userProvider: null,
  userSession: null,
  authProviders: {},
}

// Update the state object as actions are dispatched...
export function authenticationReducer(state: Object, action: any) {
  switch (action.type) {
    case SET_AUTH_SESSION:
      return {
        ...state,
        userAuthenticated: true,
        userProvider: action.provider,
        userSession: action.session,
      }

    case SET_USER_ONBOARDED:
      return {
        ...state,
        userOnboarded: action.hasOnboarded,
      }

    case LOGOUT:
      return initial
  }

  return state || initial
}
