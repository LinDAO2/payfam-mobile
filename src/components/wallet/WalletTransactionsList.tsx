import {Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useCollection} from '@hooks/app-hooks';
import {IProfilePersonas} from '@types/session-types';
import {getDocs} from '@helpers/collection-helpers';
import {COLLECTIONS} from 'contants/collections';
import firestore from '@react-native-firebase/firestore';
import {generateUUIDV4} from '@utils/funcs';
import WalletTransactionListItem from './WalletTransactionListItem';

interface Props {
  userId: string;
  persona: IProfilePersonas;
}

const WalletTransactionsList = ({userId, persona}: Props) => {
  const collectionState = useCollection();

  useEffect(() => {
    (async () => {
      if (persona && userId) {
        const query = firestore()
          .collection(COLLECTIONS.walletTransactions)
          .where('userId', '==', userId)
          .where('persona', '==', persona)
          .orderBy('addedOn', 'asc');

        await getDocs(query);
      }
    })();
  }, [persona, userId]);

  if (collectionState.isLoading) return <Text>Loading...</Text>;
  if (collectionState.status === 'error') return <Text>Error occured...</Text>;

  return (
    <>
      {collectionState.status === 'success' &&
        collectionState.list.length === 0 && <Text>No transaction yet</Text>}
      {collectionState.status === 'success' &&
        collectionState.list.length > 0 && (
          <FlatList
            data={collectionState.list}
            keyExtractor={_iten => generateUUIDV4()}
            renderItem={({item}) => (
              <WalletTransactionListItem transaction={item} />
            )}
          />
        )}
    </>
  );
};

export default WalletTransactionsList;
