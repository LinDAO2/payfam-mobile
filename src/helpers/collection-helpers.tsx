import {collectionActions} from '@db/collection-slice';
import {store} from '@db/store';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {collectionServices} from '@services/root';
import {activitySpaceType} from '@types/activity-log-types';
import {IProfilePersonas} from '@types/session-types';
import {Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ITransactionCurrency} from '@types/transactions-types';

export const setShowLoadMoreBtn = (state: boolean) => {
  store.dispatch(collectionActions.setCollectionStateShowLoadMoreBtn(state));
};

export const setPageState = (page: IProfilePersonas) => {
  store.dispatch(collectionActions.setCollectionStatePage(page));
};

export const getDocs = async (query: FirebaseFirestoreTypes.Query) => {
  store.dispatch(collectionActions.setCollectionStateIsLoading(true));

  const {status, list, lastDoc, errorMessage, isEmpty} =
    await collectionServices.getDocs(query);

  store.dispatch(collectionActions.setCollectionStateIsLoading(false));

  if (status === 'success') {
    store.dispatch(
      collectionActions.setCollection({
        list,
        lastDoc,
      }),
    );

    store.dispatch(collectionActions.setCollectionStateSuccessStatus());
  }
  if (isEmpty !== undefined) {
    store.dispatch(collectionActions.setCollectionStateIsEmpty(isEmpty));
  }

  if (status === 'error') {
    store.dispatch(collectionActions.setCollectionStateErrorStatus());
    Alert.alert('Oops!', errorMessage);
    console.log(errorMessage);
  }
};

export const fetchMoreDocs = async (query: FirebaseFirestoreTypes.Query) => {
  store.dispatch(collectionActions.setCollectionStateIsLoading(true));

  const {status, list, lastDoc, errorMessage, isEmpty} =
    await collectionServices.getDocs(query);

  store.dispatch(collectionActions.setCollectionStateIsLoading(false));

  if (status === 'success') {
    store.dispatch(
      collectionActions.setCollection({
        list: [...store.getState().collection.list, ...list],
        lastDoc,
      }),
    );

    store.dispatch(collectionActions.setCollectionStateSuccessStatus());
  }
  if (isEmpty !== undefined) {
    store.dispatch(collectionActions.setCollectionStateIsEmpty(isEmpty));
  }

  if (status === 'error') {
    store.dispatch(collectionActions.setCollectionStateErrorStatus());
    Alert.alert('Oops!', errorMessage);
  }
};

export const getActivitySpaceIcon = (space: activitySpaceType) => {
  switch (space) {
    case 'wallet':
      return <Ionicons name="md-wallet-outline" size={20} color="#f9e969ff" />;
    case 'session':
      return (
        <MaterialCommunityIcons
          name="arrow-collapse-up"
          size={20}
          color="#f9e969ff"
        />
      );
    case 'send-money':
      return (
        <MaterialCommunityIcons
          name="arrow-collapse-up"
          size={20}
          color="#f9e969ff"
        />
      );
    case 'redeem-money':
      return (
        <MaterialCommunityIcons
          name="arrow-collapse-down"
          size={20}
          color="#f9e969ff"
        />
      );
    default:
      return (
        <MaterialCommunityIcons
          name="arrow-collapse-up"
          size={20}
          color="#f9e969ff"
        />
      );
  }
};

export const getCurrencyImage = (currency: ITransactionCurrency) => {
  switch (currency) {
    case 'NGN':
      return require('assets/images/naira.png');
    case 'GHS':
      return require('assets/images/cedis.png');
    case 'GHC':
      return require('assets/images/cedis.png');
    case 'USDT':
      return require('assets/images/tether.png');

    default:
      return require('assets/images/naira.png');
  }
};
