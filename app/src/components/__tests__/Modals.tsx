import React from 'react'
import renderer from 'react-test-renderer'
import WaterModal from '@components/WaterModal'
import WeightModal from '@components/WeightModal'

it('water modal renders correctly', () => {
  // Check button matches screenshot
  const tree = renderer
    .create(<WaterModal visible={true} value={2} goalValue={6} unit="Pints" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('weight modal renders correctly', () => {
  // Sample data
  const data = [
    { date: new Date('2020-03-13'), weight: 68 },
    { date: new Date('2020-03-14'), weight: 69 },
    { date: new Date('2020-03-25'), weight: 70 },
    { date: new Date('2020-03-26'), weight: 71 },
    { date: new Date('2020-03-27'), weight: 72 },
    { date: new Date('2020-03-28'), weight: 73 },
    { date: new Date('2020-03-29'), weight: 74 },
  ]
  // Check button matches screenshot
  const tree = renderer
    .create(<WeightModal visible={true} value={78} unit="kg" data={data} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
