import AppTheme from '@components/global/AppTheme';
import SplashScreen from '@components/molecules/SplashScreen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@components/global/AppNavigator';
import AppAuth from '@components/global/AppAuth';
import { Provider } from 'react-redux';
import { store } from '@db/store';

const App = () => {
  return (
    <Provider store={store}>
    <AppTheme>
      <SplashScreen>
        <AppAuth>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppAuth>
      </SplashScreen>
    </AppTheme>
    </Provider>
  );
};

export default App;
