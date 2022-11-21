import {Dimensions, Image, ScrollView, View} from 'react-native';
import React from 'react';
import {IProfilePersonas, IProfileWallet} from '@types/session-types';
import {Button, Text} from 'react-native-paper';
import FormattedAmount from '@components/common/FormattedAmount';

import WalletTransactionsContainer from './WalletTransactionsContainer';
import {getCurrencyImage} from '@helpers/collection-helpers';
import Spacer from '@components/common/Spacer';

const {height} = Dimensions.get('screen');
interface Props {
  userId: string;
  wallet: IProfileWallet | undefined;
  persona: IProfilePersonas;
}

const WalletContainer = ({userId, wallet, persona}: Props) => {
  return (
    <ScrollView
      style={{
        marginTop: 20,
        paddingBottom: 50,
        height,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }}
      bounces={false}>
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
          padding: 5,
        }}>
        <View
          style={{
            borderRadius: 1,
            marginBottom: 5,
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={getCurrencyImage('NGN')}
            style={{width: 90, height: 90}}
          />

          <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
            <FormattedAmount amount={wallet?.balance ? wallet?.balance : 0} />
          </Text>
        </View>
        <View style={{borderRadius: 1, marginBottom: 5, flex: 1}}>
          <Spacer space={10} />
          <Button mode="contained">Add bank account</Button>
          <Spacer space={10} />
          <Button mode="contained">Top up balance</Button>
          <Spacer space={10} />
          <Button mode="contained">Withdraw</Button>
          <Spacer space={10} />
        </View>
      </View>
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
          padding: 5,
        }}>
        <View
          style={{
            borderRadius: 1,
            marginBottom: 5,
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={getCurrencyImage('GHS')}
            style={{width: 90, height: 90}}
          />

          <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
            <FormattedAmount
              amount={wallet?.ghsBalance ? wallet?.ghsBalance : 0}
              currency="GHS"
              actual
            />
          </Text>
        </View>
        <View style={{borderRadius: 1, marginBottom: 5, flex: 1}}>
          <Spacer space={10} />
          <Button mode="contained">Add mobile money</Button>
          <Spacer space={10} />
          <Button mode="contained">Add bank account</Button>
          <Spacer space={10} />
          <Button mode="contained">Top up balance</Button>
          <Spacer space={10} />
          <Button mode="contained">Withdraw</Button>
          <Spacer space={10} />
        </View>
      </View>

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
          padding: 5,
        }}>
        <View
          style={{
            borderRadius: 1,
            marginBottom: 5,
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={getCurrencyImage('USDT')}
            style={{width: 90, height: 90}}
          />

          <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
            <FormattedAmount
              amount={wallet?.usdtBalance ? wallet?.usdtBalance : 0}
              currency="USDT"
              actual
            />
          </Text>
        </View>
        <View style={{borderRadius: 1, marginBottom: 5, flex: 1}}>
          <Spacer space={10} />
          <Button mode="contained">Add wallet</Button>
          <Spacer space={10} />
          <Button mode="contained">Top up balance</Button>
          <Spacer space={10} />
          <Button mode="contained">Withdraw</Button>
          <Spacer space={10} />
        </View>
      </View>

      <WalletTransactionsContainer persona={persona} userId={userId} />
      <Spacer space={300} />
    </ScrollView>
  );
};

export default WalletContainer;
