import { FitbitTracker } from './FitbitTracker'

export enum FitnessTracker {
  HealthKit = 'healthkit',
  GoogleFit = 'googlefit',
  Fitbit = 'fitbit',
}

export const trackers = {
  fitbit: FitbitTracker.getClient(),
  googlefit: null,
  healthkit: null,
}
