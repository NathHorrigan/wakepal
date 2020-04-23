export enum SleepStage {
  Rem = 'REM',
  Deep = 'DEEP',
  Light = 'LIGHT',
  Awake = 'AWAKE',
}

export class MinuteSleepRecording {
  private stage: SleepStage
  private timestamp: Date

  constructor(timestamp: Date, stage: SleepStage) {
    this.stage = stage
    this.timestamp = timestamp
  }

  getStage(): SleepStage {
    return this.stage
  }

  getTimestamp(): Date {
    return this.timestamp
  }
}

export type NightsSleepRecording = Array<MinuteSleepRecording>

export abstract class BaseSleepRecording {
  private date: Date
  private recordings: NightsSleepRecording

  constructor(date: Date, recordings: NightsSleepRecording) {
    this.date = date
    this.recordings = recordings
  }

  getDate(): Date {
    return this.date
  }

  getRecordings(): NightsSleepRecording {
    return this.recordings
  }
}
