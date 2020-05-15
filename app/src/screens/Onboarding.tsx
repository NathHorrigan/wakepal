import React, { SFC, useState } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { presentShortcut } from 'react-native-siri-shortcut'
import AddToSiriButton, {
  SiriButtonStyles,
} from 'react-native-siri-shortcut/AddToSiriButton'

import FitbitButton from '@components/FitbitButton'
import { WaterControlRow } from '@components/WaterModal'
import { ButtonText } from '@components/ActionButton'
import { HealthKitLogo, GoogleFitLogo } from '@components/icons'
import { FitnessTracker } from '@api/fitness'
import { setOnboardingData } from '@redux/actions'
import { fonts, colors } from '@utils/theme'

interface OnboardingStageProps {
  value?: Number
  setValue: Function
}

interface SetupHeadingProps {
  color?: string
}

type OnboardingStage = SFC<OnboardingStageProps>

const WaterStage: OnboardingStage = ({ value, setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.blue}>
        How much pints of water do you drink per day?
      </SetupHeading>
      <Water />
      <WaterControlRow
        color={colors.blue}
        value={value}
        updateValue={setValue}
        unit="pints"
      />
    </SetupStep>
  )
}

const WeightStage: OnboardingStage = ({ value, setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.paleGreen}>
        How much do you weigh?
      </SetupHeading>
      <Scales />
      <WaterControlRow
        color={colors.paleGreen}
        value={value}
        updateValue={setValue}
        unit="kg"
      />
    </SetupStep>
  )
}

const StepStage: OnboardingStage = ({ value, setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.orange}>
        How many steps a day do you aim to do?
      </SetupHeading>
      <Walking />
      <WaterControlRow
        color={colors.orange}
        value={value}
        increment={1000}
        updateValue={setValue}
        unit="steps"
      />
    </SetupStep>
  )
}

const FloorsStage: OnboardingStage = ({ value, setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.red}>
        How many floors do you aim to climb per day?
      </SetupHeading>
      <Rooftop />
      <WaterControlRow
        color={colors.red}
        value={value}
        increment={1}
        updateValue={setValue}
        unit="floors"
      />
    </SetupStep>
  )
}

const CaloriesStage: OnboardingStage = ({ value, setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.purple}>
        How many calories do you aim to burn per day?
      </SetupHeading>
      <Food />
      <WaterControlRow
        color={colors.purple}
        value={value}
        increment={100}
        updateValue={setValue}
        unit="calories"
      />
    </SetupStep>
  )
}

const TrackingStage: OnboardingStage = ({ setValue }) => {
  return (
    <SetupStep>
      <SetupHeading color={colors.coral}>
        How do you want to track activity?
      </SetupHeading>
      <Heart />
      <FitbitButton onPress={() => setValue(FitnessTracker.Fitbit)} />
      <ConnectButton onPress={() => setValue(FitnessTracker.HealthKit)}>
        <HealthKitLogo />
        <HealthkitText>Sync with HealthKit</HealthkitText>
      </ConnectButton>
      {/* <ConnectButton onPress={() => setValue(FitnessTracker.GoogleFit)}>
        <GoogleFitLogo />
        <GoogleFitText>Connect to Google Fit</GoogleFitText>
      </ConnectButton> */}
    </SetupStep>
  )
}

// Siri Shortcut configuration
const opts = {
  activityType: 'com.wakepal.showSleep',
  title: "Show last night's sleep",
  userInfo: {
    foo: 1,
    bar: 'baz',
    baz: 34.5,
  },
  keywords: ['sleep', 'wakepal', 'sleep stages'],
  // persistentIdentifier: 'yourPersistentIdentifier',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'How was my sleep last night?',
  needsSave: true,
}

const SiriStage: OnboardingStage = () => {
  return (
    <SetupStep>
      <SetupHeading color={colors.coral}>
        Make your like easier and us to Siri?
      </SetupHeading>
      <Siri />
      <AddToSiriButton
        style={{ width: '100%' }}
        buttonStyle={SiriButtonStyles.blackOutline}
        onPress={() => {
          presentShortcut(opts, () => null)
        }}
      />
    </SetupStep>
  )
}

const OnboardingScreen: SFC = () => {
  // Global State
  const dispatch = useDispatch()
  // Local State
  const [stage, setStage] = useState(0)
  const [intake, setIntake] = useState(3)
  const [floors, setFloors] = useState(5)
  const [weight, setWeight] = useState(70)
  const [steps, setSteps] = useState(10000)
  const [calories, setCalories] = useState(2200)

  const onCompleteOnboarding = (trackingMethod: string) => {
    // This will result in a redux update in the future.
    dispatch(
      setOnboardingData(steps, intake, weight, floors, calories, trackingMethod)
    )
  }

  const renderStage = () => {
    switch (stage) {
      case 0:
        return <WaterStage value={intake} setValue={setIntake} />
      case 1:
        return <WeightStage value={weight} setValue={setWeight} />
      case 2:
        return <StepStage value={steps} setValue={setSteps} />
      case 3:
        return <FloorsStage value={floors} setValue={setFloors} />
      case 4:
        return <CaloriesStage value={calories} setValue={setCalories} />
      case 5:
        return <SiriStage />
      case 6:
        return <TrackingStage setValue={onCompleteOnboarding} />
    }
  }

  return (
    <SafeArea>
      <OnboardingContainer>
        <Heading>Let's get started!</Heading>
        {renderStage()}

        <OnboardingControl>
          <OnboardingButton
            onPress={() => setStage(stage - 1)}
            disabled={stage < 1}
          >
            <OnboardingButtonText>Prev</OnboardingButtonText>
          </OnboardingButton>
          <OnboardingButton
            onPress={() => setStage(stage + 1)}
            disabled={stage === 6}
          >
            <OnboardingButtonText>Next</OnboardingButtonText>
          </OnboardingButton>
        </OnboardingControl>
      </OnboardingContainer>
    </SafeArea>
  )
}

const SafeArea = styled(SafeAreaView)`
  background-color: #f2f3f4;
`

const OnboardingContainer = styled.View`
  width: 100%;
  height: 100%;
`

const SetupStep = styled.View`
  height: 300px;
  margin-top: 20px;
`

const SetupHeading = styled.Text<SetupHeadingProps>`
  color: ${props => props.color};
  text-align: center;
  font-size: 22px;
  font-family: ${fonts.medium};
  margin: 0 auto;
  margin-top: 30px;
  max-width: 250px;
`

const Water = styled(LottieView).attrs({
  source: require('@animations/water.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
`

const Scales = styled(LottieView).attrs({
  source: require('@animations/scales.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
`

const Walking = styled(LottieView).attrs({
  source: require('@animations/walking.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
`

const Heart = styled(LottieView).attrs({
  source: require('@animations/heart.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
`

const Rooftop = styled(LottieView).attrs({
  source: require('@animations/floors.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
  margin-top: 8px;
`

const Food = styled(LottieView).attrs({
  source: require('@animations/food.json'),
  autoPlay: true,
  loop: true,
})`
  height: 200px;
  margin: 0 auto;
  margin-top: 8px;
`

const Siri = styled(LottieView).attrs({
  source: require('@animations/siri.json'),
  autoPlay: true,
  loop: true,
})`
  height: 250px;
  width: 100%;
  margin: 0 auto;
`

const Heading = styled.Text`
  font-size: 30px;
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;
  font-family: ${fonts.semiBold};
`

const OnboardingControl = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  padding: 0 20px;
`

const OnboardingButton = styled.TouchableOpacity`
  opacity: ${props => (props.disabled ? 0 : 1)};
`
const OnboardingButtonText = styled.Text`
  color: ${colors.coral};
  font-size: 18px;
  font-family: ${fonts.semiBold};
`

const ConnectButton = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  margin: 0 auto;
  margin-top: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const HealthkitText = styled(ButtonText)`
  font-family: ${fonts.medium};
  color: #1d1d1d;
  margin-left: 10px;
`

const GoogleFitText = styled(HealthkitText)`
  color: black;
`

export default OnboardingScreen
