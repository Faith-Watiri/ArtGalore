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
import {BASE_URL} from '../../../lib/constants';
import {axiosReq} from '../../../utlis/axios';
import ArtCard from '../../../components/Elements/Cards/ArtCard';
import {getObjectData} from '../../../lib/helpers/storage.helper';
import {Loading} from '../../../components';

export function HomeScreen() {
  // const {width} = useWindowDimensions();
  const [art, setArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const token = getObjectData('AG_USER_TOKEN');

  const config: AxiosConfig = {
    url: `${BASE_URL}/art`,
    method: 'GET',
    data: art,
    bearerToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MzU3NTcwMCwiZXhwIjoxNjgzNTc5MzAwfQ.swc7-w_wxk1SKh7Hj4yf7nl1VHU2eUIm15-jvmCLfRo',
  };

  const [key] = useState('default');

  useEffect(() => {
    const getArt = async () => {
      const art = await axiosReq(config)
        .then(res => {
          // return res;
          console.log(res.data);
          setIsLoading(false);
          setArt(res.data);
        })
        .catch(e => console.log(e));
    };

    getArt();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppLayout>
      {/* ArtWork */}
      <View className="">
        <View className="flex-row mt-5 items-center justify-between">
          <Text className="text-tertiary text-[25px] font-semibold">
            Artworks
          </Text>

          <Text className="text-tertiary text-[16px] items-center justify-center">
            <Icon name="filter" size={24} color={'black'} />
            Filters
          </Text>
        </View>

        {/* Art */}

        <FlatList
          data={art}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <ArtCard
                name={item?.art_name}
                artist={item.artist}
                price={item.price}
                image={item.image}
                onPress={() => navigation.navigate('Art', {data: item})}
              />
            );
          }}
          keyExtractor={item => item.toString()}
          className="py-5 space-x-3 px-auto"
        />
      </View>

      {/* <View className="my-auto py-5">
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
      </View> */}
    </AppLayout>
  );
}
