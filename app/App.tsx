import 'react-native-gesture-handler'
import React from 'react'
import Storybook from './storybook'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '@screens/Login'
import LoadingScreen from '@screens/Loading'
import HomeScreen from '@screens/Home'
import createStore from '@redux/store'

declare var global: { HermesInternal: null | {} }
const RENDER_STORYBOOK = false

const Stack = createStackNavigator()
const { store, persistor } = createStore()

const App = () => {
  return RENDER_STORYBOOK ? (
    <Storybook />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Loading" headerMode="none">
              {/*
                The LoadingScreen is used to determine which screen should be loaded based on state,
                Worth noting that this runs in the backgroud...
              */}
              <Stack.Screen name="Loading" component={LoadingScreen} />
              {/* Used to login the user... */}
              <Stack.Screen name="Login" component={LoginScreen} />
              {/* Main Screen used by the user... */}
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
