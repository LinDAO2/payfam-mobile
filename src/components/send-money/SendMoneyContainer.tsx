import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SendMoneyForm from '@components/forms/send-money/SendMoneyForm';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

interface Props {
  modal?: boolean;
  visible?: boolean;
  close?: any;
}
const SendMoneyContainer = ({modal, visible, close}: Props) => {
  return (
    <>
      {!modal && (
        <View style={styles.container}>
          <SendMoneyForm />
        </View>
      )}
      {modal && visible && close && (
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={() => {
            close();
          }}>
          <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
              <TouchableOpacity
                onPress={() => {
                  close();
                }}>
                <MaterialIcons name="close" size={30} color="#000" />
              </TouchableOpacity>
              <Text variant="headlineMedium" style={{textAlign: 'center'}}>
                Send funds
              </Text>
              <SendMoneyForm />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default SendMoneyContainer;

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: height * 0.8,
  },
});
