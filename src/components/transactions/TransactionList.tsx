import {FlatList, Text, useWindowDimensions, View} from 'react-native';
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
import TransactionListItem from './TransactionListItem';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: SecondRoute,
});

const TransactionList = () => {
  const profileUID = useSession().uid;
  const profilePhonenumber = useSession().phoneNumber;
  const collectionState = useCollection();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Sent'},
    {key: 'second', title: 'To Redeem'},
    {key: 'third', title: 'Redeemed'},
  ]);

  useEffect(() => {
    (async () => {
      const query = firestore()
        .collection(COLLECTIONS.transactions)
        .where('senderID', '==', profileUID)
        .where('isRedeemed', '==', false)
        .orderBy('addedOn', 'desc');

      await getDocs(query);
      setPageState('customer');
      setShowLoadMoreBtn(true);
    })();
  }, []);

  return (
    <View style={{width: '100%'}}>
      <View style={{height: 50}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: '#green'}}
              style={{backgroundColor: 'white'}}
              renderIcon={({route, focused, color}) => (
                <>
                  {route.title === 'Sent' ? (
                    <MaterialCommunityIcons
                      name={'arrow-collapse-up'}
                      color={color}
                      size={25}
                    />
                  ) : route.title === 'To Redeem' ? (
                    <MaterialCommunityIcons
                      name={'arrow-collapse-down'}
                      color={color}
                      size={25}
                    />
                  ) : route.title === 'Redeemed' ? (
                    <Ionicons
                      name="md-wallet-outline"
                      color={color}
                      size={25}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={'arrow-collapse-up'}
                      color={color}
                      size={25}
                    />
                  )}
                </>
              )}
              renderLabel={({route, color}) => (
                <Text style={{color}}>{route.title}</Text>
              )}
              onTabPress={async ({route}) => {
                if (route.title === 'Sent') {
                  const query = firestore()
                    .collection(COLLECTIONS.transactions)
                    .where('senderID', '==', profileUID)
                    .where('isRedeemed', '==', false)
                    .orderBy('addedOn', 'desc');

                  await getDocs(query);
                  setPageState('customer');
                  setShowLoadMoreBtn(true);
                }
                if (route.title === 'To Redeem') {
                  const query = firestore()
                    .collection(COLLECTIONS.transactions)
                    .where('recieverPhonenumber', '==', profilePhonenumber)
                    .where('isRedeemed', '==', false)
                    .orderBy('addedOn', 'desc');

                  await getDocs(query);
                  setPageState('customer');
                  setShowLoadMoreBtn(true);
                }
                if (route.title === 'Redeemed') {
                  const query = firestore()
                    .collection(COLLECTIONS.transactions)
                    .where('recieverPhonenumber', '==', profilePhonenumber)
                    .where('isRedeemed', '==', true)
                    .orderBy('addedOn', 'desc');

                  await getDocs(query);
                  setPageState('customer');
                  setShowLoadMoreBtn(true);
                }
              }}
              activeColor={'#373ae6ff'}
              inactiveColor="#ccc"
              tabStyle={{
                flexDirection: 'row',
              }}
              bounces
            />
          )}
        />
      </View>

      {collectionState.isLoading && <Text>Loading...</Text>}
      {collectionState.status === 'error' && <Text>Error occured</Text>}

      {!collectionState.isLoading &&
        collectionState.status === 'success' &&
        collectionState.list.length === 0 && <Text>No transactions yet</Text>}
      {!collectionState.isLoading &&
        collectionState.status === 'success' &&
        collectionState.list.length > 0 && (
          <FlatList
            data={collectionState.list}
            keyExtractor={_iten => generateUUIDV4()}
            renderItem={({item}) => <TransactionListItem transaction={item} />}
          />
        )}
    </View>
  );
};

export default TransactionList;
