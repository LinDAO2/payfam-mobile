import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ITransactionDocument} from '@types/transactions-types';
import {Text} from 'react-native-paper';
import moment from 'moment';

interface Props {
  transaction: ITransactionDocument;
}
const TransactionListItem = ({transaction}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 5,
        margin: 4,
        padding: 3,
      }}>
      <Text variant="bodySmall" style={{textAlign: 'right'}}>
        {moment(transaction.addedOn.toDate()).format('lll')}
      </Text>
      <View style={{alignItems: 'center'}}>
        <Text variant="bodyLarge" style={{color: '#ccc'}}>
          Sent
        </Text>
        <Text variant="bodyLarge">
          {transaction.currency}
          {transaction.amount}
        </Text>
        <Text variant="bodyLarge" style={{color: '#ccc'}}>
          to
        </Text>
        <Text variant="bodyLarge">{transaction.recieverName}</Text>
        <Text variant="bodyLarge">{transaction.recieverPhonenumber}</Text>
        <View
          style={{
            backgroundColor: '#fdd',
            elevation: 5,
            padding: 4,
            borderRadius: 30,
          }}>
          <Text style={{color: transaction.isRedeemed ? 'green' : 'orange'}}>
            {transaction.redemptionCode}
          </Text>
        </View>
        <Text style={{color: transaction.isRedeemed ? 'green' : 'orange'}}>
          {transaction.isRedeemed ? 'Redeemed' : 'Not redeemed'}
        </Text>
      </View>
    </View>
  );
};

export default TransactionListItem;

const styles = StyleSheet.create({});
