import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

interface Props {
  title: string;
  remark: string;
  addedOn: Date;
  type: 'send' | 'redeem' | 'withdraw' | 'deposit';
}
const NotificationItem = ({type, title, addedOn, remark}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 3,
      }}>
      <View
        style={{
          backgroundColor:
            type === 'send'
              ? '#E0FFF0'
              : type === 'redeem'
              ? '#E0FFF0'
              : type === 'deposit'
              ? '#E0FFF0'
              : type === 'withdraw'
              ? '#FFE0E0'
              : '#fff',
          width: 40,
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        {type === 'send' ? (
          <MaterialCommunityIcons
            name="arrow-collapse-up"
            size={20}
            color="#5EDE99"
          />
        ) : type === 'redeem' ? (
          <MaterialCommunityIcons
            name="arrow-collapse-down"
            size={20}
            color="#5EDE99"
          />
        ) : type === 'deposit' ? (
          <MaterialIcons name="payment" size={20} color="#5EDE99" />
        ) : type === 'withdraw' ? (
          <Fontisto name="wallet" size={20} color="#F26666" />
        ) : (
          <MaterialCommunityIcons
            name="arrow-collapse-up"
            size={20}
            color="#5EDE99"
          />
        )}
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
        <Text>{remark}</Text>
        <Text>{moment(addedOn).format('lll')}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
