import 'react-native-gesture-handler'
import React from 'react'
import Storybook from './storybook'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import LoginScreen from '@screens/Welcome'
import RegisterScreen from '@screens/Register'
import LoadingScreen from '@screens/Loading'
import OnboardingScreen from '@screens/Onboarding'
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
        <ActionSheetProvider>
          <PersistGate persistor={persistor} loading={null}>
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Loading" headerMode="none">
                  {/*
                The LoadingScreen is used to determine which screen should be loaded based on state,
                Worth noting that this runs in the backgroud...
              */}
                  <Stack.Screen name="Loading" component={LoadingScreen} />
                  {/* Used to login the user... */}
                  <Stack.Screen name="Login" component={LoginScreen} />
                  {/* Used for manual login/register */}
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  {/* Get intial details about the user... */}
                  <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                  />
                  {/* Main Screen used by the user... */}
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </ActionSheetProvider>
      </Provider>
    </>
  )
}

export default App
