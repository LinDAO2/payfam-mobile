import {
  IAddToUserWallet,
  ICreatePSTransferReceiptCode,
  IDeductFromUserWallet,
  IGetAccountDetailsParams,
  IGetBankParams,
  IGetCustomerTransactions,
  IInstantPSInitiateTransfer,
  IUpdateUserPSTransferReceiptCode,
  IWalletTransactionInput,
} from '@types/wallet-types';

import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from 'contants/collections';

class WalletRepository {
  async getbanks({country, currency}: IGetBankParams) {
    return axios.get('https://api.paystack.co/bank', {
      params: {
        country,
        currency,
      },
      headers: {
        Authorization: `Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`,
      },
    });
  }

  async resolveAccountDetails({
    accountNumber,
    bankCode,
  }: IGetAccountDetailsParams) {
    console.log(`Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`);

    return axios.get('https://api.paystack.co/bank/resolve', {
      params: {
        account_number: accountNumber,
        bank_code: bankCode,
      },
      headers: {
        Authorization: `Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createPSTransferReceiptCode({
    accountName,
    accountNumber,
    bankCode,
    persona,
  }: ICreatePSTransferReceiptCode) {
    return axios.post(
      'https://api.paystack.co/transferrecipient',
      {
        type: 'nuban',
        name: accountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN',
        metadata: {
          class: persona,
        },
      },
      {
        headers: {
          Authorization: `Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  async updateUserPSTransferReceiptCode({
    userId,
    accountName,
    accountNumber,
    bankCode,
    bankName,
    psrecieptCode,
  }: IUpdateUserPSTransferReceiptCode) {
    return firestore()
      .collection(COLLECTIONS.profiles)
      .doc(userId)
      .set(
        {
          wallet: {
            bankAccount: {
              paystack: {
                accountName,
                accountNumber,
                bankCode,
                bankName,
                psrecieptCode,
              },
            },
          },
        },
        {merge: true},
      );
  }

  async removeBankAccount(userId: string) {
    return firestore().collection(COLLECTIONS.profiles).doc(userId).update({
      'wallet.bankAccount': firestore.FieldValue.delete(),
    });
  }

  async instantPSInitiateTransfer({
    amount,
    psrecieptCode,
    reason,
  }: IInstantPSInitiateTransfer) {
    return axios.post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: amount * 100,
        recipient: psrecieptCode,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`,
          'Content-Type': `application/json`,
        },
      },
    );
  }

  async deductFromUserWallet({userId, amount}: IDeductFromUserWallet) {
    const profileReference = firestore().doc(
      `${COLLECTIONS.profiles}/${userId}`,
    );

    return firestore().runTransaction(async transaction => {
      // Get post data first
      const profileSnapshot = await transaction.get(profileReference);

      if (!profileSnapshot.exists) {
        throw 'Post does not exist!';
      }

      transaction.set(
        profileReference,
        {
          wallet: {
            balance: firestore.FieldValue.increment(-amount),
            overallOut: firestore.FieldValue.increment(amount),
          },
        },
        {merge: true},
      );
    });
  }

  async addToUserWallet({userId, amount}: IAddToUserWallet) {
    const profileReference = firestore().doc(
      `${COLLECTIONS.profiles}/${userId}`,
    );

    return firestore().runTransaction(async transaction => {
      // Get post data first
      const profileSnapshot = await transaction.get(profileReference);

      if (!profileSnapshot.exists) {
        throw 'Post does not exist!';
      }

      transaction.set(
        profileReference,
        {
          wallet: {
            balance: firestore.FieldValue.increment(amount),
            overallOut: firestore.FieldValue.increment(amount),
          },
        },
        {merge: true},
      );
    });
  }

  async addToUserCredit({userId, amount}: IAddToUserWallet) {
    const profileReference = firestore().doc(
      `${COLLECTIONS.profiles}/${userId}`,
    );

    return firestore().runTransaction(async transaction => {
      // Get post data first
      const profileSnapshot = await transaction.get(profileReference);

      if (!profileSnapshot.exists) {
        throw 'Post does not exist!';
      }

      transaction.set(
        profileReference,
        {
          wallet: {
            credit: firestore.FieldValue.increment(amount),
            overallOut: firestore.FieldValue.increment(amount),
          },
        },
        {merge: true},
      );
    });
  }

  async deductFromUserCredit({userId, amount}: IDeductFromUserWallet) {
    const profileReference = firestore().doc(
      `${COLLECTIONS.profiles}/${userId}`,
    );

    return firestore().runTransaction(async transaction => {
      // Get post data first
      const profileSnapshot = await transaction.get(profileReference);

      if (!profileSnapshot.exists) {
        throw 'Post does not exist!';
      }

      transaction.set(
        profileReference,
        {
          wallet: {
            credit: firestore.FieldValue.increment(-amount),
          },
        },
        {merge: true},
      );
    });
  }

  async getCustomerTransactions({
    perPage,
    page,
    customer,
  }: IGetCustomerTransactions) {
    return axios.get('https://api.paystack.co/transaction', {
      params: {
        perPage,
        page,
        customer,
      },
      headers: {
        Authorization: `Bearer sk_test_ac615fa6f28fc3cf7de8be4f219bc3165c6f4167`,
      },
    });
  }

  async recordWalletTransaction(values: IWalletTransactionInput) {
    return firestore()
      .collection(COLLECTIONS.walletTransactions)
      .doc(values.uid)
      .set({
        ...values,
        addedOn: firestore.FieldValue.serverTimestamp(),
      });
  }
}

export default WalletRepository;
