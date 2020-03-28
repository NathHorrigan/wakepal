import { BaseSleepRecording } from './SleepRecording'

export interface SleepTracker {
  getLatestRecording(): BaseSleepRecording
  getRecordingAt(date: Date): BaseSleepRecording
  getRecordingsBetween(start: Date, end: Date): BaseSleepRecording[]
  getAllRecordings(start: Date, end: Date): BaseSleepRecording[]
}
