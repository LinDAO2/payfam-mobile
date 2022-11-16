import {Alert, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSession} from '@hooks/app-hooks';
import {Formik} from 'formik';
import {walletServices} from '@services/root';
import {Button, TextInput} from 'react-native-paper';
import Spacer from '@components/common/Spacer';
//@ts-ignore
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {setProfileReload} from '@helpers/session-helpers';

interface Props {
  close: any;
}
const AddFundsForm = ({close}: Props) => {
  const [amountTopay, setAmountTopay] = useState(500);

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const profile = useSession();

  return (
    <View>
      <Formik
        initialValues={{
          amount: 500,
        }}
        onSubmit={values => {}}>
        {({setSubmitting, isSubmitting, values, setFieldValue, resetForm}) => (
          <View>
            <TextInput
              value={`${values.amount}`}
              onChangeText={numValue => {
                if (numValue !== null) {
                  setFieldValue('amount', parseInt(numValue), false);
                  setAmountTopay(parseInt(numValue));
                }
              }}
            />
            <Spacer space={40} />

            <Button
              mode="contained"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={() => {
                if (values.amount < 500) {
                  Alert.alert(`A minimum of 500 is needed to top up account`);

                  setSubmitting(false);
                  resetForm();
                } else {
                  paystackWebViewRef.current.startTransaction();
                  setSubmitting(true);
                }
              }}>
              Top up
            </Button>
            <Paystack
              paystackKey={'pk_test_eb3ca32b309dae6f47462b591e955b36183bdafb'}
              billingEmail="paystackwebview@something.com"
              amount={`${values.amount}.00`}
              onCancel={(e: any) => {
                // handle response here
              }}
              onSuccess={async (paystackPaymentResponse: any) => {
                if (paystackPaymentResponse.status === 'success') {
                  if (profile.uid) {
                    const {errorMessage, status, successMessage} =
                      await walletServices.topUpWallet({
                        userId: profile.uid,
                        amount: amountTopay,
                      });

                    if (status === 'success') {
                      setProfileReload(true);
                      close();
                      Alert.alert(successMessage);

                      setSubmitting(false);
                    }
                    if (status === 'error') {
                      Alert.alert(errorMessage);

                      setSubmitting(false);
                    }
                  }
                } else {
                  if (paystackPaymentResponse.status === 'error') {
                    Alert.alert(paystackPaymentResponse.message);
                  }
                }
                setSubmitting(false);
                resetForm();
              }}
              ref={paystackWebViewRef}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddFundsForm;

const styles = StyleSheet.create({});
