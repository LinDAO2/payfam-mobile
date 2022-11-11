import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '@screens/OnboardingScreen';
import MainScreen from '@screens/MainScreen';
import SignInScreen from '@screens/session/SignInScreen';
import UpdateProfileBridgeScreen from '@screens/session/UpdateProfileBridgeScreen';
import AccountScreen from '@screens/AccountScreen';
import BackButton from '@components/common/BackButton';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="UpdateProfileBridgeScreen"
        component={UpdateProfileBridgeScreen}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerShown: true,
          headerTitle:()=>null
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
