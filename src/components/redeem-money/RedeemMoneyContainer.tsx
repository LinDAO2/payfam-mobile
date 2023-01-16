import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RedeemMoneyForm from '@components/forms/redeem-money/RedeemMoneyForm';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';

interface Props {
  modal?: boolean;
  visible?: boolean;
  close?: any;
  redemptionCode?: string;
  recieverPhonenumber?: string;
}
const RedeemMoneyContainer = ({
  modal,
  visible,
  close,
  recieverPhonenumber,
  redemptionCode,
}: Props) => {
  return (
    <>
      {!modal && (
        <View style={styles.container}>
          <RedeemMoneyForm
            recieverPhonenumber={recieverPhonenumber}
            redemptionCode={redemptionCode}
          />
        </View>
      )}

      {modal && visible && close && (
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={() => {
            close();
          }}>
          <View style={{backgroundColor: '#ccc', flex: 1}}>
            <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
              <TouchableOpacity
                onPress={() => {
                  close();
                }}>
                <MaterialIcons name="close" size={30} color="#000" />
              </TouchableOpacity>
              <Text variant="headlineMedium" style={{textAlign: 'center'}}>
                Redeem funds
              </Text>
              <RedeemMoneyForm
                recieverPhonenumber={recieverPhonenumber}
                redemptionCode={redemptionCode}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
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
