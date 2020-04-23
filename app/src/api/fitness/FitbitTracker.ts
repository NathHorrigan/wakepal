import { SleepTracker } from './SleepTracker'
import { BaseSleepRecording } from './SleepRecording'
import { FitbitAuthProvider } from '@api/auth/FitbitAuth'

export class FitbitSleepRecording extends BaseSleepRecording {}

export class FitbitTracker implements SleepTracker {
  private static client: FitbitTracker

  static getClient(): FitbitTracker {
    if (!FitbitTracker.client) {
      FitbitTracker.client = new FitbitTracker()
    }

    return FitbitTracker.client
  }

  async authenticate(): boolean {
    const session = await FitbitAuthProvider.login()
    return !!session
  }
}
