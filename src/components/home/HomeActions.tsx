import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import Spacer from '@components/common/Spacer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SendMoneyContainer from '@components/send-money/SendMoneyContainer';

const HomeActions = () => {
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);

  return (
    <View style={{marginTop: 10}}>
      <SendMoneyContainer
        modal
        visible={showSendMoneyModal}
        close={() => setShowSendMoneyModal(false)}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          icon="tray-arrow-up"
          mode="contained"
          buttonColor="#142C8E"
          onPress={() => setShowSendMoneyModal(!showSendMoneyModal)}>
          Send Funds
        </Button>
        <Button icon="tray-arrow-down" mode="contained" buttonColor="#142C8E">
          Redeem Funds
        </Button>
      </View>
      <Spacer space={10} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#142C8E',
            borderStyle: 'solid',
            borderRadius: 10,
            padding: 10,
            marginRight: 5,
          }}>
          <MaterialCommunityIcons name="tray-arrow-down" size={25} />
          <Spacer space={10} />
          <Text variant="titleMedium">Buy Stablecoins</Text>
          <Spacer space={10} />
          <Text variant="bodySmall">Buy stablecoins with Fiat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#142C8E',
            borderStyle: 'solid',
            borderRadius: 10,
            padding: 10,
            marginLeft: 5,
          }}>
          <MaterialCommunityIcons name="tray-arrow-up" size={25} />
          <Spacer space={10} />
          <Text variant="titleMedium">Sell Stablecoins</Text>
          <Spacer space={10} />
          <Text variant="bodySmall">Sell stablecoins instantly</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeActions;
