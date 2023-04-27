import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

type SecondaryButtonProps = {
    onPress: () => void;
    name: string
}

export function SecondaryButton({onPress, name}: SecondaryButtonProps) {
  return (
    <Button
        onPress={onPress}
        className='bg-white border-primary w-full py-2 rounded-lg text-[16px]'
        textColor='#6F3744'
        
    >{name}</Button>
  )
}