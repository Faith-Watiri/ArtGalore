/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AuthLayout } from '../components';
import { FormInput, RadioCheckButton } from '../../../components';
import { BASE_URL } from '../../../lib/constants';
import { axiosReq } from '../../../utlis/axios';

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [data, setData] = useState([])

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

        console.log(res.data)
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