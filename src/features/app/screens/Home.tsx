/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppLayout} from '../components';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {categories} from '../data';

export function HomeScreen() {
  // const {width} = useWindowDimensions();

  const navigation = useNavigation();

  const [key] = useState('default');

  return (
    <AppLayout>
      <View className="my-auto py-5">
        <FlatList
          data={categories}
          numColumns={2}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          key={key}
          renderItem={({item}) => {
            // const numColumns = item.imgWidth < 300 ? 1 : 2;

            return (
              <TouchableOpacity
                className="px-4 py-5 flex-col items-start my-auto justify-start"
                onPress={() =>
                  navigation.navigate('Category', {data: item.name})
                }>
                <View className="bg-white rounded-lg">
                  <Image
                    source={item.image}
                    style={{height: item.imgHeight, width: item.imgWidth}}
                    className={`rounded-lg h-${item.imgHeight} w-${item.imgWidth}`}
                  />
                </View>
                <Text className="text-center text-xl mt-2 font-bold text-tertiary">
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          getItemLayout={(data, index) => ({
            length: (data && data[index] && data[index].imgHeight) || 0,
            offset: (data && data[index] && data[index].imgHeight * index) || 0,
            index,
          })}
        />
      </View>
    </AppLayout>
  );
}
