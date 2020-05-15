import { FitbitTracker } from './FitbitTracker'
import { HealthKitTracker } from './HealthKitTracker'

export enum FitnessTracker {
  HealthKit = 'healthkit',
  GoogleFit = 'googlefit',
  Fitbit = 'fitbit',
}

export const trackers = {
  fitbit: FitbitTracker.getClient(),
  googlefit: HealthKitTracker.getClient(),
  healthkit: HealthKitTracker.getClient(),
}

export { SleepRecoring } from './SleepRecording'
