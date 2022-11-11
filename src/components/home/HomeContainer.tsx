import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {generateUUIDV4} from '@utils/funcs';

const {width} = Dimensions.get('window');

const HomeContainer = () => {
  const ADS_LIST = [
    'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1006060/pexels-photo-1006060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/321452/pexels-photo-321452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  return (
    <>
      <FlatList
        data={ADS_LIST}
        keyExtractor={_ => generateUUIDV4()}
        renderItem={({item}) => {
          return (
            <Image
              source={{
                uri: item,
              }}
              style={{
                width: width - 30,
                height: 150,
                borderRadius: 6,
              }}
            />
          );
        }}
        horizontal
        pagingEnabled
      />
    </>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({});
