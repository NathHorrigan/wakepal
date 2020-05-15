import { addSeconds, eachDay, format } from 'date-fns'
import { SleepTracker } from './SleepTracker'
import { SleepRecording } from './SleepRecording'
import { SleepStage, SleepStageSegment } from './SleepRecording'
import { FitbitAuthProvider } from '@api/auth/FitbitAuth'

export class FitbitTracker implements SleepTracker {
  private static client: FitbitTracker

  static getClient(): FitbitTracker {
    if (!FitbitTracker.client) {
      FitbitTracker.client = new FitbitTracker()
    }

    return FitbitTracker.client
  }

  async authenticate(): boolean {
    return await FitbitAuthProvider.getClient().login()
  }

  async revoke() {
    await FitbitAuthProvider.getClient().logout()
  }

  async createRequest(url: string) {
    const session = await FitbitAuthProvider.getClient().getSession()
    if (!session) return Promise.reject('No session')
    return await fetch(
      `https://api.fitbit.com/1.2/user/${session.userId}/${url}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${session.accessToken}`,
        }),
      }
    )
  }

  classifyFitbitStage(stageId: string): SleepStage {
    switch (stageId) {
      // Support for classic recordings
      case 'awake':
        return SleepStage.Awake

      case 'restless':
        return SleepStage.Light

      case 'asleep':
        return SleepStage.Deep

      // Support for more indepth stage recordings
      case 'wake':
        return SleepStage.Awake

      case 'light':
        return SleepStage.Light

      case 'deep':
        return SleepStage.Deep

      case 'rem':
        return SleepStage.Deep
    }

    return SleepStage.Awake
  }

  parseFitbitSleepToSegments(sleepRecording): SleepStageSegment[] {
    return sleepRecording.map(segment => ({
      id: `${segment.dateTime}`,
      stage: this.classifyFitbitStage(segment.level),
      startTime: new Date(segment.dateTime),
      endTime: addSeconds(new Date(segment.dateTime), segment.seconds),
      duration: segment.seconds / 3600,
    }))
  }

  async getSleepData(
    dateStart: string,
    dateEnd?: string
  ): Promise<SleepRecording[]> {
    try {
      // Requesr data from fitbit
      const urlSuffix = dateEnd ? `/${dateEnd}` : ''
      const req = await this.createRequest(
        `sleep/date/${dateStart}${urlSuffix}.json`
      )
      const res = await req.json()
      // Serialize data to WakePal format
      const sleepData = res.sleep
        ?.filter(sleep => sleep.isMainSleep)
        .map(sleep => {
          return {
            date: sleep.dateOfSleep,
            segments: this.parseFitbitSleepToSegments(sleep.levels.data),
          }
        })
      // Return for use in graph
      return sleepData
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async getActivityData(
    activities: string[],
    dateStart: string,
    dateEnd?: string
  ) {
    // Data ordered by type
    const activityData = {}
    // Resolve each activity type to data between two dates
    const rawData = await Promise.all(
      activities.map(async activity => {
        // Requesr data from fitbit
        const urlSuffix = dateEnd ? `/${dateEnd}` : ''
        const req = await this.createRequest(
          `${activity}/date/${dateStart}${urlSuffix}.json`
        )
        // Covert data to json format
        const res = await req.json()
        // Extract activity type from string
        const type: string = activity.match(/activities\/(.*)/)[1] ?? ''
        return {
          type,
          data: res[`activities-${type}`],
        }
      })
    )
    // Convert from array to type object
    rawData.forEach(({ type, data }) => (activityData[type] = data))
    return activityData
  }

  // Stitch each activity array into an array of days
  stitchFitnessData(data: any, dateStart: string, dateEnd?: string) {
    const startDate = new Date(dateStart)
    const endDate = dateEnd ? new Date(dateEnd) : startDate
    // Get all the dates in the range
    const datesBetween = eachDay(startDate, endDate).map(date =>
      format(date, 'YYYY-MM-DD')
    )
    // Create a collection of data for each date
    const dailyRecords = datesBetween.map(date => {
      const getData = (data: any) =>
        data?.find(({ dateTime: matchDate }) => matchDate == date).value
      return {
        date,
        sleep: data.sleep?.find(({ date: matchDate }) => matchDate == date)
          ?.segments,
        steps: getData(data.steps),
        floors: getData(data.floors),
        calories: getData(data.calories),
      }
    })

    return dailyRecords
  }

  async getFitnessData(dateStart: string, dateEnd?: string) {
    try {
      // Get each individual activity data
      const sleep = await this.getSleepData(dateStart, dateEnd)
      const physical = await this.getActivityData(
        ['activities/steps', 'activities/floors', 'activities/calories'],
        dateStart,
        dateEnd
      )
      // Sticth each activity into a daily record
      const fitnessData = this.stitchFitnessData(
        {
          sleep,
          ...physical,
        },
        dateStart,
        dateEnd
      )

      return fitnessData
    } catch (e) {
      console.log(e)
      return []
    }
  }
}
