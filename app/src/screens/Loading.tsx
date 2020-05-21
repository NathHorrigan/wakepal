import React, { SFC } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { State } from '@redux/reducers'

interface LoadingScreenProps {
  navigation: any
}

const LoadingScreen: SFC<LoadingScreenProps> = ({ navigation }) => {
  // Extract from state if we're logged in...
  const { userAuthenticated, userOnboarded } = useSelector(
    (state: State) => state.authentication
  )

  // if not logged in then load the LoginScreen
  if (!userAuthenticated) {
    navigation.navigate('Login')
    return null
  }

  // Check the user has been onboarded (and therefor we have their details)
  if (!userOnboarded) {
    navigation.navigate('Onboarding')
    return null
  }

  // if logged in and onboarded then load the HomeScreen
  navigation.navigate('Home')

  // Hmmm something has gone wrong if this is reached!
  return null
}

export default LoadingScreen
