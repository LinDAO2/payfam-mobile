import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ITransactionDocument} from '@types/transactions-types';
import {Text} from 'react-native-paper';
import moment from 'moment';
import FormattedAmount from '@components/common/FormattedAmount';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  transaction: ITransactionDocument;
}
const TransactionListItem = ({transaction}: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(transaction.redemptionCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

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
        padding: 7,
      }}>
      <Text variant="bodySmall" style={{textAlign: 'right'}}>
        {moment(transaction.addedOn.toDate()).format('lll')}
      </Text>
      <View>
        {/* <Text variant="bodyLarge" style={{color: '#ccc'}}>
          Sent
        </Text> */}
        <Text variant="bodyLarge">
          <FormattedAmount
            amount={transaction.amount}
            currency={transaction.currency}
          />
        </Text>

        <Text variant="bodyLarge" style={{color: '#ccc'}}>
          {transaction.isRedeemed ? 'From' : 'To'}
        </Text>
        {transaction.isRedeemed ? (
          <>
            <Text variant="bodyLarge">
              {transaction?.senderName
                ? transaction?.senderName
                : transaction.recieverName}
            </Text>
            <Text variant="bodyLarge">
              {transaction?.senderPhonenumber
                ? transaction?.senderPhonenumber
                : transaction.recieverPhonenumber}
            </Text>
          </>
        ) : (
          <>
            <Text variant="bodyLarge">{transaction.recieverName}</Text>
            <Text variant="bodyLarge">{transaction.recieverPhonenumber}</Text>
          </>
        )}
        {transaction?.redeemedcurrency && (
          <Text variant="bodySmall">
            redeemed to{' '}
            <FormattedAmount
              amount={transaction.amount}
              currency={transaction?.redeemedcurrency}
            />
          </Text>
        )}

        <View style={{position: 'absolute', bottom: 0, right: 0}}>
          <TouchableOpacity onPress={copyToClipboard}>
            <View
              style={{
                backgroundColor: copied ? '#fff' : '#fdd',
                elevation: 5,
                padding: 4,
                borderRadius: 30,
              }}>
              <Text
                style={{
                  color: copied
                    ? '#000'
                    : transaction.isRedeemed
                    ? 'green'
                    : 'orange',
                  textAlign: 'center',
                }}>
                {copied ? 'Copied!' : transaction.redemptionCode}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={{color: transaction.isRedeemed ? 'green' : 'orange'}}>
            {transaction.isRedeemed ? 'Redeemed' : 'Not redeemed'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionListItem;

const styles = StyleSheet.create({});
