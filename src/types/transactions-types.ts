export type ITransactionCurrency = 'GHS' | 'NGN' | 'USDT' | 'GHC';

export interface ITransactionDocument {
  recieverName: string;
  recieverPhonenumber: string;
  currency: ITransactionCurrency;
  redeemedcurrency: ITransactionCurrency;
  amount: number;
  redemptionCode: string;
  isRedeemed: boolean;
  addedOn: any;
  uid: string;
  paymentOption: string;
  senderID: string;
  senderName: string;
  senderPhonenumber: string;
}

export interface ITransactionInput extends Omit<ITransactionDocument, 'uid'> {}
