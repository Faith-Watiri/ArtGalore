import React, {} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/utlis/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Navigator from './src/stack/Navigator';
import {Loading} from './src/components';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer>
          <StripeProvider publishableKey="pk_test_51N41wCKvbhlMKkRFilEcEs3gF0FhFXA4df4vKJGhUpuPQGhNAscwUuuZNOpfCcwsdXtY9x02Ygm3krayWsJftZdX00IL8Mhy5W">
            <StatusBar
              barStyle="dark-content"
              animated={true}
              backgroundColor="#FFFAF8"
            />
            <Navigator />
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
