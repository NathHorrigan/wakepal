import React, { SFC, useState } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

import FitbitButton from '@components/FitbitButton'
import { WaterControlRow } from '@components/WaterModal'
import { ButtonText } from '@components/ActionButton'
import { HealthKitLogo, GoogleFitLogo } from '@components/icons'

import { fonts, colors } from '@utils/theme'

interface OnboardingStageProps {
  value?: Number
  setValue: Function
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

const TrackingStage: OnboardingStage = ({ setValue }) => {
  const onFitbitClick = () => {
    setValue('fitbit')
  }

  return (
    <SetupStep>
      <SetupHeading color={colors.coral}>
        How do you want to track activity?
      </SetupHeading>
      <Heart />
      <FitbitButton onPress={onFitbitClick} />
      <ConnectButton>
        <HealthKitLogo />
        <HealthkitText>Sync with HealthKit</HealthkitText>
      </ConnectButton>
      <ConnectButton>
        <GoogleFitLogo />
        <GoogleFitText>Connect to Google Fit</GoogleFitText>
      </ConnectButton>
    </SetupStep>
  )
}

const OnboardingScreen: SFC = () => {
  const [stage, setStage] = useState(0)
  const [intake, setIntake] = useState(3)
  const [weight, setWeight] = useState(70)
  const [steps, setSteps] = useState(10000)

  const onCompleteOnboarding = () => {
    // This will result in a redux update in the future.
    console.log({
      stage,
      intake,
      weight,
      trackingMethod: null,
    })
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
        return <TrackingStage setValue={onCompleteOnboarding} />
    }
  }

  return (
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
          disabled={stage === 3}
        >
          <OnboardingButtonText>Next</OnboardingButtonText>
        </OnboardingButton>
      </OnboardingControl>
    </OnboardingContainer>
  )
}

const OnboardingContainer = styled.View`
  width: 100%;
  height: 100%;
`

const SetupStep = styled.View`
  height: 300px;
  margin-top: 50px;
`

const SetupHeading = styled.Text`
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

const Heading = styled.Text`
  font-size: 30px;
  margin: 0 auto;
  margin-top: 80px;
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
