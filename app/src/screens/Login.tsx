import React, { SFC } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import { AppleButton } from '@invertase/react-native-apple-authentication'

import { GoogleIcon } from '@components/icons'
import { fonts, colors } from '@utils/theme'

GoogleSignin.configure()
const LoginScreen: SFC = () => {
  // Google Sign in callback
  const onGoogleClick = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <LoginContainer>
      <Logo>WakePal</Logo>
      <Slogan>Measuring your life metrics.</Slogan>
      <ButtonsContainer>
        <AppleLoginButton onPress={() => console.log('NOT IMPLEMENTED')} />
        <GoogleButton onPress={onGoogleClick}>
          <GoogleIcon />
          <GoogleText>Continue with Google</GoogleText>
        </GoogleButton>
      </ButtonsContainer>
      <Sloth />
      <Exercise />
    </LoginContainer>
  )
}

const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
`

const ButtonsContainer = styled.View`
  width: 300px;
  margin: 0 auto;
  margin-top: 230px;
`

const AppleLoginButton = styled(AppleButton).attrs({
  buttonStyle: AppleButton.Style.BLACK,
  buttonType: AppleButton.Type.SIGN_IN,
})`
  width: 300px;
  height: 45px;
`

const GoogleButton = styled.TouchableOpacity`
  height: 45px;
  width: 300px;
  margin-top: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const GoogleText = styled.Text`
  color: black;
  font-size: 15px;
  font-family: ${fonts.semiBold};
  margin-left: 4px;
`

const Sloth = styled(LottieView).attrs({
  source: require('@animations/sloth.json'),
  autoPlay: true,
  loop: true,
})`
  position: absolute;
  height: 200px;
  right: -2px;
  top: 60px;
`

const Exercise = styled(LottieView).attrs({
  source: require('@animations/pullups.json'),
  autoPlay: true,
  loop: true,
})`
  position: absolute;
  height: 220px;
  right: 0;
  left: 0;
  bottom: -20px;
`

const Logo = styled.Text`
  font-size: 40px;
  margin-top: 80px;
  text-align: center;
  font-family: ${fonts.semiBold};
`

const Slogan = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  color: ${colors.coral};
  font-family: ${fonts.semiBold};
`

export default LoginScreen
