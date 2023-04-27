import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

type PrimaryButtonProps = {
    onPress: () => void;
    name: string;
}

export function PrimaryButton({onPress, name}: PrimaryButtonProps) {
  return (
    <Button
        onPress={onPress}
        className='bg-primary w-full py-2 rounded-lg text-[16px]'
        textColor='white'
        
    >{name}</Button>
  )
}