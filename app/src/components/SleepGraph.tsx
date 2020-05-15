import React, { SFC } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { differenceInSeconds, differenceInHours, addHours } from 'date-fns'

import { SleepStage, SleepStageSegment } from '@api/fitness/SleepRecording'
import { colors, fonts } from '@utils/theme'

interface SleepGraphProps {
  segments: SleepStageSegment[]
}

const SleepGraph: React.SFC<SleepGraphProps> = ({ segments }) => {
  // Generate timespan object between falling asleep and waking up
  const timespan = generateTimeline(segments)
  const timespanLabels = timespan.map(hour =>
    hour.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  )
  // Organize graph by colar
  const stageColors = {
    Rem: colors.darkBlue,
    Deep: colors.blue,
    Light: colors.paleBlue,
    Awake: colors.paleGreen,
  }
  // Sort sleep recordings into categories
  const sortSegment = (stage: SleepStage) =>
    segments.filter(segment => segment.stage === stage)
  // Apply sorting fn
  const sortedSegements = {
    Rem: sortSegment(SleepStage.Rem),
    Deep: sortSegment(SleepStage.Deep),
    Light: sortSegment(SleepStage.Light),
    Awake: sortSegment(SleepStage.Awake),
  }
  // Get all populated traces
  const stages = Object.keys(sortedSegements)
  const {
    awakeTime,
    awakeUnits,
    asleepTime,
    asleepUnits,
    efficiency,
  } = getSleepSummary(segments)

  return (
    <GraphContainer>
      <LabelRow>
        {stages.map(stage => (
          <StageKey key={`${stage}-key`}>
            <StageDot color={stageColors[stage]} />
            <StageLabel>{stage}</StageLabel>
          </StageKey>
        ))}
      </LabelRow>
      {stages.map((stage, index) => (
        <StageRow key={`${stage}-row`}>
          {sortedSegements[stage].map(segment => (
            <StageBar
              key={`${segment.id}-bar`}
              color={stageColors[stage]}
              applyMinWidth={stage == 'Awake'}
              {...getSegementSpan(segment, timespan)}
            />
          ))}
          <StageTrace />
        </StageRow>
      ))}
      <Timeline>
        {timespanLabels.map(hour => (
          <Hour key={`hour-${hour}`}>{hour}</Hour>
        ))}
      </Timeline>

      <SummaryContainer>
        <SleepSummary>
          <SummaryValueText color={colors.paleBlue}>
            {asleepTime}
          </SummaryValueText>
          <SummayLabelText>{asleepUnits} Asleep</SummayLabelText>
        </SleepSummary>
        <SleepSummary>
          <SummaryValueText color={colors.paleGreen}>
            {awakeTime}
          </SummaryValueText>
          <SummayLabelText>{awakeUnits} Awake</SummayLabelText>
        </SleepSummary>
        <SleepSummary>
          <SummaryValueText color={colors.coral}>{efficiency}</SummaryValueText>
          <SummayLabelText>Sleep Efficiency</SummayLabelText>
        </SleepSummary>
      </SummaryContainer>
    </GraphContainer>
  )
}

const GraphContainer = styled.View`
  max-width: 100%;
`

const LabelRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StageKey = styled(LabelRow)`
  margin: 20px 7px;
`

const StageDot = styled.View`
  height: 6px;
  width: 6px;
  border-radius: 7px;
  margin-right: 5px;
  background: ${props => props.color};
`

const StageLabel = styled.Text`
  color: #999999;
  font-size: 9px;
  font-family: ${fonts.medium};
`

const StageRow = styled.View`
  height: 7px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`

const StageTrace = styled.View`
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
  z-index: -1;
`

const StageBar = styled.View`
  height: 7px;
  width: ${props => props.width}px;
  min-width: ${props => (props.applyMinWidth ? 5 : 1)}px;
  background: ${props => props.color};
  border-radius: 7px;
  position: absolute;

  left: ${props => props.left}px;
  right: ${props => props.right}px;
`

const Timeline = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  padding: 0 10px;
`

const Hour = styled.Text`
  font-size: 7px;
  font-family: ${fonts.bold};
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
`

const SummaryContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 35px;
`

const SleepSummary = styled.View`
  display: flex;
  align-items: center;
`

const SummaryValueText = styled.Text`
  font-size: 25px;
  font-family: ${fonts.bold};
  color: ${props => props.color};
  text-align: center;
`

const SummayLabelText = styled.Text`
  font-size: 11px;
  font-family: ${fonts.medium};
  color: #9e9e9e;
  text-align: center;
`

// Convert 2.5 hours to 2:30 (string)
const convertToTimeFormat = (hours: number): string => {
  const hour = Math.floor(hours)
  const mins = Math.ceil((hours % hour) * 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  return `${hour}:${mins}`
}

export const getSleepSummary = (segments: SleepStageSegment[]) => {
  // Allow for an empty array to be passed
  if (!segments.length) {
    return {
      awakeTime: 0,
      awakeUnits: 'Hours',
      asleepTime: 0,
      asleepUnits: 'Hours',
      efficiency: 0,
    }
  }
  // Calculate Hours in session
  let calculateHours = filterFn =>
    segments
      .filter(filterFn)
      .map(segment => segment.duration)
      .reduce((a, b) => a + b)

  // Total time in bed
  const duration = segments
    .map(segment => segment.duration)
    .reduce((a, b) => a + b)
  // How long were they asleep
  const asleepHours = calculateHours(
    segment => segment.stage !== SleepStage.Awake
  )
  // Easily calculation to find awake time
  const awakeHours = duration - asleepHours

  // Units for wake/sleep time (Hours vs Mins)
  const awakeTime =
    awakeHours > 1
      ? convertToTimeFormat(awakeHours)
      : Math.ceil(awakeHours * 60)
  const awakeUnits = awakeHours > 1 ? 'Hours' : 'Mins'
  const asleepTime =
    asleepHours > 1 ? convertToTimeFormat(asleepHours) : asleepHours * 60
  const asleepUnits = asleepHours > 1 ? 'Hours' : 'Mins'

  // Percentae of asleep vs awake
  const efficiency = Math.floor((asleepHours / duration) * 100)

  return {
    awakeTime,
    awakeUnits,
    asleepTime,
    asleepUnits,
    efficiency,
  }
}

function roundMinutes(date: Date) {
  date.setHours(date.getHours())
  date.setMinutes(0, 0, 0) // Resets also seconds and milliseconds
  return date
}

const getSegementSpan = (
  segment: SleepStageSegment,
  timeline: string[]
): number[] => {
  const { startTime } = segment
  // Calculate width of line on graph
  const screenWidth = Dimensions.get('window').width - 20
  const hourToPixelRatio = (screenWidth - 6) / (timeline.length - 1)
  const width = hourToPixelRatio * segment.duration
  // Get beginning of timeline
  const begining = timeline[0]
  // Calculate offset to left of screen
  const hourOffset = differenceInSeconds(startTime, begining) / 3600
  // Convert width + offset to bounds on graph
  const left = hourOffset * hourToPixelRatio + 3 + 10
  const right = left + width

  return {
    width,
    left,
    right,
  }
}

const generateTimeline = (segments: SleepStageSegment[]): Date[] => {
  // Start and finish of sleep
  if (segments.length) {
    const startTime = roundMinutes(new Date(segments[0].startTime))
    const endTime = new Date(segments[segments.length - 1].endTime)
    // How long their asleep
    const hourDiff = differenceInHours(endTime, startTime) + 2
    // Generate array of hours, For example [19, 20, 21, ..., 09, 10]
    return Array(hourDiff)
      .fill(0)
      .map((_, index) => addHours(startTime, index))
  }

  return []
}

export default SleepGraph
