import {View, Alert} from 'react-native';
import React, {useState} from 'react';
import {IProfilePersonas, IProfileWallet} from '@types/session-types';
import {Button} from 'react-native-paper';
import Spacer from '@components/common/Spacer';
import WalletAddBankAccountModal from './WalletAddBankAccountModal';
import {walletServices} from '@services/root';
import WalletAddFundsModal from './WalletAddFundsModal';
import WalletCouponCodeModal from './WalletCouponCodeModal';
import { setProfileReload } from '@helpers/session-helpers';

interface Props {
  wallet: IProfileWallet | undefined;
  persona: IProfilePersonas;
  userId: string;
}

const WalletActions = ({wallet, persona, userId}: Props) => {
  const [addBankAccountModal, setAddBankAccountModal] = useState(false);
  const [withdrawFundsModal, setWithdrawFundsModal] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState(false);
  const [couponCodeModal, setCouponCodeModal] = useState(false);

  return (
    <View>
      <WalletAddBankAccountModal
        visible={addBankAccountModal}
        close={() => setAddBankAccountModal(!addBankAccountModal)}
        persona={persona}
        userId={userId}
      />
      <WalletAddFundsModal
        visible={addFundsModal}
        close={() => setAddFundsModal(!addFundsModal)}
      />

      <WalletCouponCodeModal
        visible={couponCodeModal}
        close={() => setCouponCodeModal(!couponCodeModal)}
      />
      {wallet?.bankAccount === undefined && (
        <>
         <Spacer space={100} />
          <Button
            mode="contained"
            color="primary"
            onPress={() => setAddBankAccountModal(!addBankAccountModal)}
            style={{color: '#fff'}}>
            ADD BANK ACCOUNT
          </Button>
        </>
      )}
      {wallet?.bankAccount !== undefined && (
        <>
          <Spacer space={15} />
          <Button
            mode="contained"
            color="primary"
            onPress={() => {
              Alert.alert(
                'Are you sure?',
                'You are about to remove this bank account, proceed?',
                [
                  {
                    text: 'Proceed',
                    onPress: async () => {
                      if (persona === 'customer') {
                        const {status, errorMessage, successMessage} =
                          await walletServices.removeBankAccount(userId);
                        if (status === 'success') {
                          setProfileReload(true);
                          Alert.alert('Success', successMessage);
                        }
                        if (status === 'error') {
                          Alert.alert('Error', errorMessage);
                        }
                      }
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => {},
                },
              );
            }}
            style={{color: '#fff'}}>
            REMOVE BANK ACCOUNT
          </Button>
          {persona === 'customer' && (
            <>
              <Spacer space={15} />
              <Button
                mode="contained"
                color="primary"
                onPress={() => setAddFundsModal(!addFundsModal)}
                style={{color: '#fff'}}>
                TOP UP BALANCE
              </Button>
              <Spacer space={15} />
              <Button
                mode="contained"
                color="primary"
                style={{color: '#fff'}}
                onPress={() => {
                  setCouponCodeModal(!couponCodeModal);
                }}>
                CREDIT FROM COUPON
              </Button>
            </>
          )}
        </>
      )}

      {wallet?.bankAccount !== undefined &&
        wallet.balance !== undefined &&
        wallet.balance >= 1000 && (
          <>
            <Spacer space={15} />
            <Button
              mode="contained"
              color="primary"
              onPress={() => setWithdrawFundsModal(!withdrawFundsModal)}
              style={{color: '#fff'}}>
              WITHDRAW FUNDS
            </Button>
          </>
        )}
    </View>
  );
};

export default WalletActions;
