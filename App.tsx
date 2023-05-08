import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack, AuthStack} from './src/stack';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/utlis/store';
import {PersistGate} from 'redux-persist/integration/react';
import {getStringData} from './src/lib/helpers/storage.helper';
import {Loading} from './src/components';

const App = () => {
  const token = getStringData('AG_USER_TOKEN');

  console.log(token);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            animated={true}
            backgroundColor="#FFFAF8"
          />
          {!token ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
