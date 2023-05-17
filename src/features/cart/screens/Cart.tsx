import {View, Text, Image, TouchableHighlight, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCart,
} from '../slices/cart.slice';
import {AppLayout} from '../../app/components';
import Icon from 'react-native-vector-icons/Feather';
import Bin from 'react-native-vector-icons/MaterialIcons';
import {PrimaryButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {useCreatePaymentIntentMutation} from '../../payment/slices/apiSlice';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'react-native';

type CartItemProps = {
  id: string;
  image: string;
  art_name: string;
  price: number;
  quantity: number;
};

function CartItem({id, image, art_name, price, quantity = 0}: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <View
      className="flex-row items-center justify-between"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 10,
      }}>
      <View>
        <Image
          className="h-12 rounded-lg"
          source={{uri: image}}
          alt={art_name}
        />
        <View>
          <Text>{art_name}</Text>
          <Text>KES {price}</Text>
        </View>
      </View>

      <View className="items-center space-y-4">
        <View className="flex-row items-center space-x-2">
          <TouchableHighlight onPress={() => dispatch(incrementQuantity(id))}>
            <Icon name="plus-circle" size={24} color="black" />
          </TouchableHighlight>
          <Text className="text-tertiary">{quantity}</Text>
          <TouchableHighlight onPress={() => dispatch(decrementQuantity(id))}>
            <Icon name="minus-circle" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => dispatch(removeFromCart(id))}>
          <Bin name="delete-outline" size={24} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function Cart() {
  const cart = useSelector(selectCart);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const navigation = useNavigation();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    });

    return {totalQuantity, totalPrice};
  };

  const onCheckout = async () => {
    const response = await createPaymentIntent({
      amount: Math.floor(getTotal().totalPrice),
    });
    console.log(response);
    if (response.error) {
      Alert.alert('Something went wrong', JSON.stringify(response));
      return;
    }

    // 2. Initialize the Payment sheet
    const {error: paymentSheetError} = await initPaymentSheet({
      merchantDisplayName: 'Art Galore',
      paymentIntentClientSecret: response.data.paymentIntent,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (paymentSheetError) {
      Alert.alert(
        'Something went wrong',
        JSON.stringify(paymentSheetError.message),
      );
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const {error: paymentError} = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(
        `Error code: ${paymentError.code}`,
        JSON.stringify(paymentError.message),
      );
      return;
    }
  };

  return (
    <AppLayout>
      <View className="flex-row justify-between">
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          className="rounded-full p-1">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableHighlight>
        <Text className="text-tertiary text-center text-xl font-bold">
          Shopping Basket
        </Text>
      </View>

      <ScrollView className="py-7">
        {cart?.map((item: any) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.image}
            art_name={item.art_name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </ScrollView>
      <View className="my-10">
        <Text className="text-primary text-lg uppercase">Order Summary</Text>

        <View className="mb-2 flex-row items-center space-x-2">
          <Text className="text-tertiary text-center  ">
            total ({getTotal().totalQuantity} items):
          </Text>
          <Text className="text-tertiary text-center text-lg font-bold">
            <Text className="">KES</Text> {getTotal().totalPrice}
          </Text>
        </View>
      </View>

      {getTotal().totalQuantity > 0 ? (
        <PrimaryButton name="Checkout" onPress={onCheckout} />
      ) : (
        <Text className="text-tertiary text-center text-lg font-bold">
          Your cart is empty
        </Text>
      )}
    </AppLayout>
  );
}
