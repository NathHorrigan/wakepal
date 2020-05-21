import { Alert } from 'react-native'
import { format, subWeeks, isAfter } from 'date-fns'

import {
  providers as authProvders,
  logoutAllProviders,
  AuthSession,
} from '@api/auth'
import { WakePalAuthProvider } from '@api/auth/WakePalAuth'
import { trackers } from '@api/fitness'
import { useFitnessTracker } from '@utils/hooks'
import { DailyFitnessRecording } from './reducers/fitness'
import { State } from './reducers'

export const SET_AUTH_SESSION = 'SET_AUTH_SESSION'
export const LOGOUT = 'LOGOUT'
export const SET_USER_ONBOARDED = 'SET_USER_ONBOARDED'
export const SET_INITIAL_FITNESS_DATA = 'SET_INITIAL_FITNESS_DATA'
export const MERGE_FITNESS_DATA = 'MERGE_FITNESS_DATA'
export const UPDATE_CURRENT_METRICS = 'UPDATE_CURRENT_METRICS'
export const SET_SYNC_STATUS = 'SET_SYNC_STATUS'

export const setAuthSession = (providerId: string, session: AuthSession) => {
  return {
    type: SET_AUTH_SESSION,
    provider: providerId,
    session: session,
  }
}

// Logout of main applicatoon
export const logout = () => async (dispatch) => {
  // Logout everything
  logoutAllProviders()
  // Reset State
  dispatch({
    type: LOGOUT,
  })
}

// Login in to the main application with the following provider...
export const loginWithProvider = (providerId: string) => async (dispatch) => {
  try {
    const provider = authProvders[providerId]
    const session = await provider.login()
    // Update state with logged in data
    dispatch(setAuthSession(providerId, session))
  } catch (e) {
    console.log(e)
  }
}

// Login with basic username and password
export const loginWithBasic = (email: string, password: string) => async (
  dispatch
) => {
  const session = await WakePalAuthProvider.getClient().login(email, password)
  dispatch(setAuthSession('wakepal', session))
}

// Allow the user to reconfigure onboarding
export const setUserHasOnboarded = (hasOnboarded: boolean = true) => {
  return {
    type: SET_USER_ONBOARDED,
    hasOnboarded: hasOnboarded,
  }
}

// Update just todays metrics - Used for Water and Weight
export const updateCurrentMetrics = (metrics: DailyFitnessRecording) => {
  return {
    type: UPDATE_CURRENT_METRICS,
    metrics,
  }
}

export const setSyncStatus = (isSyncing: Boolean) => {
  return {
    type: SET_SYNC_STATUS,
    syncing: isSyncing,
  }
}

// Save data from Onboarding Setup
export const setOnboardingData = (
  stepsGoal: number,
  waterIntakeGoal: number,
  currentWeight: number,
  floorsGoal: number,
  caloriesGoal: number,
  trackingMethod: string
) => async (dispatch) => {
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
      if (!session) {
        Alert.alert('An error occured', 'This provider could not authenticate.')
      }

      // Update internal data regarding fitness goals
      dispatch({
        type: SET_INITIAL_FITNESS_DATA,
        stepsGoal,
        waterIntakeGoal,
        currentWeight,
        caloriesGoal,
        floorsGoal,
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

// Sync the last month of activity from tracker
export const syncTracker = (dateStart: Date = new Date()) => async (
  dispatch: any,
  getState: () => State
) => {
  // Set syncing state
  dispatch(setSyncStatus(true))
  // Get the setup fitness tracker
  const state: State = getState()
  const tracker = useFitnessTracker(state)
  // Get the last synced sleep
  const fitnessData = state.fitness.recordings ?? []
  const todayDate = format(dateStart, 'YYYY-MM-DD')
  const latestUpdate = fitnessData[fitnessData.length - 1]
  const lastUpdateDate =
    latestUpdate && isAfter(todayDate, latestUpdate.date)
      ? latestUpdate.date
      : format(subWeeks(dateStart, 4), 'YYYY-MM-DD')
  // Request sleep data between last date and today
  const lastMonthOfFitness = await tracker?.getFitnessData(
    lastUpdateDate,
    todayDate
  )

  if (lastMonthOfFitness) {
    // Update internal datastructure
    return dispatch({
      type: MERGE_FITNESS_DATA,
      data: lastMonthOfFitness,
    })
  }
}

// This is called when the user reaches the end of the recrodings
export const incrementTrackerHistory = () => async (dispatch, getState) => {
  // Get the state
  const state = getState()
  // Get the last date
  const recordings = state.fitness.recordings
  const lastRecording = recordings[0]
  // Sync data back a month from this dare
  return dispatch(syncTracker(lastRecording.date))
}
