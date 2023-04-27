/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { AuthLayout } from '../components';
import { FormInput, RadioCheckButton } from '../../../components';
import { BASE_URL } from '../../../lib/constants';
import { axiosReq } from '../../../utlis/axios';
import { useNavigation } from '@react-navigation/native';

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [data, setData] = useState([])

    const navigation = useNavigation()

    const handlePress = (value: string) => {
        setRole(value)
    }

    const config: AxiosConfig = {
        url: `${BASE_URL}/auth/register`,
        method: 'POST',
        data: data
    }

    const onSubmit = async () => {
        setData({ ...data, name, email, password, role });

        const res = await axiosReq(config)

        if (res.status === 201) {
            navigation.navigate('Login')
            ToastAndroid.showWithGravityAndOffset(
                'User created successfully!',
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG,
                25,
                50,
            )
        } else {
            ToastAndroid.showWithGravityAndOffset(
                `${res.status}`,
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG,
                25,
                50,
            )
        }
    }



    // console.log(data)

    return (
        <AuthLayout
            pageTitle='Sign Up'
            accountCheck='Have an account?'
            screen='Login'
            action='Create account'
            onPress={onSubmit}
        >
            <FormInput
                value={name}
                placeholder=''
                label='Name'
                onChangeText={(text: React.SetStateAction<string>) => setName(text)}
                secureTextEntry={false}
            />
            <FormInput
                value={email}
                placeholder=''
                label='Email'
                onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                secureTextEntry={false}
            />
            <FormInput
                value={password}
                placeholder=''
                label='Password'
                onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                secureTextEntry={true}
            />
            <FormInput
                value={confirmPassword}
                placeholder=''
                label='Confirm Password'
                onChangeText={(text: React.SetStateAction<string>) => setConfirmPassword(text)}
                secureTextEntry={true}
            />

            <View className='flex-row justify-around my-3'>
                <RadioCheckButton
                    value='COLLECTOR'
                    label='Collector'
                    onPress={handlePress}
                    status={role === 'Creator' ? 'checked' : 'unchecked'}
                />
                <RadioCheckButton
                    value='ARTIST'
                    label='Artist'
                    onPress={handlePress}
                    status={role === 'Artist' ? 'checked' : 'unchecked'}
                />
            </View>

        </AuthLayout>
    );
}