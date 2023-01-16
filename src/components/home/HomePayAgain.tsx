import {FlatList, Image, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Spacer from '@components/common/Spacer';
import {generateUUIDV4} from '@utils/funcs';

const HomePayAgain = () => {
  const PAY_FAM_RECIEPTS = [
    {
      name: 'Eric',
      phonenumber: '+233',
    },

    {
      name: 'Linda',
      phonenumber: '+233',
    },
    {
      name: 'Mattosha',
      phonenumber: '+234',
    },
    {
      name: 'Babara',
      phonenumber: '+233',
    },
    {
      name: 'Mike',
      phonenumber: '+233',
    },
    {
      name: 'eric',
      phonenumber: '+233',
    },

    {
      name: 'linda',
      phonenumber: '+233',
    },
    {
      name: 'mattosha',
      phonenumber: '+234',
    },
    {
      name: 'babara',
      phonenumber: '+233',
    },
    {
      name: 'mike',
      phonenumber: '+233',
    },
  ];
  return (
    <>
      <Spacer space={20} />
      <Text variant="titleMedium">Pay Fam Again</Text>
      <Spacer space={10} />
      <FlatList
        nestedScrollEnabled
        data={PAY_FAM_RECIEPTS}
        keyExtractor={_ => generateUUIDV4()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{alignItems: 'center', padding: 10}}>
            <Image
              source={{
                uri: `https://avatars.dicebear.com/api/pixel-art/${item.name}.png`,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </>
  );
};

export default HomePayAgain;
