import {View, Text, Image} from 'react-native';
import React from 'react';
import {AppLayout} from '../../components';
import Icon from 'react-native-vector-icons/Feather';

import Digital from '../../../../assets/digital.jpg';

export function UserProfile() {
  return (
    <AppLayout>
      <View className="flex-row justify-between">
        <Icon name="arrow-left" size={24} color="black" />

        <View className="items-center space-y-3 mt-10">
          <Image source={Digital} className="h-14 w-14 rounded-full" />
          <Text className="text-primary text-4xl font-bold">John Doe</Text>

          <View className="flex-row items-center justify-around">
            <Text className="text-tertiary text-lg">USA</Text>
          </View>
          <View className="flex-row space-x-10">
            <View className="items-center">
              <Text className="font-bold text-tertiary">120k</Text>
              <Text className="text-tertiary">followers</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold text-tertiary">12</Text>
              <Text className="text-tertiary">following</Text>
            </View>
          </View>
        </View>

        <Icon name="share-2" size={24} color="black" />
      </View>


    </AppLayout>
  );
}
