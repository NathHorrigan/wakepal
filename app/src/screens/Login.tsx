import React, { SFC } from 'react'
import styled from 'styled-components/native'
import { fonts, colors } from '@utils/theme'
import LottieView from 'lottie-react-native'

const LoginScreen: SFC = () => {
  return (
    <LoginContainer>
      <Logo>WakePal</Logo>
      <Slogan>Measuring your life metrics.</Slogan>
      <Sloth />
      <Exercise />
    </LoginContainer>
  )
}

const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
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
