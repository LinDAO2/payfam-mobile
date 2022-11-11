import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import {Button, TextInput} from 'react-native-paper';
import Spacer from '@components/common/Spacer';
import PhoneInput from 'react-native-phone-number-input';
import SelectDropdown from 'react-native-select-dropdown';
import {number, object, string} from 'yup';
//@ts-ignore
import referralCodeGenerator from 'referral-code-generator';
import {useSession} from '@hooks/app-hooks';
//@ts-ignore
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {ITransactionInput} from '@types/transactions-types';
import firestore from '@react-native-firebase/firestore';
import {collectionServices} from '@services/root';
import {COLLECTIONS} from 'contants/collections';
import {IActivityLogInput} from '@types/activity-log-types';

const currencies = ['NGN', 'GHC', 'USDT'];

const paymentOptions = ['Paystack', 'Mobile money', 'Balance', 'Credit'];

const SendMoneyValidation = object({
  recieverName: string().required('Enter reciever name'),
  recieverPhonenumber: string().required('Enter reciever phone number'),
  currency: string().required('Select currency'),
  amount: number().required('Enter amount'),
});

const SendMoneyForm = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');

  const redemptionCode = referralCodeGenerator.alphaNumeric('uppercase', 1, 4);
  const profile = useSession();
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
  const [amountToSend, setAmountToSend] = useState(100);

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  useEffect(() => {
    if (selectPaymentMethod === 'Balance') {
      if (amountToSend > profile.wallet.balance) {
        setCanMakePayment(false);
      } else {
        setCanMakePayment(true);
      }
    } else if (selectPaymentMethod === 'Credit') {
      if (amountToSend > profile.wallet.credit) {
        setCanMakePayment(false);
      } else {
        setCanMakePayment(true);
      }
    } else {
      setCanMakePayment(true);
    }
  }, [
    selectPaymentMethod,
    profile.wallet.balance,
    profile.wallet.credit,
    amountToSend,
  ]);

  return (
    <View>
      <Formik
        validationSchema={SendMoneyValidation}
        initialValues={{
          recieverName: '',
          recieverPhonenumber: '',
          currency: '',
          amount: 100,
          redemptionCode: redemptionCode,
          isRedeemed: false,
          senderID: profile.uid,
          paymentOption: '',
        }}
        onSubmit={values => {}}>
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          isSubmitting,
          isValid,
          setFieldValue,
          setSubmitting,
          resetForm,
        }) => (
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.51,
                shadowRadius: 13.16,

                elevation: 20,
                padding: 5,
                marginBottom: 30,
                borderRadius: 5,
                paddingVertical: 10,
              }}>
              <Text>Enter reciever name</Text>
              <TextInput
                onChangeText={handleChange('recieverName')}
                onBlur={handleBlur('recieverName')}
                value={values.recieverName}
                style={styles.formInput}
              />
              {errors.recieverName && (
                <Text style={styles.formInputErrorText}>
                  {errors.recieverName}
                </Text>
              )}
              <Spacer space={20} />
              <Text>Enter reciever phone number</Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="NG"
                layout="second"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFieldValue('recieverPhonenumber', text, true);
                }}
              />
              {errors.recieverPhonenumber && (
                <Text style={styles.formInputErrorText}>
                  {errors.recieverPhonenumber}
                </Text>
              )}
              <Spacer space={20} />
              <Text>Select currency and set amount</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <SelectDropdown
                    data={currencies}
                    defaultButtonText="CUR"
                    buttonStyle={{
                      width: 80,
                    }}
                    onSelect={(selectedItem, index) => {
                      setFieldValue('currency', selectedItem, true);
                    }}
                    buttonTextAfterSelection={(selectedItem, _index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, _index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    dropdownIconPosition={'right'}
                  />
                  {errors.currency && (
                    <Text style={styles.formInputErrorText}>
                      {errors.currency}
                    </Text>
                  )}
                </View>
                <View style={{flex: 1, marginLeft: 5}}>
                  <TextInput
                    onChangeText={text => {
                      setFieldValue('amount', parseInt(text), true);
                      setAmountToSend(parseInt(text));
                    }}
                    onChange={({nativeEvent: {eventCount, target, text}}) => {}}
                    value={`${values.amount}`}
                    placeholder="Amount"
                    style={styles.formInput}
                    keyboardType="numeric"
                  />
                  {errors.amount && (
                    <Text style={styles.formInputErrorText}>
                      {errors.amount}
                    </Text>
                  )}
                </View>
              </View>

              <Spacer space={20} />
              {isValid && (
                <View style={{alignItems: 'center'}}>
                  <Text>Select payment option</Text>
                  <SelectDropdown
                    data={paymentOptions}
                    defaultButtonText="Payment option"
                    buttonStyle={{
                      width: 300,
                    }}
                    onSelect={(selectedItem, index) => {
                      setFieldValue('paymentOption', selectedItem, false);
                      setSelectPaymentMethod(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, _index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, _index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    dropdownIconPosition={'right'}
                  />
                </View>
              )}
              <Spacer space={20} />
              {values.paymentOption === 'Balance' && (
                <>
                  {values.amount > profile.wallet.balance ? (
                    <Text style={{color: 'red', textAlign: 'center'}}>
                      Insufficient balance to process transaction
                    </Text>
                  ) : (
                    <Text> Balance - {profile.wallet.balance}</Text>
                  )}
                </>
              )}
              {values.paymentOption === 'Credit' && (
                <>
                  {values.amount > profile.wallet.credit ? (
                    <Text style={{color: 'red', textAlign: 'center'}}>
                      Insufficient credit to process transaction
                    </Text>
                  ) : (
                    <Text> Credit - {profile.wallet.credit}</Text>
                  )}
                </>
              )}
            </View>

            <Button
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || canMakePayment === false}
              uppercase
              mode="contained-tonal"
              onPress={() => {
                paystackWebViewRef.current.startTransaction();
                setSubmitting(true);
              }}>
              Send
            </Button>
            <Spacer space={20} />
            <Paystack
              paystackKey={'pk_test_eb3ca32b309dae6f47462b591e955b36183bdafb'}
              billingEmail="paystackwebview@something.com"
              amount={`${values.amount}.00`}
              onCancel={(e: any) => {
                // handle response here
              }}
              onSuccess={async (res: any) => {
                const _transaction: ITransactionInput = {
                  addedOn: firestore.FieldValue.serverTimestamp(),
                  ...values,
                };

                const _activity: IActivityLogInput = {
                  title: `Sent ${values.currency}${values.amount} to ${values.recieverName}(${values.recieverPhonenumber}).`,
                  space: 'send-money',
                  userId: profile.uid,
                  addedOn: firestore.FieldValue.serverTimestamp(),
                };
                const {status, errorMessage} = await collectionServices.addDoc(
                  COLLECTIONS.transactions,
                  {
                    ..._transaction,
                  },
                );

                if (status === 'success') {
                  await collectionServices.addDoc(COLLECTIONS.activityLogs, {
                    ..._activity,
                  });
                  setSubmitting(false);
                  resetForm();
                  Alert.alert(
                    'Transaction successfully',
                    `Share redemption code ${values.redemptionCode} with reciever, ${values.recieverPhonenumber} to redeem the amount.`,
                  );
                }

                if (status === 'error') {
                  setSubmitting(false);
                  Alert.alert('Oops!!', errorMessage);
                }
              }}
              ref={paystackWebViewRef}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SendMoneyForm;

const styles = StyleSheet.create({
  formInput: {
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#DBDBDB',
    borderRadius: 0,
  },
  formInputErrorText: {
    fontSize: 16,
    color: '#FF3D00',
  },
});
