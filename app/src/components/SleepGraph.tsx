import React, { SFC } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import differenceInHours from 'date-fns/difference_in_hours'
import addHours from 'date-fns/add_hours'

import { SleepStage } from '@api/sleep/SleepRecording'
import { colors, fonts } from '@utils/theme'

interface SleepStageSegment {
  stage: SleepStage
  startTime: Date
  endTime: Date
}

interface SleepGraphProps {
  segments: SleepStageSegment[]
}

const SleepGraph: React.SFC<SleepGraphProps> = ({ segments }) => {
  const timespan = generateTimeline(segments)
  const stageColors = [
    colors.darkBlue,
    colors.blue,
    colors.paleBlue,
    colors.paleGreen,
  ]

  const sortSegment = (stage: SleepStage) =>
    segments.filter(segment => segment.stage === stage)

  const sortedSegements = {
    Rem: sortSegment(SleepStage.Rem),
    Deep: sortSegment(SleepStage.Deep),
    Light: sortSegment(SleepStage.Light),
    Awake: sortSegment(SleepStage.Awake),
  }

  const stages = Object.keys(sortedSegements)
  const { awakeHours, asleepHours, efficiency } = getSleepSummary(segments)

  return (
    <GraphContainer>
      <LabelRow>
        {stages.map((stage, index) => (
          <StageKey key={`${stage}-key`}>
            <StageDot color={stageColors[index]} />
            <StageLabel>{stage}</StageLabel>
          </StageKey>
        ))}
      </LabelRow>
      {stages.map((stage, index) => (
        <StageRow key={`${stage}-row`}>
          {sortedSegements[stage].map(segment => (
            <StageBar
              key={`${stage}-${index}-bar`}
              color={stageColors[index]}
              {...getSegementSpan(segment, timespan)}
            />
          ))}
          <StageTrace />
        </StageRow>
      ))}
      <Timeline>
        {timespan.map(hour => (
          <Hour key={`hour-${hour}`}>{hour}</Hour>
        ))}
      </Timeline>

      <SummaryContainer>
        <SleepSummary>
          <SummaryValueText color={colors.paleBlue}>
            {asleepHours}
          </SummaryValueText>
          <SummayLabelText>Hours Asleep</SummayLabelText>
        </SleepSummary>
        <SleepSummary>
          <SummaryValueText color={colors.paleGreen}>
            {awakeHours}
          </SummaryValueText>
          <SummayLabelText>Hours Awake</SummayLabelText>
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

const getSleepSummary = (segments: SleepStageSegment[]) => {
  let segmentHours = segments.map(({ startTime, endTime, stage }) => ({
    stage,
    duration: differenceInHours(endTime, startTime),
  }))

  let calculateHours = filterFn =>
    segmentHours
      .filter(filterFn)
      .map(segment => segment.duration)
      .reduce((a, b) => a + b)

  const awakeHours = calculateHours(
    segment => segment.stage === SleepStage.Awake
  )
  const asleepHours = calculateHours(
    segment => segment.stage !== SleepStage.Awake
  )
  const efficiency = Math.ceil((asleepHours / (awakeHours + asleepHours)) * 100)

  return {
    awakeHours,
    asleepHours,
    efficiency,
  }
}

const getSegementSpan = (
  segment: SleepStageSegment,
  timeline: string[]
): number[] => {
  const { startTime, endTime } = segment
  const numTimeline = timeline.map(hour => Number(hour))

  // Calculate the positions of where each timeline starts
  const startHour = numTimeline.indexOf(startTime.getHours())
  const endHour = numTimeline.indexOf(endTime.getHours())
  const screenWidth = Dimensions.get('window').width
  const percentage = screenWidth / (numTimeline.length - 1)

  // Covert to percentage and add margins of 20px each side
  const startLeft = Math.max(10, startHour * percentage)
  const endRight = Math.min(screenWidth - 10, endHour * percentage)

  return {
    width: endRight - startLeft,
    left: startLeft,
    right: endRight,
  }
}

const generateTimeline = (segments: SleepStageSegment[]): string[] => {
  // Start and finish of sleep
  const startTime = segments[0].startTime
  const endTime = segments[segments.length - 1].endTime
  // How long their asleep
  const hourDiff = differenceInHours(endTime, startTime)
  // Generate array of hours, For example [19, 20, 21, ..., 09, 10]
  return Array(hourDiff + 1)
    .fill(0)
    .map((_, index) =>
      addHours(startTime, index)
        .getHours()
        .toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
    )
}

export default SleepGraph
