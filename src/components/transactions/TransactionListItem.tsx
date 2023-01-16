import {Image, View} from 'react-native';
import React, {useState} from 'react';
import {ITransactionDocument} from '@types/transactions-types';
import {Button, Text} from 'react-native-paper';
import moment from 'moment';
import {useSession} from '@hooks/app-hooks';
import Spacer from '@components/common/Spacer';
import {getFormattedDinero} from '@utils/funcs';
import RedeemMoneyContainer from '@components/redeem-money/RedeemMoneyContainer';

interface Props {
  transaction: ITransactionDocument;
}
const TransactionListItem = ({transaction}: Props) => {
  const profileUID = useSession().uid;
  const [showRedeemFundsModal, setShowRedeemFundsModal] = useState(false);
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
        minHeight: 100,
      }}>
      <Text variant="bodySmall" style={{textAlign: 'right'}}>
        {moment(transaction.addedOn.toDate()).format('lll')}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: `https://avatars.dicebear.com/api/pixel-art/${transaction.recieverName}.png`,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
        </View>
        <View style={{flex: 4}}>
          {transaction.isRedeemed ? (
            <>
              <Text variant="titleMedium">
                {transaction?.senderName
                  ? transaction?.senderName
                  : transaction.recieverName}
              </Text>
              <Text variant="labelSmall">
                {transaction?.senderPhonenumber
                  ? transaction?.senderPhonenumber
                  : transaction.recieverPhonenumber}
              </Text>
            </>
          ) : (
            <>
              <Text variant="titleMedium">{transaction.recieverName}</Text>
              <Text variant="labelSmall">
                {transaction.recieverPhonenumber}
              </Text>
            </>
          )}
          <Spacer space={5} />
          <Text variant="bodySmall" style={{color: '#ccc'}}>
            {profileUID === transaction.senderID
              ? `You just sent ${getFormattedDinero({
                  amount: transaction.amount,
                  currency: transaction?.redeemedcurrency,
                })} to ${transaction.recieverPhonenumber} via ${
                  transaction.paymentOption
                }`
              : ``}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {transaction.isRedeemed && (
          <Text style={{color: 'green'}}>Redeemed</Text>
        )}
        {transaction.isRedeemed == false && (
          <Button
            buttonColor="#142C8E"
            textColor="#fff"
            onPress={() => {
              setShowRedeemFundsModal(!showRedeemFundsModal);
            }}>
            Redeem Funds
          </Button>
        )}
        {/* {transaction.isRedeemed == false && transaction.senderID !== profileUID  && <Button
            buttonColor="#142C8E"
            textColor="#fff"
            onPress={() => {
              setShowRedeemFundsModal(!showRedeemFundsModal);
            }}>
            Redeem Funds
          </Button>} */}
        <RedeemMoneyContainer
          modal
          visible={showRedeemFundsModal}
          close={() => setShowRedeemFundsModal(false)}
          recieverPhonenumber={transaction.recieverPhonenumber}
          redemptionCode={transaction.redemptionCode}
        />
      </View>
    </View>
  );
};

export default TransactionListItem;
