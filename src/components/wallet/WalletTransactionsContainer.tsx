import {Modal, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IProfilePersonas} from '@types/session-types';
import {Button, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WalletTransactionsList from './WalletTransactionsList';

interface Props {
  userId: string;
  persona: IProfilePersonas;
}

const WalletTransactionsContainer = ({userId, persona}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,

        margin: 5,
        padding: 10,
      }}>
      <Button mode="text" onPress={() => setShowModal(!showModal)}>
        Wallet Transactions
      </Button>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={{backgroundColor: '#ccc', flex: 1}}>
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
              }}>
              <MaterialIcons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <Text variant="headlineMedium" style={{textAlign: 'center'}}>
              Wallet Transactions
            </Text>
            <WalletTransactionsList persona={persona} userId={userId} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalletTransactionsContainer;
