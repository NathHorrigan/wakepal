import { Alert } from 'react-native'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { providers as authProvders, AuthSession } from '@api/auth'
import { trackers } from '@api/fitness'

export const SET_AUTH_SESSION = 'SET_AUTH_SESSION'
export const LOGOUT = 'LOGOUT'
export const SET_USER_ONBOARDED = 'SET_USER_ONBOARDED'
export const SET_INITIAL_FITNESS_DATA = 'SET_INITIAL_FITNESS_DATA'

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
    const provider = authProvders[providerId]
    const session = await provider.login()
    // Update state with logged in data
    dispatch(setAuthSession(providerId, session))
  } catch (e) {
    console.log(e)
  }
}

export const setUserHasOnboarded = (hasOnboarded: boolean = true) => {
  return {
    type: SET_USER_ONBOARDED,
    hasOnboarded: hasOnboarded,
  }
}

export const setOnboardingData = (
  stepsGoal: number,
  waterIntakeGoal: number,
  weightGoal: number,
  trackingMethod: string
) => dispatch => {
  // Authenticate the user suing the chosen tracking method
  const fitnessProvider = trackers[trackingMethod]

  // Check provider is implemented
  if (fitnessProvider == null) {
    Alert.alert(
      'An error occured',
      'This provider has not been implemented yet.'
    )
    return
  }

  // Contain the activation of tracker in function
  const activateTracker = async () => {
    try {
      const session = await fitnessProvider.authenticate()
      // Don't proceed if provider authentication fails
      if (!session) return

      // Update internal data regarding fitness goals
      dispatch({
        type: SET_INITIAL_FITNESS_DATA,
        stepsGoal,
        waterIntakeGoal,
        weightGoal,
        trackingMethod,
      })

      // Move away from onboaridng screem
      dispatch(setUserHasOnboarded(true))
    } catch (e) {
      console.log(e)
    }
  }

  // Alert user if provider lacks some functionality
  if (fitnessProvider.getLimitiations) {
    Alert.alert('Please Note', fitnessProvider.getLimitiations(), [
      { text: 'Cancel' },
      { text: 'Confirm Tracker', onPress: activateTracker },
    ])
  } else {
    activateTracker()
  }
}
