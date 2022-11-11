import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import SendMoneyForm from '@components/forms/send-money/SendMoneyForm';
const {width, height} = Dimensions.get('window');

const SendMoneyContainer = () => {
  return (
    <View style={styles.container}>
      <SendMoneyForm />
    </View>
  );
};

export default SendMoneyContainer;

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: height * 0.8,
    justifyContent:'center'
  },
});
