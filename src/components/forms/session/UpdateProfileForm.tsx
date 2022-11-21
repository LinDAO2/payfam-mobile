import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {object, string} from 'yup';
import {Formik} from 'formik';
import Spacer from '@components/common/Spacer';
import {useSession} from '@hooks/app-hooks';
import {stringToArray} from '@utils/funcs';
import {IProfileDocument} from '@types/session-types';
import {collectionServices} from '@services/root';
import {COLLECTIONS} from 'contants/collections';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {setProfileReload} from '@helpers/session-helpers';

const {width} = Dimensions.get('window');
const SignInValidation = object({
  username: string().required('Enter your username'),
  firstName: string().required('Enter your first name'),
  lastName: string().required('Enter your last name'),
  email: string().required('Enter your email'),
});

const UpdateProfileForm = () => {
  const profile = useSession();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={SignInValidation}
        initialValues={{
          uid: profile.uid,
          username: profile.username,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        }}
        onSubmit={async (values, {setSubmitting}) => {
          values.uid = auth().currentUser?.uid as string;
          const _profile: Partial<IProfileDocument> = {
            uid: values.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            query: stringToArray(
              `${values.firstName} ${values.lastName} ${values.username} ${values.email}`,
            ),
          };

          const {status, errorMessage} = await collectionServices.updateDoc(
            COLLECTIONS.profiles,
            values.uid,
            {
              ..._profile,
            },
          );
          if (status === 'success') {
            setSubmitting(false);
            setProfileReload(true);
            navigation.navigate('MainScreen');
          }
          if (status === 'error') {
            Alert.alert('Oops!', errorMessage);
            setSubmitting(false);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          isValid,
        }) => (
          <View>
            {auth().currentUser?.phoneNumber && (
              <TextInput
                disabled
                value={auth().currentUser?.phoneNumber as string}
                style={styles.formInput}
                left={<TextInput.Icon icon="phone-classic" />}
              />
            )}

            <Spacer space={20} />
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Enter your username"
              style={styles.formInput}
              left={<TextInput.Icon icon="account-circle-outline" />}
            />
            {errors.username && (
              <Text style={styles.formInputErrorText}>{errors.username}</Text>
            )}
            <Spacer space={20} />
            <TextInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder="Enter your first name"
              style={styles.formInput}
              left={<TextInput.Icon icon="account-circle-outline" />}
            />
            {errors.firstName && (
              <Text style={styles.formInputErrorText}>{errors.firstName}</Text>
            )}
            <Spacer space={20} />
            <TextInput
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder="Enter your last name"
              style={styles.formInput}
              left={<TextInput.Icon icon="account-circle-outline" />}
            />
            {errors.lastName && (
              <Text style={styles.formInputErrorText}>{errors.lastName}</Text>
            )}
            <Spacer space={20} />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter your email"
              style={styles.formInput}
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.formInputErrorText}>{errors.email}</Text>
            )}

            <Spacer space={20} />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              uppercase
              mode="contained-tonal"
              onPress={handleSubmit}>
              Update
            </Button>
            <Spacer space={20} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainScreen');
              }}>
              <Text style={{color: '#0165E1', textAlign: 'center'}}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateProfileForm;

const styles = StyleSheet.create({
  container: {
    width: width - 20,

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    padding: 10,
  },
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
