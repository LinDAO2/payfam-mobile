import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {IProfilePersonas, IProfileWallet} from '@types/session-types';
import {Text} from 'react-native-paper';
import FormattedAmount from '@components/common/FormattedAmount';
import WalletBankAccountInfo from './WalletBankAccountInfo';
import WalletActions from './WalletActions';
import WalletTransactionsContainer from './WalletTransactionsContainer';

interface Props {
  userId: string;
  wallet: IProfileWallet | undefined;
  persona: IProfilePersonas;
}

const WalletContainer = ({userId, wallet, persona}: Props) => {
  return (
    <ScrollView style={{marginTop: 20, paddingBottom: 50}}>
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
          flexDirection: 'row',
          margin: 5,
        }}>
        <View style={{borderRadius: 1, marginBottom: 5, flex: 1}}>
          <Text variant="labelMedium" style={{margin: 5, textAlign: 'center'}}>
            Available for withdraw
          </Text>

          <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
            <FormattedAmount amount={wallet?.balance ? wallet?.balance : 0} />
          </Text>
        </View>
        <View style={{borderRadius: 1, marginBottom: 5, flex: 1}}>
          <Text variant="labelMedium" style={{margin: 5, textAlign: 'center'}}>
            Credit
          </Text>

          <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
            <FormattedAmount amount={wallet?.credit ? wallet?.credit : 0} />
          </Text>
        </View>
      </View>
      <WalletTransactionsContainer persona={persona} userId={userId} />
      {wallet !== undefined && (
        <>
          <WalletBankAccountInfo wallet={wallet} />
        </>
      )}
      <WalletActions wallet={wallet} persona={persona} userId={userId} />
    </ScrollView>
  );
};

export default WalletContainer;

const styles = StyleSheet.create({});
