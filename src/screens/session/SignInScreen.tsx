import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import SignInForm from '@components/forms/session/SignInForm';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Sign In</Text>

      <SignInForm />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
