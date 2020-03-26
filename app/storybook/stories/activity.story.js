import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import ActivityBars from '@components/ActivityBars'
import { colors } from '@utils/theme'

storiesOf('Activity Elements', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Activity Bars', () => (
    <ActivityBars
      activities={[
        { label: 'Steps', value: 8768, goal: 10000, color: colors.coral },
        { label: 'Floors', value: 16, goal: 25, color: colors.cyan },
        {
          label: 'Calories',
          value: 1000,
          goal: 1200,
          color: colors.paleGreen,
        },
        {
          label: 'Water',
          value: 4,
          goal: 6,
          color: colors.paleBlue,
          unit: 'Pints',
        },
      ]}
    />
  ))
