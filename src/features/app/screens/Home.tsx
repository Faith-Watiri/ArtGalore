/* eslint-disable prettier/prettier */
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
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(2);
  const [key, setKey] = useState('default');

  useEffect(() => {
    if (width >= 300) {
      setNumColumns(1);
      setKey('one-column');
    } else {
      setNumColumns(2);
      setKey('two-column');
    }
  }, [width]);

  return (
    <AppLayout>
      <View className="my-auto py-5">
        {/* <View className="flex-row justify-between items-center px-4 py-2">
          <Text className="text-2xl font-bold text-tertiary">Categories</Text>
          <Icon name="more-vertical" size={20} color="#000" />
        </View> */}

        <FlatList
          data={categories}
          numColumns={numColumns}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          key={key}
          renderItem={({item}) => {
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
