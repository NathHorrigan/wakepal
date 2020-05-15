export enum SleepStage {
  Rem = 'REM',
  Deep = 'DEEP',
  Light = 'LIGHT',
  Awake = 'AWAKE',
}

export interface SleepStageSegment {
  stage: SleepStage
  startTime: Date
  endTime: Date
}

export type NightsSleepRecording = Array<SleepStageSegment>

export interface SleepRecoring {
  date: string
  segments: NightsSleepRecording
}
