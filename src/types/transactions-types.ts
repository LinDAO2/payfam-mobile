export interface ITransactionDocument {
  recieverName: string;
  recieverPhonenumber: string;
  currency: string;
  amount: number;
  redemptionCode: string;
  isRedeemed: boolean;
  addedOn: any;
  uid: string;
  paymentOption: string;
  senderID: string;
}

export interface ITransactionInput extends Omit<ITransactionDocument, 'uid'> {}
