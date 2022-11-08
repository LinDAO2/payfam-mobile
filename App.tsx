import AppTheme from '@components/global/AppTheme';
import SplashScreen from '@components/molecules/SplashScreen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@components/global/AppNavigator';

const App = () => {
  return (
    <AppTheme>
      <SplashScreen>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SplashScreen>
    </AppTheme>
  );
};

export default App;
