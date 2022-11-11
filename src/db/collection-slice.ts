import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IProfilePersonas } from '@types/session-types';

export interface ICollectionState<T> {
  count: number;
  list: T[];
  title: string;
  current?: T;
  lastDoc: any;
  isLoading: boolean;
  isEmpty: boolean;
  status: 'success' | 'error' | '';
  page?: IProfilePersonas;
  isQueryLoading?: boolean;
  showLoadMoreBtn?: boolean;
}

export interface ISetCollection<T> {
  list: T[];
  lastDoc: any;
}

export interface ISetChat {
  chat: {
    buyerId: string;
    sellerId: string;
  };
}

const initialState: ICollectionState<any> = {
  count: 0,
  list: [],
  title: '',
  current: {},
  lastDoc: {},
  isLoading: false,
  isEmpty: true,
  status: '',
  page: 'customer',
  isQueryLoading: false,
  showLoadMoreBtn: true,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<ISetCollection<unknown>>) => {
      state.list = action.payload.list;
      state.lastDoc = action.payload.lastDoc;
      state.lastDoc = action.payload.lastDoc;
      return state;
    },
    setList: (
      state,
      action: PayloadAction<Pick<ISetCollection<unknown>, 'list'>>,
    ) => {
      state.list = action.payload.list;
      return state;
    },
    setCollectionStateIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      return state;
    },
    setCollectionStateErrorStatus: state => {
      state.status = 'error';
      return state;
    },
    setCollectionStateSuccessStatus: state => {
      state.status = 'success';
      return state;
    },

    setCollectionStateIsEmpty: (state, action: PayloadAction<boolean>) => {
      state.isEmpty = action.payload;
      return state;
    },
    setCollectionStateShowLoadMoreBtn: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.showLoadMoreBtn = action.payload;
      return state;
    },
    setCollectionStatePage: (state, action: PayloadAction<IProfilePersonas>) => {
      state.page = action.payload;
      return state;
    },
    setCollectionStateCurrent: (state, action: PayloadAction<any>) => {
      state.current = action.payload;
      return state;
    },
    setCollectionFindElemInViewAndUpdate: (
      state,
      action: PayloadAction<Omit<ISetCollection<unknown>, 'lastDoc'>>,
    ) => {
      state.list = action.payload.list;
      return state;
    },
    setCollectionDuplicateUpdate: (
      state,
      action: PayloadAction<Omit<ISetCollection<unknown>, 'lastDoc'>>,
    ) => {
      state.list = action.payload.list;
      return state;
    },
    setCollectionDeleteUpdate: (
      state,
      action: PayloadAction<Omit<ISetCollection<unknown>, 'lastDoc'>>,
    ) => {
      state.list = action.payload.list;
      return state;
    },
  },
});

export const collectionName = collectionSlice.name;
export const collectionActions = collectionSlice.actions;
export const collectionReducer = collectionSlice.reducer;
