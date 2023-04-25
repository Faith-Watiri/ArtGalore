import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/stack';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="#FFFAF8"
      />
      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default App;
