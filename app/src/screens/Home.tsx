import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, FlatList, Dimensions, Alert } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { format, isToday } from 'date-fns'
import styled from 'styled-components/native'

// Components
import ActionButton from '@components/ActionButton'
import WaterButton from '@components/WaterButton'
import ActivityBars from '@components/ActivityBars'
import WeatherHeader from '@components/WeatherHeader'
import SleepGraph from '@components/SleepGraph'
import WeightModal from '@components/WeightModal'
import WaterModal from '@components/WaterModal'
import { Watch, Friends, Scales, Cog } from '@components/icons'
// API Providers
import WeatherAPI, { WeatherResponse } from '@api/weather/OpenWeatherMap'
// Global State
import {
  logout,
  syncTracker,
  incrementTrackerHistory,
  updateCurrentMetrics,
  setUserHasOnboarded,
} from '@redux/actions'
// Utils
import { colors } from '@utils/theme'
import { useFitnessTracker } from '@utils/hooks'
import { DailyFitnessRecording } from '@redux/reducers/fitness'
import { State } from '@redux/reducers'

enum ModalState {
  Water,
  Weight,
}

const HomeScreen: React.SFC = () => {
  // Global State
  const dispatch = useDispatch()
  const syncing = useSelector((state: State) => state.fitness.syncInProgress)
  const profile = useSelector(
    (state: State) => state.authentication.userSession?.profile
  )
  const fitnessGoals = useSelector((state: State) => state.fitness.goals)
  const fitnessRecordings: DailyFitnessRecording[] = useSelector(
    (state: State) => state.fitness.recordings
  )
  // Local State
  const { showActionSheetWithOptions } = useActionSheet()
  const [currentWeight, setCurrentWeight] = useState<Number>(null)
  const [currentWater, setCurrentWater] = useState<Number>(null)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [activeDate, setActiveDate] = useState(format(Date.now(), 'YYYY-MM-DD'))
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse>(null)

  // Get the fitness metrics for the selected date
  const fitnessMetrics: DailyFitnessRecording = fitnessRecordings.find(
    recording => recording.date === activeDate
  )
  // Extract the sleep recordings from data
  const sleepRecordings = fitnessRecordings?.map(day => ({
    key: day.date,
    date: day.date,
    segments: day.sleep ?? [],
  }))

  // Data handing for weight data
  const weightRecordings = fitnessRecordings?.map(day => ({
    date: day.date,
    weight: day.weight ?? 0,
  }))

  // Update global record of todays weight
  const updateCurrentWeight = (value: number) => {
    setCurrentWeight(value)
    dispatch(
      updateCurrentMetrics({
        ...fitnessMetrics,
        weight: value,
      })
    )
  }

  // Update global record of todays water intake
  const updateCurrentWaterIntake = (value: number) => {
    setCurrentWater(value)
    dispatch(
      updateCurrentMetrics({
        ...fitnessMetrics,
        waterIntake: value,
      })
    )
  }

  // Sync sleep data and fitness data
  const sync = () => dispatch(syncTracker())

  // This runs on startup...
  useEffect(() => {
    // Load the current weather and save to local cache
    WeatherAPI.getClient()
      .getCurrentWeather()
      .then((weather: WeatherResponse) => setCurrentWeather(weather))
      .catch((e: Error) => console.log(e))

    // Sync all tracker data on load
    sync()
  }, [])

  // Const format the date label...
  const dateIsToday = isToday(new Date(activeDate))
  const dateLabel = activeDate
    ? dateIsToday
      ? 'Today'
      : format(new Date(activeDate), 'DD/MM/YYYY')
    : ''

  // Callback for when sliding on SleepGraph...
  const sliderRef = useRef(null)
  const onSwipe = useRef(({ viewableItems }) => {
    if (!viewableItems[0]) return null
    const { item: activeSleep } = viewableItems[0]
    setActiveDate(activeSleep.date)
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 25 })

  // Settings action sheet
  const onSettingsPress = () => {
    showActionSheetWithOptions(
      {
        options: ['Reconfigure Tracker', 'Logout', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          dispatch(setUserHasOnboarded(false))
        } else if (buttonIndex === 1) {
          dispatch(logout())
        }
      }
    )
  }

  return (
    <>
      {/* Modal that allows user to input current weight */}
      <WeightModal
        visible={activeModal === ModalState.Weight}
        value={currentWeight ?? fitnessMetrics?.weight ?? 0}
        unit="kg"
        updateValue={updateCurrentWeight}
        onClose={() => setActiveModal(null)}
        data={weightRecordings}
      />
      {/* Modal that allows user to input water inrake */}
      <WaterModal
        visible={activeModal === ModalState.Water}
        value={currentWater ?? fitnessMetrics?.waterIntake}
        unit="litres"
        updateValue={updateCurrentWaterIntake}
        onClose={() => setActiveModal(null)}
        goalValue={fitnessGoals?.waterIntakeGoal}
      />
      {/* Main Buttons and Graph */}
      <Container
        refreshControl={
          <RefreshControl
            refreshing={syncing}
            tintColor={colors.paleGreen}
            onRefresh={() => sync()}
          />
        }
      >
        <WeatherHeader
          name={profile?.name}
          dateLabel={dateLabel}
          weather={currentWeather}
          showBackLink={!dateIsToday}
          onBackPress={() => sliderRef.current?.scrollToIndex({ index: 0 })}
        />
        <FlatList
          inverted
          pagingEnabled
          ref={sliderRef}
          onViewableItemsChanged={onSwipe.current}
          viewabilityConfig={viewConfigRef.current}
          style={{ width: Dimensions.get('screen').width }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={sleepRecordings?.reverse() ?? []}
          onEndReached={() => dispatch(incrementTrackerHistory())}
          onEndReachedThreshold={2}
          renderItem={({ item: sleep, index }) => (
            <SleepContainer key={index}>
              <SleepGraph segments={sleep.segments} />
            </SleepContainer>
          )}
        />

        <ActionsContainer>
          <ActivityBars
            activities={[
              {
                label: 'Steps',
                value: fitnessMetrics?.steps ?? 0,
                goal: fitnessGoals?.stepsGoal ?? 0,
                color: colors.coral,
              },
              {
                label: 'Floors',
                value: fitnessMetrics?.floors ?? 0,
                goal: fitnessGoals?.floorsGoal ?? 0,
                color: colors.cyan,
              },
              {
                label: 'Calories',
                value: fitnessMetrics?.calories ?? 0,
                goal: fitnessGoals?.caloriesGoal ?? 0,
                color: colors.paleGreen,
              },
              {
                label: 'Water',
                value: fitnessMetrics?.waterIntake ?? 0,
                goal: fitnessGoals?.waterIntakeGoal ?? 0,
                color: colors.paleBlue,
                unit: 'Pints',
              },
            ]}
          />
          <ActionButtonsGrid>
            <WeightButton
              disabled={!dateIsToday}
              onPress={() => setActiveModal(ModalState.Weight)}
            />
            <WaterButton
              disabled={!dateIsToday}
              onPress={() => setActiveModal(ModalState.Water)}
              label={`${Math.max(
                fitnessGoals?.waterIntakeGoal - currentWater ?? 0,
                0
              )} pints to go...`}
            />
            <FriendsButton
              onPress={() => Alert.alert('Friends is not implemented yet...')}
            />
            <SyncButton onPress={sync} />
            <CogButton onPress={onSettingsPress} />
          </ActionButtonsGrid>
        </ActionsContainer>
      </Container>
    </>
  )
}

export default HomeScreen

const Container = styled.ScrollView`
  position: relative;
  display: flex;
  width: 100%;
  padding-top: 60px;
`

const SleepContainer = styled.View`
  width: ${Dimensions.get('screen').width}px;
`

const ActionsContainer = styled.View`
  border-top-width: 3px;
  border-top-color: ${colors.coral};
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-top: 10px;
`

const ActionButtonsGrid = styled.View`
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const SyncButton = styled(ActionButton).attrs({
  label: 'Sync',
  icon: Watch,
})``

const FriendsButton = styled(ActionButton).attrs({
  label: 'Friends',
  icon: Friends,
  color: colors.cyan,
})`
  margin-right: 10px;
`

const WeightButton = styled(ActionButton).attrs({
  label: 'Weight',
  icon: Scales,
  color: colors.paleGreen,
})`
  margin-right: 10px;
  margin-bottom: 10px;
`

const CogButton = styled(ActionButton).attrs({
  label: 'Settings',
  icon: Cog,
  color: colors.orange,
})`
  margin-left: 10px;
`
