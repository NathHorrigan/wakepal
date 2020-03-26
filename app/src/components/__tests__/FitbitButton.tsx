import React from 'react'
import renderer from 'react-test-renderer'

import FitbitButton from '../FitbitButton'

it('renders correctly', () => {
  // Check button matches screenshot
  const tree = renderer.create(<FitbitButton onPress={() => null} />).toJSON()
  expect(tree).toMatchSnapshot()
})
