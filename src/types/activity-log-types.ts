export type activitySpaceType =
  | 'session'
  | 'wallet'
  | 'send-money'
  | 'redeem-money';

export interface IActivityLogDocument {
  uid: string;
  title: string;
  space: activitySpaceType;
  userId: string;
  addedOn: any;
}

export interface IActivityLogInput extends Omit<IActivityLogDocument, 'uid'> {}
