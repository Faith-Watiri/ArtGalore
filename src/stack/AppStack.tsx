/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomStack} from './BottomStack';
import {Category} from '../features/app/screens/Category/[id]';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomStack} />
      <Stack.Screen name="Category" component={Category} />
    </Stack.Navigator>
  );
}
