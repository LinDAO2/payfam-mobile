import {View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';
import AddFundsForm from '@components/forms/wallet/AddFundsForm';

interface Props {
  visible: boolean;
  close: any;
}

const WalletAddFundsModal = ({visible, close}: Props) => {
  return (
    <Modal
      animationType="fade"
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
        </View>
        <Text
          variant="headlineMedium"
          style={{textAlign: 'center', marginTop: 100}}>
          Top up balance
        </Text>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12.35,
            elevation: 19,
            backgroundColor: '#fff',
            minHeight: 200,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
            padding: 10,
          }}>
          <AddFundsForm close={close} />
        </View>
      </View>
    </Modal>
  );
};

export default WalletAddFundsModal;
