import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './src/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/utlis/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor="#FFFAF8"
        />
        <AuthStack />
        {/* <AppStack /> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
