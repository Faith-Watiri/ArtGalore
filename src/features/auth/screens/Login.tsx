/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';
import { FormInput, PrimaryButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { AuthLayout } from '../components';

export function Login() {
  const navigation = useNavigation()
  return (
    <AuthLayout 
        pageTitle='Login'
        accountCheck='Dont have an account?'
        screen='Register'
        action='Login' 
        onPress={() => {}}>
      <View>
        <FormInput
          label='Email Address'
          value=''
          placeholder='johndoe@gmail.com'
          onChangeText={() => { }}
          secureTextEntry={false}
        />
        <FormInput
          label='Password'
          value=''
          placeholder='johndoe@gmail.com'
          onChangeText={() => { }}
          secureTextEntry={true}
        />
      </View>
    </AuthLayout>
  );
}
