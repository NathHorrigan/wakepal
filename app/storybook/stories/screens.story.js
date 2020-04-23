import React from 'react'
import { storiesOf } from '@storybook/react-native'

import LoginScreen from '@screens/Login.tsx'
import OnboardingScreen from '@screens/Onboarding.tsx'

storiesOf('Screens', module)
  .add('Login', () => <LoginScreen />)
  .add('Onboarding', () => <OnboardingScreen />)
