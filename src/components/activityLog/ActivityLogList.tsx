import {FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from 'contants/collections';
import {useCollection, useSession} from '@hooks/app-hooks';
import {
  getDocs,
  setPageState,
  setShowLoadMoreBtn,
} from '@helpers/collection-helpers';
import {generateUUIDV4} from '@utils/funcs';
import ActivityLogListItem from './ActivityLogListItem';

const ActivityLogList = () => {
  const profileUID = useSession().uid;
  const collectionState = useCollection();

  useEffect(() => {
    (async () => {
      const query = firestore()
        .collection(COLLECTIONS.activityLogs)
        .where('userId', '==', profileUID)
        .orderBy('addedOn', 'asc');

      await getDocs(query);
      setPageState('customer');
      setShowLoadMoreBtn(true);
    })();
  }, []);

  if (collectionState.isLoading) return <Text>Loading...</Text>;
  if (collectionState.status === 'error') return <Text>Error occured</Text>;

  return (
    <>
      {collectionState.status === 'success' &&
        collectionState.list.length === 0 && <Text>No activity yet</Text>}
      {collectionState.status === 'success' &&
        collectionState.list.length > 0 && (
          <FlatList
            data={collectionState.list}
            keyExtractor={_iten => generateUUIDV4()}
            renderItem={({item}) => <ActivityLogListItem activity={item} />}
          />
        )}
    </>
  );
};

export default ActivityLogList;
