import {View, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProfilePersonas} from '@types/session-types';
import {IPSBank, IPSResolveAccountDetails} from '@types/wallet-types';
import {walletServices} from '@services/root';
import {Formik} from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import {Button, Text, TextInput} from 'react-native-paper';
import {find} from 'lodash';
import Spacer from '@components/common/Spacer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setProfileReload } from '@helpers/session-helpers';

interface Props {
  persona: IProfilePersonas;
  userId: string;
  close?: any;
}

const AddBankForm = ({close, persona, userId}: Props) => {
  const [banklist, setBanklist] = useState<IPSBank[]>([]);
  const [selectedBank, setSelectedBank] = useState<IPSBank>({
    active: false,
    code: '',
    id: 0,
    name: '',
  });

  const [resolvedBankAccountInfo, setResolvedBankAccountInfo] =
    useState<IPSResolveAccountDetails>({
      account_name: '',
      account_number: '',
    });

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getBanks = async () => {
      const {errorMessage, data, status} = await walletServices.getbanks({
        country: 'nigeria',
        currency: 'NGN',
      });
      if (status === 'success') {
        setBanklist(data);
      }
      if (status === 'error') {
        Alert.alert('Oops!!!', errorMessage);
      }
    };

    getBanks();
  }, []);

  return (
    <View style={{padding: 5}}>
      <Formik
        initialValues={{
          bank_code: '',
          account_number: '',
        }}
        onSubmit={async (values, {setSubmitting}) => {
          if (persona === 'customer') {
            const {errorMessage, status, successMessage} =
              await walletServices.createPSTransferReceiptCode({
                accountName: resolvedBankAccountInfo.account_name,
                bankCode: selectedBank.code,
                accountNumber: resolvedBankAccountInfo.account_number,
                persona: persona,
                bankName: selectedBank.name,
                userId: userId,
              });
            if (status === 'success') {
              setProfileReload(true);
              close();
              Alert.alert('success', successMessage);

              setSubmitting(false);
            }
            if (status === 'error') {
              Alert.alert('error', errorMessage);

              setSubmitting(false);
            }
          }
        }}>
        {({
          submitForm,
          isSubmitting,
          values,
          resetForm,
          setFieldValue,
          errors,
        }) => (
          <View>
            <SelectDropdown
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              search
              data={banklist}
              defaultButtonText="Select bank"
              buttonStyle={{
                width: '100%',
                borderRadius: 10,
              }}
              onSelect={(selectedItem, index) => {
                setFieldValue('bank_code', selectedItem, true);
                const findBank = find(banklist, {code: selectedItem.code});
                if (findBank) {
                  setSelectedBank(findBank);
                }
              }}
              buttonTextAfterSelection={(selectedItem, _index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name;
              }}
              rowTextForSelection={(item, _index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name;
              }}
              dropdownIconPosition={'right'}
            />
            {errors.bank_code && (
              <Text style={styles.formInputErrorText}>{errors.bank_code}</Text>
            )}
            <Spacer space={20} />
            <TextInput
              value={values.account_number}
              onChangeText={text => {
                setFieldValue('account_number', text, false);
              }}
              placeholder="Account number"
              style={styles.formInput}
              left={<TextInput.Icon icon="security" />}
              keyboardType="number-pad"
            />

            {resolvedBankAccountInfo.account_name !== '' &&
              values.account_number !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Spacer space={10} />
                  <Text variant="titleMedium" style={{marginBottom: 10}}>
                    Account number verified!
                  </Text>
                  <Text variant="labelLarge">Account name</Text>
                  <Text>{resolvedBankAccountInfo.account_name}</Text>
                  <Text variant="labelLarge">Account number</Text>
                  <Text>{resolvedBankAccountInfo.account_number}</Text>
                </View>
              )}
            <Spacer space={40} />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent:
                  resolvedBankAccountInfo.account_name !== '' &&
                  values.account_number !== ''
                    ? 'space-between'
                    : 'center',
              }}>
              <Button
                mode="contained"
                loading={isSubmitting || isLoading}
                onPress={async () => {
                  if (values.account_number.length < 2) {
                    Alert.alert('Please enter your bank account');
                  } else if (selectedBank.code === '') {
                    Alert.alert('Please select your bank');
                  } else if (resolvedBankAccountInfo.account_name === '') {
                    setisLoading(true);

                    const {errorMessage, status, data} =
                      await walletServices.resolveAccountDetails({
                        accountNumber: values.account_number,
                        bankCode: selectedBank.code,
                      });

                    if (status === 'success') {
                      setResolvedBankAccountInfo(data);

                      setisLoading(false);
                    }
                    if (status === 'error') {
                      Alert.alert('Error', errorMessage);

                      setisLoading(false);
                    }
                  } else {
                    submitForm();
                  }
                }}>
                {values.account_number === '' || selectedBank.code === ''
                  ? 'Verify bank account'
                  : resolvedBankAccountInfo.account_name !== ''
                  ? 'Add bank account'
                  : 'Verify'}
              </Button>
              {resolvedBankAccountInfo.account_name !== '' &&
                values.account_number !== '' && (
                  <Button
                    mode="contained"
                    onPress={() => {
                      resetForm();
                      setResolvedBankAccountInfo({
                        account_name: '',
                        account_number: '',
                      });
                    }}>
                    Reset
                  </Button>
                )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddBankForm;

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DBDBDB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  formInputErrorText: {
    fontSize: 16,
    color: '#FF3D00',
  },
});
