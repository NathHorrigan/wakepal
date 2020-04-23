import React, { SFC } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'
import { AppleButton } from '@invertase/react-native-apple-authentication'

import { GoogleIcon } from '@components/icons'
import { loginWithProvider } from '@redux/actions'
import { fonts, colors } from '@utils/theme'
import { AuthProviders } from '@api/auth'

const LoginScreen: SFC = () => {
  const dispatch = useDispatch()
  // Google Sign in callback
  const onGoogleClick = () => dispatch(loginWithProvider(AuthProviders.Google))
  // Apple Sign in callback
  const onAppleClick = () => dispatch(loginWithProvider(AuthProviders.Apple))

  return (
    <LoginContainer>
      <Logo>WakePal</Logo>
      <Slogan>Measuring your life metrics.</Slogan>
      <ButtonsContainer>
        <AppleLoginButton onPress={onAppleClick} />
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
  background: white;
`

const Logo = styled.Text`
  font-size: 40px;
  margin-top: 130px;
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
  height: 50px;
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
  font-size: 18px;
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
  top: 70px;
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

export default LoginScreen
