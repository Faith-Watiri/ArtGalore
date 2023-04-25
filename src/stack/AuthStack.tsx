/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../features/auth/screens/password/ForgotPassword';
import ResetPassword from '../features/auth/screens/password/ResetPassword';
import Success from '../features/auth/screens/password/Success';
import VerifyCode from '../features/auth/screens/password/VerifyCode';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Forgot password" component={ForgotPassword} />
      <Stack.Screen name="Reset password" component={ResetPassword} />
      <Stack.Screen name="Success Pass Reset" component={Success} />
      <Stack.Screen name="Verify code" component={VerifyCode} />
    </Stack.Navigator>
  );
}