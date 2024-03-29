import {Alert, Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {
  ITransactionCurrency,
  ITransactionDocument,
} from '@types/transactions-types';
import {useSession} from '@hooks/app-hooks';
import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from 'contants/collections';
import {collectionServices} from '@services/root';

import {generateUUIDV4, getIntFromDinero} from '@utils/funcs';
import FormattedAmount from '@components/common/FormattedAmount';
import {getCurrencyImage} from '@helpers/collection-helpers';
import {setProfileReload} from '@helpers/session-helpers';

interface Props {
  redemptionCode?: string;
  recieverPhonenumber?: string;
}
const RedeemMoneyForm = ({redemptionCode, recieverPhonenumber}: Props) => {
  const STEPS = ['Select currency', 'Redeem'];
  const [activeStep, setActiveStep] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [transaction, setTransaction] = useState<
    ITransactionDocument | undefined
  >(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const profileUID = useSession().uid;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  useEffect(() => {
    (async () => {
      if (redemptionCode && recieverPhonenumber) {
        setProcessing(true);
        const query = firestore()
          .collection(COLLECTIONS.transactions)
          .where('recieverPhonenumber', '==', recieverPhonenumber)
          .where('redemptionCode', '==', redemptionCode)
          .orderBy('addedOn', 'desc');

        const {status, list, errorMessage} = await collectionServices.getDocs(
          query,
        );

        if (status === 'success' && list) {
          const _transaction = list[0] as ITransactionDocument;

          setTransaction(_transaction);
          if (_transaction.isRedeemed) {
            Alert.alert('This redmption code is used already');
          } else {
          
          }
          setProcessing(false);
        }

        if (status === 'error' && errorMessage) {
          Alert.alert('Ooops!!', errorMessage);
          setProcessing(false);
        }
      }
    })();
  }, [recieverPhonenumber, redemptionCode]);

  const CURRENCY_LIST = [
    {
      title: 'Naira',
      symbol: 'NGN',
      action: () => {},
    },
    {
      title: 'Cedis',
      symbol: 'GHS',
      action: () => {},
    },
    {
      title: 'USDT',
      symbol: 'USDT',
      action: () => {},
    },
  ];

  return (
    <View>
      <View
        style={{
          marginBottom: 10,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          borderStyle: 'solid',
        }}>
        <Text variant="headlineSmall" style={{textAlign: 'center'}}>
          {STEPS[activeStep]}
        </Text>
        <View style={{position: 'absolute', bottom: 0, right: 0}}>
          <Text variant="bodyMedium" style={{textAlign: 'center'}}>
            {activeStep + 1}/{STEPS.length}
          </Text>
        </View>
      </View>

      {activeStep === 0 && (
        <>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              },
              selectedCurrency !== ''
                ? {
                    marginBottom: 10,
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                  }
                : {},
            ]}>
            {CURRENCY_LIST.map(item => (
              <TouchableOpacity
                key={generateUUIDV4()}
                onPress={() => {
                  setSelectedCurrency(item.symbol);
                }}>
                <View
                  style={[
                    {alignItems: 'center', marginVertical: 10, padding: 10},
                    selectedCurrency === item.symbol
                      ? {
                          borderWidth: 2,
                          borderStyle: 'solid',
                          borderColor: 'gold',
                          borderRadius: 20,
                        }
                      : {},
                  ]}>
                  <Image
                    source={getCurrencyImage(
                      item.symbol as ITransactionCurrency,
                    )}
                    style={{width: 60, height: 60}}
                  />
                  {selectedCurrency === item.symbol && (
                    <View style={{position: 'absolute', top: 0, right: 0}}>
                      <Image
                        source={require('assets/images/check.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {transaction && selectedCurrency !== '' && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{textAlign: 'center'}}>
                  <Text variant="bodySmall">Sent</Text>
                  {`\n`}
                  <FormattedAmount
                    amount={transaction.amount}
                    currency={transaction.currency}
                  />
                </Text>
                <Text style={{textAlign: 'center'}}>
                  <Text variant="bodySmall">You get</Text>
                  {`\n`}
                  <FormattedAmount
                    amount={transaction.amount}
                    currency={selectedCurrency as ITransactionCurrency}
                  />
                </Text>
              </View>
              <Button
                loading={processing}
                disabled={processing}
                mode="contained-tonal"
                style={{marginTop: 30}}
                onPress={() => {
                  handleNext();
                }}>
                Proceed
              </Button>
            </>
          )}
        </>
      )}
      {activeStep === 1 && transaction && (
        <>
          <View style={{alignItems: 'center'}}>
            <Image
              source={getCurrencyImage(
                selectedCurrency as ITransactionCurrency,
              )}
              style={{width: 90, height: 90}}
            />

            <Text style={{textAlign: 'center', marginVertical: 20}}>
              <Text variant="bodySmall">You will get</Text>
              {`\n`}
              <FormattedAmount
                amount={transaction.amount}
                currency={selectedCurrency as ITransactionCurrency}
              />
              {`\n`}
              <Text variant="bodySmall">In your balance </Text>
            </Text>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <Button mode="contained-tonal" onPress={() => setActiveStep(0)}>
                Back
              </Button>
              <Button
                loading={processing}
                mode="contained-tonal"
                onPress={async () => {
                  setProcessing(true);
                  let _input: any = {};

                  if (selectedCurrency === 'NGN') {
                    _input = {
                      ngnBalance: firestore.FieldValue.increment(
                        getIntFromDinero({
                          amount: transaction.amount,
                          currency: 'NGN',
                        }),
                      ),
                    };
                  }
                  if (selectedCurrency === 'GHS') {
                    _input = {
                      ghsBalance: firestore.FieldValue.increment(
                        getIntFromDinero({
                          amount: transaction.amount,
                          currency: 'GHS',
                        }),
                      ),
                    };
                  }
                  if (selectedCurrency === 'USDT') {
                    _input = {
                      usdtBalance: firestore.FieldValue.increment(
                        getIntFromDinero({
                          amount: transaction.amount,
                          currency: 'USDT',
                        }),
                      ),
                    };
                  }

                  const {status, errorMessage} =
                    await collectionServices.updateDocWithMerge(
                      COLLECTIONS.profiles,
                      profileUID,
                      {
                        wallet: {
                          ..._input,
                        },
                      },
                    );

                  if (status === 'success') {
                    const {
                      status: UpdateTransStatus,
                      errorMessage: UpdateTransErrMsg,
                    } = await collectionServices.updateDoc(
                      COLLECTIONS.transactions,
                      transaction.uid,
                      {
                        isRedeemed: true,
                        redeemedcurrency: selectedCurrency,
                      },
                    );

                    if (UpdateTransStatus === 'success') {
                      setProcessing(false);
                      Alert.alert(
                        'Transaction Successful!!!',
                        'Now go to you wallet and cash out',
                      );
                      setProfileReload(true);

                      setActiveStep(0);

                      setProcessing(false);
                      setTransaction(undefined);
                      setSelectedCurrency('');
                    }
                    if (UpdateTransStatus === 'error' && UpdateTransErrMsg) {
                      Alert.alert('Ooops!!!', UpdateTransErrMsg);
                      setProcessing(false);
                    }
                  }
                  if (status === 'error' && errorMessage) {
                    Alert.alert('Ooops!!!', errorMessage);
                    setProcessing(false);
                  }
                }}>
                Redeem
              </Button>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default RedeemMoneyForm;
