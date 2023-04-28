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

export default function ArtCard() {
  return (
    <View className="">
      <View className="relative h-44 w-40 border-transparent rounded-lg">
        <Image source={Paying} className="absolute w-full h-full rounded-lg" />
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
          <Text className="text-tertiary font-bold text-[16px]">
            Fresh Fish
          </Text>
          <Text className="text-tertiary font-light text-[12px]">
            Miss Anile
          </Text>
          <Text className="text-tertiary font-semibold text-[13px]">
            KES 500
          </Text>
        </View>
        <Icon name="dot-menu" size={15} color="black" />
      </View>
    </View>
  );
}
