import React from 'react'
import renderer from 'react-test-renderer'

import { SleepStage } from '../../api/sleep/SleepRecording'
import SleepGraph from '../SleepGraph'

it('renders correctly', () => {
  // Check button matches screenshot
  const tree = renderer
    .create(
      <SleepGraph
        segments={[
          {
            startTime: new Date(1585249742 * 1000),
            endTime: new Date(1585256952 * 1000),
            stage: SleepStage.Awake,
          },
          {
            startTime: new Date(1585256952 * 1000),
            endTime: new Date(1585264222 * 1000),
            stage: SleepStage.Light,
          },
          {
            startTime: new Date(1585264222 * 1000),
            endTime: new Date(1585278647 * 1000),
            stage: SleepStage.Rem,
          },
          {
            startTime: new Date(1585278647 * 1000),
            endTime: new Date(1585297232 * 1000),
            stage: SleepStage.Deep,
          },
        ]}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
