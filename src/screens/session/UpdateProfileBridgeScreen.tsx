import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import UpdateProfileForm from '@components/forms/session/UpdateProfileForm';

const UpdateProfileBridgeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Update Profile</Text>
      <UpdateProfileForm />
    </View>
  );
};

export default UpdateProfileBridgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
