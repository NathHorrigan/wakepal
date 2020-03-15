import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import ActionButton from '@components/ActionButton'
import WaterButton from '@components/WaterButton'
import { Watch, Friends } from '@components/icons'
import { colors } from '@utils/theme'

storiesOf('Buttons', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Small', () => <ActionButton icon={Watch} label="Sync" />)
  .add('Wide', () => (
    <ActionButton wide icon={Friends} label="Friends" color={colors.cyan} />
  ))
  .add('Water Intake', () => <WaterButton label="2 pints to go..." />)
