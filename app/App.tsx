import React from 'react'
import { SafeAreaView, Text, StatusBar } from 'react-native'
import PatternLibrary from './storybook'

declare var global: { HermesInternal: null | {} }

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello, WakePal!</Text>
      </SafeAreaView>
    </>
  )
}

if (process.env.IS_TEST_MODE) {
  export default App
}

export default PatternLibrary
