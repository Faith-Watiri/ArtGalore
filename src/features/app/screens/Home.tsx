/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
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
import {useSelector} from 'react-redux';
import {selectCart} from '../../cart/slices/cart.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeScreen() {
  // const {width} = useWindowDimensions();
  const [art, setArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const [token, setToken] = useState(null);

  const cart = useSelector(selectCart);

  console.log(token);

  const getTotalQuantity = () => {
    let total = 0;

    cart.forEach(item => {
      console.log(item);
      total += item.quantity;
    });

    return total;
  };

  const config: AxiosConfig = {
    url: `${BASE_URL}/art`,
    method: 'GET',
    data: art,
    bearerToken: token,
  };

  const [key] = useState('default');

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('@access_token');
      setToken(storedToken);
      setIsLoading(false);
    };

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

    checkToken();
    getArt();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppLayout>
      {/* ArtWork */}
      <View className="">
        <View className="flex-row mt-5 items-center justify-between">
          <Text className="text-tertiary text-[25px] font-semibold">Art</Text>

          <TouchableHighlight
            onPress={() => navigation.navigate('Cart')}
            className="relative border p-2 items-center justify-center rounded-full">
            <View className="">
              <Icon name="shopping-cart" size={24} color="black" />

              <View className="absolute -top-4 -right-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                <Text className="text-white text-[10px] font-semibold">
                  {getTotalQuantity()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
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
