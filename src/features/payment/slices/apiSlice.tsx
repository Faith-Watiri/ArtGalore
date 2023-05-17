/* eslint-disable @typescript-eslint/no-shadow */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = BASE_URL;

const token = AsyncStorage.getItem('@access_token');

console.log(token);

export const paymentSlice = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    createPaymentIntent: builder.mutation({
      query: async data => {
        const token = await AsyncStorage.getItem('@access_token');
        return {
          url: 'payment-sheets',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {useCreatePaymentIntentMutation} = paymentSlice;
