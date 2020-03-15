import React from 'react'
import Storybook from './storybook'
import { SafeAreaView, Text, StatusBar } from 'react-native'

declare var global: { HermesInternal: null | {} }
const RENDER_STORYBOOK = true

const App = () => {
  return RENDER_STORYBOOK ? (
    <Storybook />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello, WakePal!</Text>
      </SafeAreaView>
    </>
  )
}

export default App
