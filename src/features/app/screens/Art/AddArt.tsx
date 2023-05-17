// import { View, Text } from 'react-native'
// import React from 'react'

// export function AddArtScreen() {
//   return (
//     <View>
//       <Text>AddArt</Text>
//     </View>
//   )
// }

import {View, Text, TouchableOpacity, Button, Image} from 'react-native';
import React, {useState} from 'react';
import {AppLayout} from '../../components/Layout';
import Icon from 'react-native-vector-icons/Feather';
import {FormInput, PrimaryButton} from '../../../../components';
import {  } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

export function AddArtScreen() {
  const [imageUri, setImageUri] = useState(null);

  const opPressButton = () => {
    const options = {
      mediaType: 'photo', // Specify the media type you want to allow (photo, video, or mixed)
      includeBase64: false, // Set to true if you want to include the image data as base64-encoded string
      maxHeight: 500, // Set the maximum height of the image
      maxWidth: 500, // Set the maximum width of the image
      quality: 0.8, // Set the image quality (0 to 1)
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else if (response.uri) {
        console.log('Image URI:', response.uri);
        setImageUri(response.uri);
      }
    });
  };

  const postArt = () => {
    console.log('post art');
  };

  return (
    <AppLayout>
      <View className="border-primary border-2 w-full h-48 rounded-lg items-center justify-center">
        {imageUri && (
          <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
        )}
        <Button title="Select Image" onPress={opPressButton} />

        {/* <TouchableOpacity
          className="p-3 border rounded-full"
          onPress={() => opPressButton()}>
          <Icon name="upload" size={30} color="#6F3744" />
        </TouchableOpacity>
        <Text className="text-primary font-semibold">Upload an Image</Text> */}
      </View>

      <View>
        <FormInput label="Name of Work" />
        <View className="flex-row justify-around">
          <FormInput label="Price" />
          <FormInput label="Size" />
          <FormInput label="Material" />
        </View>
      </View>

      <PrimaryButton name="Post" onPress={postArt} />
    </AppLayout>
  );
}
