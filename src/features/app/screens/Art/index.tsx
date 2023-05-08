import {View, Text, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import {AppLayout} from '../../components';
import {PrimaryButton} from '../../../../components';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../cart/slices/cart.slice';
import {useNavigation} from '@react-navigation/native';

type SingleArtProps = {
  route?: any;
};

export function SingleArt({route}: SingleArtProps) {
  const item = route.params.data;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  console.log(item);

  return (
    <AppLayout>
      <View className="flex-row justify-between my-2">
        <TouchableHighlight onPress={() => navigation.gotBack()}>
          <Icon2 name="arrow-left" size={24} color="black" />
        </TouchableHighlight>
        <TouchableHighlight>
          <Icon name="menu" size={24} color="black" />
        </TouchableHighlight>
      </View>
      <View className="relative">
        <Image className="h-96 rounded-xl" source={{uri: item.image}} />
        <TouchableHighlight className="absolute bg-white p-1 rounded-full right-2 top-2">
          <Icon name="share" size={24} color="black" />
        </TouchableHighlight>
      </View>
      <View className="flex-row justify-between items-center my-5">
        <View>
          <Text className="text-tertiary text-[25px] font-semibold">
            {item.art_name}
          </Text>
          <Text className="text-tertiary text-[25px] font-semibold">
            {item?.artist}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-tertiary">
            <Text className="text-tertiary font-extralight">Category: </Text>
            {item?.category}
          </Text>
          <Text className="text-tertiary">
            <Text className="text-tertiary font-extralight">Size: </Text>
            {item?.size}
          </Text>
          <Text className="text-tertiary text-xs">
            Shipped in a Tube
            <Icon name="info-with-circle" color="black" />
          </Text>
          <Text className="text-tertiary text-[18px] font-semibold">
            <Text className="font-light text-[12px]">KES</Text> {item?.price}
          </Text>
        </View>
      </View>

      <PrimaryButton
        name="Add to Cart"
        onPress={() => {
          dispatch(
            addToCart({
              id: item.id,
              name: item.art_name,
              price: item.price,
              image: item.image,
              artist: item.artist,
              quantity: 1,
            }),
          );

          navigation.navigate('Cart');
        }}
      />

      <View className="p-5 ">
        <Icon name="check" size={18} color="green">
          <Text className="text-tertiary text-[12px]">Shipping include</Text>
        </Icon>
        <Icon name="check" size={18} color="green">
          <Text className="text-tertiary text-[12px]">
            7 day money - back gurantee
            <Icon name="info-with-circle" color="black" />
          </Text>
        </Icon>
      </View>
    </AppLayout>
  );
}
