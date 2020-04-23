import React, { SFC } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

interface LoadingScreenProps {
  navigation: any
}

const LoadingScreen: SFC<LoadingScreenProps> = ({ navigation }) => {
  // Extract from state if we're logged in...
  const isAuthenticated = useSelector(
    (state: any) => state.authentication.userAuthenticated
  )

  if (!isAuthenticated) {
    // if not logged in then load the LoginScreen
    navigation.navigate('Login')
  } else {
    // if logged in then load the HomeScreen
    navigation.navigate('Home')
  }

  // Hmmm something has gone wrong if this is reached!
  return null
}

export default LoadingScreen
