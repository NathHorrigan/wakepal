import AppleHealthKit, { HealthValue } from 'rn-apple-healthkit'
import {
  eachDay,
  startOfDay,
  endOfDay,
  addDays,
  format,
  parse,
  differenceInSeconds,
} from 'date-fns'

import { SleepTracker } from './SleepTracker'
import { DailyFitnessRecording } from '@redux/reducers/fitness'

let options = {
  permissions: {
    read: [
      'Weight',
      'Steps',
      'FlightsClimbed',
      'ActiveEnergyBurned',
      'BasalEnergyBurned',
      'SleepAnalysis',
    ],
    write: ['Weight'],
  },
}

interface HealthKitRecording {
  label: string
  value: number
}

// Work in progress
export class HealthKitTracker implements SleepTracker {
  private static client: HealthKitTracker

  static getClient(): HealthKitTracker {
    if (!HealthKitTracker.client) {
      HealthKitTracker.client = new HealthKitTracker()
    }

    return HealthKitTracker.client
  }

  async authenticate(): boolean | Promise<any> {
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        return resolve(true)
      })
    })
  }

  async getSteps(date: Date): Promise<HealthKitRecording> {
    const config = { date: date.toISOString() }
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        AppleHealthKit.getStepCount(
          config,
          (err: string, results: HealthValue) => {
            if (err) {
              reject(err)
            }

            resolve({
              label: 'steps',
              value: results.value,
            })
          }
        )
      })
    })
  }

  async getCalories(date: Date): Promise<HealthKitRecording> {
    const config = {
      startDate: startOfDay(date).toISOString(),
      endDate: endOfDay(date).toISOString(),
    }
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        AppleHealthKit.getBasalEnergyBurned(
          config,
          (err: string, results: HealthValue) => {
            if (err) {
              reject(err)
            }
            resolve({
              label: 'calories',
              value: results.length
                ? results
                    .map(recording => recording.value)
                    .reduce((a, b) => a + b)
                : 0,
            })
          }
        )
      })
    })
  }

  async getFloors(date: Date): Promise<HealthKitRecording> {
    const config = { date: date.toISOString() }
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        AppleHealthKit.getFlightsClimbed(
          config,
          (err: string, results: HealthValue) => {
            if (err) {
              reject(err)
            }
            resolve({
              label: 'floors',
              value: results?.value,
            })
          }
        )
      })
    })
  }

  async getSleep(date: Date): Promise<HealthKitRecording> {
    const config = {
      startDate: startOfDay(date).toISOString(),
      endDate: addDays(date, 1).toISOString(),
    }
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        AppleHealthKit.getSleepSamples(
          config,
          (err: string, results: Object[]) => {
            if (err) {
              reject(err)
            }
            resolve({
              label: 'sleep',
              value: results.map(sleep => {
                const start = parse(sleep.startDate)
                const end = parse(sleep.endDate)
                return {
                  startTime: start,
                  endTime: end,
                  duration: differenceInSeconds(end, start) / 3600,
                  stage: sleep.value === 'INBED' ? 'DEEP' : 'AWAKE',
                }
              }),
            })
          }
        )
      })
    })
  }

  async getWeight(date: Date): Promise<HealthKitRecording> {
    const config = {
      unit: 'gram',
      startDate: startOfDay(date).toISOString(),
      endDate: endOfDay(date).toISOString(),
      limit: 1,
    }
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(options, err => {
        if (err) {
          return reject(err)
        }

        AppleHealthKit.getWeightSamples(
          config,
          (err: string, results: Object[]) => {
            if (err) {
              reject(err)
            }

            resolve({
              label: 'weight',
              value: results.length ? results[0].value / 1000 : 0,
            })
          }
        )
      })
    })
  }

  async getRecordingAt(date: Date) {
    try {
      let dailyRecording: DailyFitnessRecording = {
        date: format(date, 'YYYY-MM-DD'),
        sleep: [],
        weight: 0,
        waterIntake: 0,
        steps: 0,
        calories: 0,
        floors: 0,
        lastUpdated: new Date(),
      }
      const self = HealthKitTracker.getClient()
      // Get each metric from HealthKit
      const metrics = await Promise.all([
        await self.getSleep(date),
        await self.getCalories(date),
        await self.getFloors(date),
        await self.getSteps(date),
        await self.getWeight(date),
      ])
      // Merge the metrics and daily recording
      metrics.map((metric: HealthKitRecording) => {
        dailyRecording[metric.label] = metric.value ?? 0
      })

      return dailyRecording
    } catch (e) {
      console.log(e)
    }
    return null
  }

  async getFitnessData(
    start: Date,
    end: Date
  ): Promise<DailyFitnessRecording[]> {
    // return await
    return await Promise.all(await eachDay(start, end).map(this.getRecordingAt))
  }
}
