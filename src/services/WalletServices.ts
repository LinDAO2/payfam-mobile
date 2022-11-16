import {
  IAddToUserWallet,
  ICreatePSTransferReceiptCode,
  IGetAccountDetailsParams,
  IGetBankParams,
  IGetCustomerTransactions,
  IInstantPSInitiateTransfer,
  IWalletTransactionInput,
} from '@types/wallet-types';

import {MutationResponse} from '@types/promise-types';
import WalletRepository from '@repositories/WalletRepository';
import {generateUUIDV4} from '@utils/funcs';

class WalletServices {
  private respository: WalletRepository;

  constructor() {
    this.respository = new WalletRepository();
  }
  async getbanks({
    country,
    currency,
  }: IGetBankParams): Promise<MutationResponse> {
    try {
      const {status, data} = await this.respository.getbanks({
        currency,
        country,
      });
      if (status === 200) {
        return {
          status: 'success',
          successMessage: 'Bank list recieved',
          data: data.data,
          errorMessage: '',
        };
      }
      return {
        status: 'error',
        errorMessage: 'Error! Bank list could not be recieved',
        data: {},
        successMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! Bank list could not be recieved';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }
  async resolveAccountDetails({
    accountNumber,
    bankCode,
  }: IGetAccountDetailsParams): Promise<MutationResponse> {
    try {
      const {status, data} = await this.respository.resolveAccountDetails({
        accountNumber,
        bankCode,
      });
      if (status === 200) {
        return {
          status: 'success',
          successMessage: 'resolved account successfully',
          data: data.data,
          errorMessage: '',
        };
      }
      return {
        status: 'error',
        errorMessage: 'Error! could not resolve account',
        data: {},
        successMessage: '',
      };
    } catch (error: any) {
      // let errorMsg = "Error! could not resolve account";
      //
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }
  async getCustomerTransactions({
    customer,
    page,
    perPage,
  }: IGetCustomerTransactions): Promise<MutationResponse> {
    try {
      const {status, data} = await this.respository.getCustomerTransactions({
        customer,
        page,
        perPage,
      });
      if (status === 200) {
        return {
          status: 'success',
          successMessage: 'transaction records recieved successfully',
          data: data,
          errorMessage: '',
        };
      }
      return {
        status: 'error',
        errorMessage: 'Error! could not recieve transaction records',
        data: {},
        successMessage: '',
      };
    } catch (error: any) {
      // console.log("error", error);

      let errorMsg = 'Error! could not recieve transaction records';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }
  async createPSTransferReceiptCode({
    persona,
    accountName,
    accountNumber,
    bankCode,
    userId,
    bankName,
  }: ICreatePSTransferReceiptCode): Promise<MutationResponse> {
    try {
      const {status, data} = await this.respository.createPSTransferReceiptCode(
        {
          accountName,
          accountNumber,
          bankCode,
          persona,
        },
      );

      await this.respository.updateUserPSTransferReceiptCode({
        userId: userId ? userId : 'empty',
        accountName,
        accountNumber,
        bankCode,
        bankName: bankName ? bankName : 'empty',
        psrecieptCode: data.data.recipient_code,
        persona,
      });

      if (status === 201) {
        return {
          status: 'success',
          successMessage: 'created account transfer reciept successfully',
          data: data.data,
          errorMessage: '',
        };
      }
      return {
        status: 'error',
        errorMessage: 'Error! could not create account transfer reciept',
        data: {},
        successMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! could not create account transfer reciept';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }

  async removeBankAccount(userId: string): Promise<MutationResponse> {
    try {
      await this.respository.removeBankAccount(userId);

      return {
        status: 'success',
        successMessage: 'bank account removed successfully',
        errorMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! could not remove bank account';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }

  async instantPSInitiateTransfer({
    amount,
    psrecieptCode,
    reason,
    userId,
  }: IInstantPSInitiateTransfer): Promise<MutationResponse> {
    try {
      const instantPSInitiateTransferPromise =
        this.respository.instantPSInitiateTransfer({
          amount,
          psrecieptCode,
          reason,
          userId,
        });
      const deductFromUserWalletPromise = this.respository.deductFromUserWallet(
        {
          userId,
          amount,
        },
      );

      await Promise.all([
        instantPSInitiateTransferPromise,
        deductFromUserWalletPromise,
      ]);

      return {
        status: 'success',
        successMessage: 'Tranfer of funds processed',
        errorMessage: '',
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }

  async topUpWallet({
    userId,
    amount,
  }: IAddToUserWallet): Promise<MutationResponse> {
    try {
      const addToUserWalletPromise = this.respository.addToUserWallet({
        userId,
        amount,
      });
      const recordWalletTransactionUserPromise =
        this.respository.recordWalletTransaction({
          uid: generateUUIDV4(),
          userId: userId,
          amount: amount,
          type: 'top-up',
          space: 'balance',
          persona: 'customer',
          remark: `Account was funded with ${amount}`,
        });

      await Promise.all([
        addToUserWalletPromise,
        recordWalletTransactionUserPromise,
      ]);

      return {
        status: 'success',
        successMessage: 'wallet top up successfully',
        errorMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! could not top up wallet';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }
  async addToUserWallet({
    userId,
    amount,
  }: IAddToUserWallet): Promise<MutationResponse> {
    try {
      await this.respository.addToUserWallet({
        userId,
        amount,
      });

      return {
        status: 'success',
        successMessage: 'wallet top up successfully',
        errorMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! could not top up wallet';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }
  async addToUserCredit({
    userId,
    amount,
  }: IAddToUserWallet): Promise<MutationResponse> {
    try {
      await this.respository.addToUserCredit({
        userId,
        amount,
      });

      return {
        status: 'success',
        successMessage: 'wallet top up successfully',
        errorMessage: '',
      };
    } catch (error: any) {
      let errorMsg = 'Error! could not top up wallet';

      return {
        status: 'error',
        errorMessage: errorMsg,
        successMessage: '',
      };
    }
  }

  async recordWalletTransaction(
    values: IWalletTransactionInput,
  ): Promise<MutationResponse> {
    try {
      await this.respository.recordWalletTransaction(values);

      return {
        status: 'success',
        successMessage: 'wallet transaction recorded successfully',
        errorMessage: '',
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }
}

export default WalletServices;
