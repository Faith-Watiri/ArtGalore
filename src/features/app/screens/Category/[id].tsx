import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppLayout} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../../../lib/constants';
import {useSelector} from 'react-redux';
import {selectCart} from '../../../cart/slices/cart.slice';
import {Loading} from '../../../../components';
import {axiosReq} from '../../../../utlis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import ArtCard from '../../../../components/Elements/Cards/ArtCard';

interface CategoryProps {
  route: any;
}

export function Category({route}: CategoryProps) {
  const data = route?.params.data;

  const [art, setArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const [token, setToken] = useState<String | null>(null);
  console.log(token);

  const cart = useSelector(selectCart);

  const getTotalQuantity = () => {
    let total = 0;

    cart.forEach(item => {
      console.log(item);
      total += item.quantity;
    });

    return total;
  };

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('@access_token');
      setToken(storedToken);
      setIsLoading(false);
    };

    const fetchData = async () => {
      try {
        const config: AxiosConfig = {
          url: `${BASE_URL}/art`,
          method: 'GET',
          bearerToken: token,
        };
        const response = await axiosReq(config);
        const filteredArt = response.data.filter(
          item => item?.category === data.name,
        );
        setArt(filteredArt);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    checkToken();
  }, [data.name, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppLayout>
      <View className="">
        <View className="flex-row mt-5 items-center justify-between">
          <Text className="text-tertiary text-[25px] font-semibold">
            {data.name}
          </Text>

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

        <FlatList
          data={art}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <>
                {item ? (
                  <>
                    <ArtCard
                      name={item?.art_name}
                      artist={item.artist}
                      price={item.price}
                      image={item.image}
                      onPress={() => navigation.navigate('Art', {data: item})}
                    />
                  </>
                ) : (
                  <Text className="text-primary">
                    There is no art in the {data.name} category
                  </Text>
                )}
              </>
            );
          }}
          keyExtractor={item => item.toString()}
          className="py-5 space-x-3 px-auto"
        />
      </View>
    </AppLayout>
  );
}
