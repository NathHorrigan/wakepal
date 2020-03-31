import React, { useState } from 'react'
import { Dimensions, Keyboard } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { LineChart } from 'react-native-chart-kit'
import {
  startOfToday,
  startOfWeek,
  startOfMonth,
  eachDay,
  subDays,
  subWeeks,
  subMonths,
  format,
  isBefore,
  isWithinRange,
} from 'date-fns'

import { Plus, Minus, Cross } from './icons'
import { colors, fonts } from '@utils/theme'

interface WeightRecording {
  date: Date
  weight: number
}

interface WeightModalProps {
  visible: boolean
  onClose: Function
  value: number
  unit: string
  updateValue: Function
  data: WeightRecording[]
}

const WeightModal: React.SFC<WeightModalProps> = ({
  visible,
  onClose,
  value,
  unit,
  updateValue,
  data,
}) => {
  const [filterType, setFilterType] = useState('1week')

  // Generate the nessacery labels for each date boundry
  const today = startOfToday()
  const getPastNMonths = (n: number) =>
    Array(n)
      .fill(0)
      .map((_, index) => startOfMonth(subMonths(today, n - 1 - index)))

  // Generate dates for the X axis
  const graphLabelData = {
    '1week': () => eachDay(subDays(today, 6), today),
    '1month': () => [
      startOfWeek(subWeeks(today, 4)),
      startOfWeek(subWeeks(today, 3)),
      startOfWeek(subWeeks(today, 2)),
      startOfWeek(subWeeks(today, 1)),
    ],
    '3months': () => getPastNMonths(3),
    '6months': () => getPastNMonths(6),
  }

  // How the label data is formatting, January, 28th etc
  const graphLabelFormats = {
    '1week': date => format(date, 'Do'),
    '1month': date => format(date, 'Do'),
    '3months': date => format(date, 'MMM'),
    '6months': date => format(date, 'MMM'),
  }

  // List of filters the user can use
  const graphLabelFilters = {
    '1week': '1 Week',
    '1month': '4 Weeks',
    '3months': '3 Months',
    '6months': '6 Months',
  }

  // Generate the data for the table
  const activeGraphLabels = graphLabelData[filterType]()
  const labelData = activeGraphLabels.map(graphLabelFormats[filterType])
  let graphData = []
  let ignoreDataIndicies = []

  /*
    Find weight recordings that fit the x axis most accurately.
    Weight values are added to graph data. If the value isn't correct for that
    timespan segment then we hide the data point node and just leave the bezier line.
  */
  for (let i = 0; i < activeGraphLabels.length - 1; i++) {
    // If we're at the last datapoint then we should always use the most recent datapoint.
    if (i === activeGraphLabels.length - 1) {
      const latestRecording = data[data.length - 1]
      graphData.push(latestRecording.weight)
    }

    // Generate a list of weight recordings between two points on the x-axis
    const dateBoundryStart = activeGraphLabels[i - 1]
    const dateBoundryEnd = activeGraphLabels[i]
    const dataInRange = data
      .map((recording, index) => ({ ...recording, index }))
      .filter(recording =>
        isWithinRange(recording.date, dateBoundryStart, dateBoundryEnd)
      )

    // If we have a time accurate recording then add to graph
    const latestRecordingInRange = dataInRange[dataInRange.length - 1]
    if (latestRecordingInRange) {
      graphData.push(latestRecordingInRange.weight)
    }

    // If we don't have a weight recording for that range find the closest recording datewise
    else {
      const recordingsBeforeBoundry = data.filter(date =>
        isBefore(date.date, dateBoundryEnd)
      )
      const latestRecording =
        recordingsBeforeBoundry[recordingsBeforeBoundry.length - 1]
      graphData.push(latestRecording?.weight ?? null)
      // Ignore this datapoint because it's not accurate
      ignoreDataIndicies.push(i)
    }
  }

  return (
    <StyledModal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      avoidKeyboard
    >
      <ModalContent>
        {/* Button used to close modal */}
        <CrossButton onPress={onClose}>
          <Cross />
        </CrossButton>

        {/* Buttons used to control how much time is shown on the graph */}
        <FiltersContainer>
          {Object.keys(graphLabelFilters).map(key => (
            <FilterBubble
              key={key}
              active={key === filterType}
              onPress={() => setFilterType(key)}
              activeOpacity={0.5}
            >
              <FilterText active={key === filterType}>
                {graphLabelFilters[key]}
              </FilterText>
            </FilterBubble>
          ))}
        </FiltersContainer>

        {/* The chart to represent the graph data  */}
        <LineChart
          data={{
            labels: labelData,
            datasets: [
              {
                data: [...graphData, value],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          yAxisInterval={1}
          yAxisSuffix="kg"
          // segments={graphSegments}
          chartConfig={{
            backgroundGradientFrom: colors.paleGreen,
            backgroundGradientTo: colors.paleGreen,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: 'rgba(255, 255, 255, 0.6)',
            },
          }}
        />

        {/* Widget used to increase/decrease the value used by the modal */}
        <WeightControl>
          <WeightLabel>Today's Weight</WeightLabel>
          <ControlRow>
            <IconButton onPress={() => updateValue(value - 1)}>
              <Minus />
            </IconButton>
            <ValueText
              maxLength={3}
              onSubmit={Keyboard.dismiss}
              returnKeyType="done"
              keyboardType={'numeric'}
              onChangeText={newValue => updateValue(newValue)}
            >
              {value}
            </ValueText>
            <UnitText>{unit}</UnitText>
            <IconButton onPress={() => updateValue(value + 1)}>
              <Plus />
            </IconButton>
          </ControlRow>
        </WeightControl>
      </ModalContent>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`

const ModalContent = styled.View`
  position: relative;
  height: 450px;
  width: 100%;
  background: ${colors.paleGreen};
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-top: 60px;
`

const FiltersContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 15px;
`

const FilterBubble = styled.TouchableOpacity`
  padding: 4px 8px;
  border-radius: 10px;
  margin-right: 5px;
  background: rgba(255, 255, 255, ${props => (props.active ? 1 : 0.2)});
`

const FilterText = styled.Text`
  color: ${props => (props.active ? colors.paleGreen : 'white')};
  font-size: 13px;
  font-family: ${fonts.medium};
`

const CrossButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
`

const WeightControl = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
`

const WeightLabel = styled.Text`
  font-family: ${fonts.semiBold};
  color: white;
  font-size: 14px;
`

const ControlRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
`

const ValueText = styled.TextInput`
  color: white;
  font-size: 35px;
  font-family: ${fonts.bold};
`

const UnitText = styled.Text`
  opacity: 0.6;
  color: white;
  font-family: ${fonts.semiBold};
  font-size: 27px;
  margin-top: 4px;
  margin-left: 5px;
`

const IconButton = styled.TouchableOpacity`
  margin: 0 20px;
  padding: 20px;
`

export default WeightModal
