import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import FitbitButton from '@components/FitbitButton'
import ActionButton from '@components/ActionButton'
import WaterButton from '@components/WaterButton'
import { Watch, Friends } from '@components/icons'
import { colors } from '@utils/theme'

import { FitbitAuthProvider } from '@api/auth/FitbitAuth'

storiesOf('Buttons', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Small', () => <ActionButton icon={Watch} label="Sync" />)
  .add('Wide', () => (
    <ActionButton wide icon={Friends} label="Friends" color={colors.cyan} />
  ))
  .add('Water Intake', () => <WaterButton label="2 pints to go..." />)
  .add('Fitbit Authenticate', () => (
    <FitbitButton
      icon={Watch}
      label="Login with Fitbit"
      onPress={async () => {
        const session = await FitbitAuthProvider.login()
        console.log(session)
      }}
    />
  ))
