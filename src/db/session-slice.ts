import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProfileDocument} from 'types/session-types';

export interface ISessionState extends IProfileDocument {
  isLoaded: boolean;
  isEmpty: boolean;
}

export interface ISetProfile extends ISessionState {}

const initialState: ISessionState = {
  uid: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  country: '',
  persona: 'customer',
  wallet: {
    balance: 0,
    pendingPayout: 0,
    totalCommission: 0,
    credit: 0,
  },

  status: 'inactive',
  addedOn: null,
  query: [],
  queryType: 'user',

  isLoaded: false,
  isEmpty: true,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ISetProfile>) => {
      state = {...action.payload};
      return state;
    },
    reset: state => {
      state = initialState;
      return state;
    },
  },
});

export const sessionName = sessionSlice.name;
export const sessionActions = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
