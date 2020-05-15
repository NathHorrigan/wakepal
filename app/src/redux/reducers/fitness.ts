import { format, isToday } from 'date-fns'
import { FitnessTracker, trackers } from '@api/fitness'
import {
  SET_INITIAL_FITNESS_DATA,
  MERGE_FITNESS_DATA,
  UPDATE_CURRENT_METRICS,
  SET_SYNC_STATUS,
  LOGOUT,
} from '@redux/actions'
import _ from 'lodash'
import { useFitnessTracker } from '@utils/hooks'
import { SleepStageSegment } from '@api/fitness/SleepRecording'

// Types for the data object for how we use
export interface FitnessGoals {
  stepsGoal: number
  waterIntakeGoal: number
  floorsGoal: number
  caloriesGoal: number
}

export interface DailyFitnessRecording {
  weight: number
  waterIntake: number
  steps: number
  date: string
  calories: number
  floors: number
  lastUpdated: Date
  sleep: SleepStageSegment[]
}

export interface FitnessState {
  trackingMethod?: FitnessTracker
  goals?: FitnessGoals
  recordings: DailyFitnessRecording[]
  syncInProgress: Boolean
}

// The inital state, I.e When app first opens
export const initial: FitnessState = {
  goals: undefined,
  trackingMethod: undefined,
  recordings: [],
  syncInProgress: false,
}

// Update the state object as actions are dispatched...
export function fitnessReducer(state: FitnessState, action: any) {
  switch (action.type) {
    case SET_INITIAL_FITNESS_DATA:
      const {
        stepsGoal,
        waterIntakeGoal,
        caloriesGoal,
        floorsGoal,
        currentWeight,
        trackingMethod,
      } = action
      return {
        ...state,
        trackingMethod,
        goals: {
          stepsGoal,
          waterIntakeGoal,
          caloriesGoal,
          floorsGoal,
        },
        recordings: [
          {
            sleep: [],
            steps: 0,
            waterIntake: 0,
            weight: currentWeight,
            date: format(Date.now(), 'YYYY-MM-DD'),
            lastUpdated: new Date(),
          },
        ],
      }

    case MERGE_FITNESS_DATA:
      // If empty array then quit
      if (!action.data || !action.data.length) return state
      // Merge the two datastreams by date
      const mergedData = _.merge(
        _.keyBy(state.recordings, 'date'),
        _.keyBy(action.data, 'date')
      )
      // Sort the data
      const mergedRecordings = _.values(mergedData)
        .filter(a => a !== null)
        .sort(
          (a: DailyFitnessRecording, b: DailyFitnessRecording) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      // Return the new state
      return {
        ...state,
        syncInProgress: false,
        recordings: mergedRecordings,
      }

    case UPDATE_CURRENT_METRICS:
      // Check if the latest recordings is today
      let latestRecording = state.recordings[state.recordings.length - 1]
      if (isToday(latestRecording.date)) {
        // Get all the recordings we aren't updating
        const pastRecordings = state.recordings.slice(
          0,
          state.recordings.length - 1
        )
        // Merge the existing recording and the new data
        latestRecording = {
          ...latestRecording,
          ...action.metrics,
          lastUpdated: new Date(),
        }
        // Merge the updated recrordings and the untouched recordings
        return {
          ...state,
          recordings: pastRecordings.concat(latestRecording),
        }
      } else {
        // Find the last weight recording
        const lastWeight = state.recordings
          .reverse()
          .find(recording => !!recording.weight)
        // Create a new recording for today
        const newRecording: DailyFitnessRecording = {
          weight: lastWeight,
          waterIntake: 0,
          date: format(Date.now(), 'YYYY-MM-DD'),
          lastUpdated: new Date(),
          sleep: [],
          steps: 0,
          ...action.metrics,
        }
        // Merge the new recrording and the untouched recordings
        return {
          ...state,
          recordings: state.recordings.concat(newRecording),
        }
      }

    case SET_SYNC_STATUS:
      return {
        ...state,
        syncInProgress: !!action.syncing,
      }

    case LOGOUT:
      // Reset the internal fitness cache
      return initial
  }

  return state || initial
}
