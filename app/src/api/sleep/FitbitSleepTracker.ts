import { SleepTracker } from './SleepTracker'
import { BaseSleepRecording } from './SleepRecording'

export class FitbitSleepRecording extends BaseSleepRecording {}

export class FitbitSleepTracker implements SleepTracker {
  private static client: FitbitSleepTracker

  static getClient(): FitbitSleepTracker {
    if (!FitbitSleepTracker.client) {
      FitbitSleepTracker.client = new FitbitSleepTracker()
    }

    return FitbitSleepTracker.client
  }
}
