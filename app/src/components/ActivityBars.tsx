import React, { SFC } from 'react'
import styled from 'styled-components/native'
import { colors, fonts } from '@utils/theme'

interface ActivityBarProps {
  label: string
  value: number
  goal: number
  color: string
  unit?: string
}

interface ActivityBarsProps {
  activities: ActivityBarProps[]
}

export const ActivityBar: React.SFC<ActivityBarProps> = ({
  value,
  goal,
  color,
}) => {
  const width = Math.min(100, (value / goal) * 100)
  return (
    <Activity>
      <ActivityBarOuter>
        <ActivityBarInner color={color} value={width} />
      </ActivityBarOuter>
    </Activity>
  )
}

export const ActivityBars: React.SFC<ActivityBarsProps> = ({ activities }) => {
  return (
    <BarsContainer>
      <LabelColumn>
        {activities.map(({ label }) => (
          <ActivityName key={`${label}-label`}>{label}</ActivityName>
        ))}
      </LabelColumn>
      <BarsColumn>
        {activities.map(activity => (
          <ActivityBar key={`${activity.label}-bar`} {...activity} />
        ))}
      </BarsColumn>
      <StatsColumn>
        {activities.map(({ label, value, goal, unit }) => (
          <ActivityStats key={`${label}-stat`}>
            {value}/{goal} {unit}
          </ActivityStats>
        ))}
      </StatsColumn>
    </BarsContainer>
  )
}

const BarsContainer = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const Activity = styled.View`
  height: 10px;
  margin-bottom: 8px;
`

const LabelColumn = styled.View`
  display: flex;
  justify-content: flex-start;
  margin-top: 2px;
`

const BarsColumn = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  margin-top: 8px;
`

const StatsColumn = styled.View`
  display: flex;
  margin-top: 5px;
  justify-content: flex-start;
`

const ActivityName = styled.Text`
  color: #4e4e4e;
  font-size: 12px;
  font-family: ${fonts.bold};
  margin-right: 15px;
  margin-bottom: 4px;
`

const ActivityStats = styled.Text`
  color: #9e9e9e;
  font-size: 10px;
  font-family: ${fonts.semiBold};
  margin-left: 15px;
  height: 15px;
  margin-bottom: 3px;
`

const ActivityBarOuter = styled.View`
  height: 10px;
  flex-grow: 1;
  background: ${colors.lightGrey};
  border-radius: 10px;
`

const ActivityBarInner = styled.View`
  height: 10px;
  width: ${props => props.value}%;
  background: ${props => props.color};
  border-radius: 10px;
`

export default ActivityBars
