import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import {Button, Text, TextInput} from 'react-native-paper';
import {collectionServices, sessionServices} from '../../../services/root';
import {COLLECTIONS} from 'contants/collections';
import {IProfileDocument} from '@types/session-types';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useSession} from '../../../hooks/app-hooks';

const {width} = Dimensions.get('screen');

const SignInForm = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const phoneInput = useRef<PhoneInput>(null);

  const [processing, setProcessing] = useState(false);

  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const profile = useSession();

  useEffect(() => {
    if (profile.uid !== '') {
      navigation.navigate('UpdateProfileBridgeScreen');
    }
  }, [profile.uid]);

  if (!confirm) {
    return (
      <>
        <Text variant="titleMedium">Enter your phone number</Text>
        <Text variant="bodySmall" style={{marginBottom: 20}}>
          (Pick your country code and enter your phone number. )
        </Text>
        <Text
          variant="bodySmall"
          style={{marginBottom: 5, textAlign: 'center'}}>
          Note: you will be prompted to open a brower to verify you are human.
        </Text>

        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="NG"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <View style={{marginTop: 20}}>
          <Button
            loading={processing}
            disabled={processing}
            mode="contained-tonal"
            onPress={async () => {
              setProcessing(true);
              const checkValid = phoneInput.current?.isValidNumber(value);

              if (checkValid === false) {
                Alert.alert('Oops!', 'Phone number is invalid.');
                setProcessing(false);
              }

              if (checkValid === true) {
                const {status, data, errorMessage} =
                  await sessionServices.signInWithPhoneNumber(formattedValue);

                if (status === 'success' && data) {
                  setConfirm(data);
                  setProcessing(false);
                }
                if (status === 'error') {
                  Alert.alert('Oops!', errorMessage);
                  setProcessing(false);
                }
              }
            }}>
            Verify
          </Button>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              navigation.navigate('MainScreen');
            }}>
            <Text style={{color: '#0165E1', textAlign: 'center'}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <Text variant="titleMedium">Enter OTP Code</Text>
      <Text variant="bodySmall">(Note: If you don't get an OTP )</Text>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        placeholder="OTP Code"
        style={styles.formInput}
        left={<TextInput.Icon icon="security" />}
        keyboardType="number-pad"
      />
      <Button
        loading={processing}
        disabled={processing}
        mode="contained-tonal"
        onPress={async () => {
          if (confirm) {
            setProcessing(true);
            const {status, data} = await sessionServices.confirmCode(
              confirm,
              code,
            );
            if (status === 'success' && data) {
              const user = data as FirebaseAuthTypes.UserCredential;

              //   user.user.uid;
              if (user?.user?.uid) {
                const {status: ProfileStatus, item} =
                  await collectionServices.getDoc(
                    COLLECTIONS.profiles,
                    user?.user?.uid,
                  );
                if (ProfileStatus === 'success' && item) {
                  navigation.navigate('UpdateProfileBridgeScreen');
                } else {
                  const _profile: IProfileDocument = {
                    uid: user?.user?.uid,
                    addedOn: firestore.FieldValue.serverTimestamp(),
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    phoneNumber: formattedValue,
                    country: '',
                    persona: 'customer',
                    query: [],
                    wallet: {
                      balance: 0,
                      pendingPayout: 0,
                      totalCommission: 0,
                      credit: 0,
                    },
                    status: 'active',

                    queryType: 'customer',
                  };
                  const {status, errorMessage} =
                    await collectionServices.addDocWithId(
                      COLLECTIONS.profiles,
                      user?.user?.uid,
                      {..._profile},
                    );

                  if (status === 'success') {
                    navigation.navigate('UpdateProfileBridgeScreen');
                  }
                  if (status === 'error') {
                    Alert.alert('Oops!', errorMessage);
                    setProcessing(false);
                  }
                }
              }
            }

            if (status === 'error') {
              Alert.alert('Oops!', 'Invalid code.');
              setProcessing(false);
            }
          }
        }}>
        Confirm Code
      </Button>
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DBDBDB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: width - 20,
    marginBottom: 10,
  },
});
