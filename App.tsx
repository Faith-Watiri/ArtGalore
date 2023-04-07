import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './src/stack';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="#FFFAF8"
      />
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
