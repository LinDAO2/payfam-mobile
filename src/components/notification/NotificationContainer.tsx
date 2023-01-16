import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {generateUUIDV4} from '@utils/funcs';
import NotificationItem from './NotificationItem';
import moment from 'moment';

interface INotification {
  title: string;
  remark: string;
  addedOn: Date;
  type: 'send' | 'redeem' | 'withdraw' | 'deposit';
}

const NotificationContainer = () => {
  const [showModal, setShowModal] = useState(false);

  const DATA: INotification[] = [
    {
      title: 'Sent',
      remark: 'You have sent 200 GHS to Eric',
      addedOn: moment().toDate(),
      type: 'send',
    },
    {
      title: 'Redeemed',
      remark: 'You have redeemed 300 USDT',
      addedOn: moment().toDate(),
      type: 'redeem',
    },
    {
      title: 'Deposit',
      remark: 'You have deposited 30 USDT into your wallet',
      addedOn: moment().toDate(),
      type: 'deposit',
    },
    {
      title: 'Withdrawal',
      remark: 'You have withdrawn 1,000,000 NGN into your bank account',
      addedOn: moment().toDate(),
      type: 'withdraw',
    },
  ];
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowModal(!showModal);
        }}>
        <MaterialIcons name="notifications" size={30} color="#000" />
      </TouchableOpacity>
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

            <FlatList
              data={DATA}
              keyExtractor={_iten => generateUUIDV4()}
              renderItem={({item}) => <NotificationItem {...item} />}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NotificationContainer;

const styles = StyleSheet.create({});
