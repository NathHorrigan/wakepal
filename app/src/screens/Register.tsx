import React, { SFC, useState } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'

import { Chevron } from '@components/icons'
import { loginWithBasic } from '@redux/actions'
import { fonts, colors } from '@utils/theme'

const RegisterScreen: SFC = ({ navigation }) => {
  const dispatch = useDispatch()
  const [showLogin, setShowLogin] = useState(true)
  // Store form data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onSubmit = () => {
    dispatch(loginWithBasic(email, password))
  }

  return (
    <RegisterContainer>
      <Logo>{showLogin ? 'Login' : 'Register'}</Logo>
      <BackButton onPress={() => navigation.navigate('Login')}>
        <Chevron height={15} width={15} fill={colors.purple} />
      </BackButton>

      {!showLogin && (
        <>
          <InputForm>
            <InputText>First Name:</InputText>
            <InputField value={firstName} onChangeText={setFirstName} />
          </InputForm>

          <InputForm>
            <InputText>Last Name:</InputText>
            <InputField value={lastName} onChangeText={setLastName} />
          </InputForm>
        </>
      )}

      <InputForm>
        <InputText>Email:</InputText>
        <InputField value={email} onChangeText={setEmail} />
      </InputForm>

      <InputForm>
        <InputText>Password:</InputText>
        <InputField
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputForm>

      <SubmitButton onPress={onSubmit}>
        <SubmitText>{showLogin ? 'Login' : 'Register'}</SubmitText>
      </SubmitButton>

      <ToggleButton onPress={() => setShowLogin(!showLogin)}>
        <ToggleText>
          {showLogin
            ? 'Register for an account'
            : 'Login with existing account'}
        </ToggleText>
      </ToggleButton>

      <Exercise />
    </RegisterContainer>
  )
}

const RegisterContainer = styled.View`
  width: 100%;
  height: 100%;
  background: white;
`

const Logo = styled.Text`
  font-size: 30px;
  margin-top: 80px;
  margin-bottom: 80px;
  text-align: center;
  font-family: ${fonts.semiBold};
`

const BackButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 70px;
  left: 20px;
  transform: rotate(180deg);
`

const InputForm = styled.View`
  margin: 0 auto;
  height: 50px;
  width: 80%;
  margin-bottom: 30px;
`

const InputText = styled.Text`
  margin-bottom: 5px;
  font-family: ${fonts.semiBold};
`

const InputField = styled.TextInput`
  border: 3px solid ${colors.purple};
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding-left: 10px;
  color: black;
`

const SubmitButton = styled.TouchableOpacity`
  background-color: ${colors.purple};
  height: 50px;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubmitText = styled.Text`
  color: white;
  font-family: ${fonts.semiBold};
  font-size: 20px;
`

const ToggleButton = styled.TouchableOpacity`
  margin-top: 30px;
`

const ToggleText = styled.Text`
  color: ${colors.coral};
  font-family: ${fonts.medium};
  text-align: center;
  font-size: 18px;
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

export default RegisterScreen
