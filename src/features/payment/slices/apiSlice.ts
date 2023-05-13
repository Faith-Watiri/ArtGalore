import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../../lib/constants';
import { useState } from 'react';

const baseUrl = BASE_URL;



export const paymentSlice = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    createPaymentIntent: builder.mutation({
      query: data => ({
        url: 'payment-sheets',
        method: 'POST',
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4Mzk5Nzg4OCwiZXhwIjoxNjg0MDAxNDg4fQ.4OlLieoa05s26XFpdIfMQN2Og2ibcQis1Ck0g4CCMAA`,
        },
        body: data,
      }),
    }),
  }),
});

export const {useCreatePaymentIntentMutation} = paymentSlice;
