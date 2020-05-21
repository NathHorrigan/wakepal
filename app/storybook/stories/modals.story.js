import React, { useState } from 'react'
import { Button } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import CenterView from './CenterView'
import WaterModal from '@components/WaterModal'
import WeightModal from '@components/WeightModal'

const ExampleWaterModal = () => {
  const [value, setValue] = useState(2)
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button title="Open Water Modal" onPress={() => setVisible(true)} />
      <WaterModal
        visible={visible}
        onClose={() => setVisible(false)}
        value={Math.max(value, 0)}
        goalValue={6}
        unit="Litres"
        updateValue={setValue}
      />
    </>
  )
}

const ExampleWeightModal = () => {
  const [value, setValue] = useState(72)
  const [visible, setVisible] = useState(false)

  const data = [
    { date: new Date('2019-08-25'), weight: 120 },
    { date: new Date('2019-12-28'), weight: 62 },
    { date: new Date('2020-01-14'), weight: 63 },
    { date: new Date('2020-02-02'), weight: 64 },
    { date: new Date('2020-03-05'), weight: 65 },
    { date: new Date('2020-03-10'), weight: 66 },
    { date: new Date('2020-03-12'), weight: 67 },
    { date: new Date('2020-03-13'), weight: 68 },
    { date: new Date('2020-03-14'), weight: 69 },
    { date: new Date('2020-03-25'), weight: 70 },
    { date: new Date('2020-03-26'), weight: 71 },
    { date: new Date('2020-03-27'), weight: 72 },
    { date: new Date('2020-03-28'), weight: 73 },
    { date: new Date('2020-03-29'), weight: 74 },
  ]

  return (
    <>
      <Button title="Open Weight Modal" onPress={() => setVisible(true)} />
      <WeightModal
        visible={visible}
        onClose={() => setVisible(false)}
        value={Math.max(value, 0)}
        unit="kg"
        updateValue={setValue}
        data={data}
      />
    </>
  )
}

storiesOf('Activity Elements', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Water Modal', () => <ExampleWaterModal />)
  .add('Weight Modal', () => <ExampleWeightModal />)
