import React from 'react'
import renderer from 'react-test-renderer'

import ActivityBars from '../ActivityBars'
import { colors } from '@utils/theme'

it('renders correctly', () => {
  // Check button matches screenshot
  const tree = renderer
    .create(
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
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
