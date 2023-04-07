/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppLayout} from '../components';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {categories} from '../data';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <AppLayout>
      <View className="my-auto py-5">
        {/* <View className="flex-row justify-between items-center px-4 py-2">
          <Text className="text-2xl font-bold text-tertiary">Categories</Text>
          <Icon name="more-vertical" size={20} color="#000" />
        </View> */}

        <FlatList
          data={categories}
          numColumns={2}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const numColumns = item.imgWidth >= 300 ? 1 : 2;

            return (
              <TouchableOpacity className="px-4 py-5 flex-col items-start my-auto justify-start">
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
