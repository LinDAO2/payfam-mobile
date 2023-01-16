import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {useSession} from '@hooks/app-hooks';
import {getCurrencyImage} from '@helpers/collection-helpers';
import FormattedAmount from '@components/common/FormattedAmount';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {generateUUIDV4} from '@utils/funcs';
import {ITransactionCurrency} from '@types/transactions-types';

const HomeBalanceSummary = () => {
  const wallet = useSession().wallet;

  const BALANCES_LIST = [
    {
      title: 'NGN',
      amount: wallet?.balance ? wallet?.balance : 0,
    },
    {
      title: 'GHS',
      amount: wallet?.ghsBalance ? wallet?.ghsBalance : 0,
    },
    {
      title: 'USDT',
      amount: wallet?.usdtBalance ? wallet?.usdtBalance : 0,
    },
  ];
  const [setshowBalance, setsetshowBalance] = useState([false, false, false]);
  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFD140',
        padding: 10,
        minHeight: 200,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Image
          source={require('assets/images/500x500.png')}
          style={{width: 44, height: 44}}
        />
        <Text variant="headlineSmall">Balances</Text>
      </View>
      {BALANCES_LIST.map((item, index) => (
        <View
          key={generateUUIDV4()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={getCurrencyImage(item.title as ITransactionCurrency)}
              style={{width: 30, height: 30}}
            />

            <Text variant="labelLarge" style={{margin: 5, textAlign: 'center'}}>
              {setshowBalance[index] ? (
                <FormattedAmount amount={item.amount} />
              ) : (
                'XXXXXXXXXXXXXXXXXX'
              )}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (index === 0) {
                setsetshowBalance([
                  !setshowBalance[0],
                  setshowBalance[1],
                  setshowBalance[2],
                ]);
              } else if (index === 1) {
                setsetshowBalance([
                  setshowBalance[0],
                  !setshowBalance[1],
                  setshowBalance[2],
                ]);
              } else if (index === 2) {
                setsetshowBalance([
                  setshowBalance[0],
                  setshowBalance[1],
                  !setshowBalance[2],
                ]);
              } else {
              }
            }}>
            <Ionicons
              name={setshowBalance[index] ? 'eye' : 'eye-off'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default HomeBalanceSummary;
