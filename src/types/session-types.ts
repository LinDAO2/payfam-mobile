export type IProfileStatus = 'active' | 'inactive' | 'blocked';

export interface IProfileWallet {
  balance: number;
  pendingPayout: number;
  totalCommission: number;
  credit: number;
  ngnBalance?: number;
  ghsBalance?: number;
  usdtBalance?: number;
  overallIn?: number;
  overallOut?: number;
  bankAccount?: {
    paystack: {
      accountName: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
      psrecieptCode: string;
    };
  };
}

export type IProfilePersonas = 'customer' | 'mgt';

export interface IProfileDocument {
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  country: string;
  persona: IProfilePersonas;
  query: string[];
  wallet: IProfileWallet;
  status: IProfileStatus;
  addedOn: any;
  queryType: string;
}
