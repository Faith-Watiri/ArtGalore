import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../features/auth/slices/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components';
import {AppStack, AuthStack} from './index';

export default function Navigator() {
  const isSignedIn = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<String | null>(null);

  // console.log(token);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('@access_token');
      setToken(storedToken);
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{token ? <AppStack /> : <AuthStack />}</>;
}
