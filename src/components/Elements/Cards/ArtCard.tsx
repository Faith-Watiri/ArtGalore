import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Paying from '../../../assets/painting.jpg';
import DotMenu from 'react-native-vector-icons/MaterialCommunityIcons';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

type ArtCardProps = {
  name: string;
  price: Float;
  image: string;
  artist: string;
  onPress: () => void;
};

export default function ArtCard({name, price, image, artist, onPress}: ArtCardProps) {
  return (
    <View className="">
      <View className="relative h-44 w-40 border-transparent rounded-lg">
        <Image
          source={{
            uri: image,
          }}
          className="absolute w-full h-full rounded-lg"
        />
        <View className="absolute right-2 top-2">
          <View className="flex-row space-x-3">
            <TouchableOpacity className="p-2 bg-white rounded-full">
              <Icon name="heart" size={14} color="#6F3744" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-white rounded-full">
              <Icon name="shopping-cart" size={14} color="#6F3744" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between w-40 p-3">
        <View>
          <Text className="text-tertiary font-bold text-[16px]">{name}</Text>
          <Text className="text-tertiary font-light text-[12px]">{artist}</Text>
          <Text className="text-tertiary font-semibold text-[13px]">
            KES {price}
          </Text>
        </View>
        <TouchableHighlight onPress={onPress} className="p-1 h-6 w-8 items-center justify-center rounded-full">
          <DotMenu name="dots-horizontal" size={15} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
