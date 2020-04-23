import { getDate } from 'date-fns'
import { FitnessTracker } from '@api/fitness'
import { SET_INITIAL_FITNESS_DATA, LOGOUT } from '@redux/actions'

// Types for the data object for how we use
export interface FitnessGoals {
  stepsGoal: number
  waterIntakeGoal: number
}

export interface DailyFitnessRecording {
  weight: number
  waterIntake: number
  steps: number
  date: Date
  lastUpdated: Date
}

export interface FitnessState {
  trackingMethod?: FitnessTracker
  goals?: FitnessGoals
  recordings: DailyFitnessRecording[]
}

// The inital state, I.e When app first opens
const initial: FitnessState = {
  goals: undefined,
  trackingMethod: undefined,
  recordings: [],
}

// Update the state object as actions are dispatched...
export function fitnessReducer(state: Object, action: any) {
  switch (action.type) {
    case SET_INITIAL_FITNESS_DATA:
      const {
        stepsGoal,
        waterIntakeGoal,
        currentWeight,
        trackingMethod,
      } = action
      return {
        trackingMethod,
        goals: {
          stepsGoal,
          waterIntakeGoal,
        },
        recordings: [
          {
            steps: 0,
            waterIntake: 0,
            weight: currentWeight,
            date: getDate(Date.now()),
            lastUpdated: Date.now(),
          },
        ],
      }

    case LOGOUT:
      return initial
  }

  return state || initial
}
