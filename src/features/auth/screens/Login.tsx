/* eslint-disable prettier/prettier */
import { View, Text, ToastAndroid } from 'react-native';
import React, {useState} from 'react';
import { FormInput, PrimaryButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { AuthLayout } from '../components';
import { BASE_URL } from '../../../lib/constants';
import { axiosReq } from '../../../utlis/axios';

export function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[data, setData] = useState([])

  const config: AxiosConfig = {
    url: `${BASE_URL}/auth/login`,
    method: 'POST',
    data: data
  }

  const onSubmit = async() => {
    setData({...data, email, password})

    const login = await axiosReq(config)

    console.log(login)

    if (login.status === 201) {
      navigation.navigate("Register")

      ToastAndroid.showWithGravityAndOffset(
        'Logged in successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
        25,
        50,
    )
    }

  }

  return (
    <AuthLayout 
        pageTitle='Login'
        accountCheck='Dont have an account?'
        screen='Register'
        action='Login' 
        onPress={onSubmit}>
      <View>
        <FormInput
          label='Email Address'
          value={email}
          placeholder='johndoe@gmail.com'
          onChangeText={(text) => setEmail(text)}
          secureTextEntry={false}
        />
        <FormInput
          label='Password'
          value={password}
          placeholder='johndoe@gmail.com'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
    </AuthLayout>
  );
}
