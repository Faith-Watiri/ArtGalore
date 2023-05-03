import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './src/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/utlis/store';
import { getObjectData } from './src/lib/helpers/storage.helper';

const App = () => {
  const token = getObjectData('AG_USER_TOKEN')

  console.log(token)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor="#FFFAF8"
        />
        {!token ? <AuthStack />
          : <AppStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
