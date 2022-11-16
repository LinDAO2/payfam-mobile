import {View} from 'react-native';
import React from 'react';
import {IWalletTransactionDocument} from '@types/wallet-types';
import {Text} from 'react-native-paper';
import FormattedAmount from '@components/common/FormattedAmount';
import moment from 'moment';

interface Props {
  transaction: IWalletTransactionDocument;
}

const WalletTransactionListItem = ({transaction}: Props) => {
  return (
    <View
      style={{
        shadowColor:
          transaction.type === 'withdraw' || transaction.type === 'deduction'
            ? `rgba(255,0,0,0.2)`
            : transaction.type === 'sale' ||
              transaction.type === 'top-up' ||
              transaction.type === 'credit'
            ? `rgba(0,255,0,0.2)`
            : '#ccc',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 7,
        padding: 7,
        backgroundColor:
          transaction.type === 'withdraw' || transaction.type === 'deduction'
            ? `rgba(255,0,0,0.2)`
            : transaction.type === 'sale' ||
              transaction.type === 'top-up' ||
              transaction.type === 'credit'
            ? `rgba(0,255,0,0.2)`
            : '#ccc',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text variant="bodySmall" style={{fontWeight: 'bold'}}>
            {transaction.type === 'withdraw'
              ? 'You made a withdrawal'
              : transaction.type === 'sale'
              ? 'You made a sale'
              : transaction.type === 'top-up'
              ? 'Top up'
              : transaction.type === 'deduction'
              ? 'Debit'
              : transaction.type}
          </Text>
        </View>

        <View style={{flex: 2}}>
          <Text>
            <FormattedAmount amount={transaction.amount} />
          </Text>
        </View>
        <View style={{flex: 4}}>
          <Text variant="bodySmall">Remark</Text>

          {transaction.remark !== '' ? (
            <Text variant="bodySmall">{transaction.remark}</Text>
          ) : (
            <Text variant="bodySmall">none</Text>
          )}
        </View>
      </View>
      <Text variant="labelSmall" style={{textAlign: 'right'}}>
        {moment(transaction.addedOn.toDate()).format('lll')}
      </Text>
    </View>
  );
};

export default WalletTransactionListItem;
