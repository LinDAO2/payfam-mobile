import {StyleSheet, View} from 'react-native';
import React from 'react';
import RedeemMoneyForm from '@components/forms/redeem-money/RedeemMoneyForm';

const RedeemMoneyContainer = () => {
  return (
    <View style={styles.container}>
      <RedeemMoneyForm />
    </View>
  );
};

export default RedeemMoneyContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    padding: 5,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
});
