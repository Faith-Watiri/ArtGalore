/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';
import { AppLayout } from '../components';
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/EvilIcons'

import Digital from '../../../assets/digital.jpg'
import { PrimaryButton, SecondaryButton } from '../../../components';

export function ProfileScreen() {
  return (
    <AppLayout>
      {/* Top header */}
      <View className='flex-row justify-between'>
        <Icon name='arrow-left' size={24} color='black' />

        <View className='items-center space-y-3'>
          <Image source={Digital} className='h-14 w-14 rounded-full' />
          <Text className="text-primary text-4xl font-bold">John Doe</Text>
        
          <View className='flex-row items-center justify-around w-2/3'>
            <Icon2 name='location' color='#C9C9C9' size={20} />
          
            <Text className='text-[#C9C9C9] text-lg'>USA</Text>
            <Text className='text-[#C9C9C9] text-lg'>b.1970</Text>
          </View>
        </View>

        <Icon name='share-2' size={24} color='black' />
      </View>

      <View className='flex-row my-5 jsutify-around w-full'>
        <PrimaryButton name='Followed' onPress={() => {}} />
        <SecondaryButton name='Message' onPress={() => {}} />
      </View>
    </AppLayout>
  );
}
