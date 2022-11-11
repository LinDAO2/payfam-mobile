import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import UpdateProfileForm from '@components/forms/session/UpdateProfileForm';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">My Account</Text>
      <UpdateProfileForm />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
