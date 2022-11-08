import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HomeContainer from '@components/home/HomeContainer';
import SendMoneyContainer from '@components/send-money/SendMoneyContainer';
import RedeemMoneyContainer from '@components/redeem-money/RedeemMoneyContainer';
import TransactionsContainer from '@components/transactions/TransactionsContainer';
import WalletContainer from '@components/wallet/WalletContainer';
import SettingsContainer from '@components/settings/SettingsContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {generateUUIDV4} from '@utils/funcs';
import NotificationContainer from '@components/notification/NotificationContainer';

const {width} = Dimensions.get('window');
const TabButton = (
  currentTab: string,
  setCurrentTab: any,
  title: string,
  image: any,
  scalingView: any,
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == 'LogOut') {
          // Do your Stuff...
          scalingView();
        } else {
          setCurrentTab(title);
          scalingView();
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? '#f9e969ff' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? '#5359D1' : 'white',
          }}></Image>

        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? '#5359D1' : 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const [currentTab, setCurrentTab] = useState('Home');
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const [showButtonTabMenu, setShowButtonTabMenu] = useState(false);

  const buttonTabMenuContainerValue = useRef(new Animated.Value(0)).current;

  const ScalingView = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowMenu(!showMenu);
  };

  const BOTTOM_MENU_LIST = [
    {
      title: 'Send',
      icon: (
        <MaterialCommunityIcons
          name="arrow-collapse-up"
          size={35}
          color="#f9e969ff"
        />
      ),
      caption: 'Send money in NGN, GHS and USDT',
      action: () => {
        setCurrentTab('Send Money');
      },
    },
    {
      title: 'Redeem',
      icon: (
        <MaterialCommunityIcons
          name="arrow-collapse-down"
          size={35}
          color="#f9e969ff"
        />
      ),
      caption: 'Redeem money in NGN, GHS and USDT',
      action: () => {
        setCurrentTab('Redeem Money');
      },
    },
    {
      title: 'Wallet',
      icon: <Ionicons name="md-wallet-outline" size={35} color="#f9e969ff" />,
      caption: 'View wallet balance and details',
      action: () => {
        setCurrentTab('My Wallet');
      },
    },
  ];
  return (
    <LinearGradient
      style={styles.container}
      colors={['#373ae6ff', '#3b5998', '#192f6a']}>
      <View style={{justifyContent: 'flex-start', padding: 15}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#fff',
          }}>
          <Image
            source={require('assets/images/500x500.png')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
            }}
          />
        </View>
        <View style={{width: 150, alignItems: 'center', marginTop: 50}}>
          <Image
            source={{
              uri: `https://avatars.dicebear.com/api/pixel-art/kay.png`,
            }}
            style={{
              width: 70,
              height: 70,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginTop: 1,
            }}>
            @mattosha
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 6,
                color: 'white',
              }}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexGrow: 1, marginTop: 10}}>
          {
            // Tab Bar Buttons....
          }

          {/* {TabButton(
            currentTab,
            setCurrentTab,
            'Home',
            require('assets/images/home.png'),
            ScalingView,
          )} */}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Send Money',
            require('assets/images/upload.png'),
            ScalingView,
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Redeem Money',
            require('assets/images/download.png'),
            ScalingView,
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Transactions',
            require('assets/images/receipt.png'),
            ScalingView,
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'My Wallet',
            require('assets/images/wallet.png'),
            ScalingView,
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Settings',
            require('assets/images/settings.png'),
            ScalingView,
          )}
        </View>

        <View>
          {TabButton(
            currentTab,
            setCurrentTab,
            'LogOut',
            require('assets/images/power.png'),
            ScalingView,
          )}
        </View>
      </View>

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{scale: scaleValue}, {translateX: offsetValue}],
        }}>
        {
          // Menu Button...
        }

        <Animated.View
          style={{
            // borderWidth: 1,
            // borderStyle: 'solid',
            // borderColor: 'red',
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}>
          <LinearGradient
            style={{height: 100, paddingHorizontal: 15, paddingVertical: 20}}
            colors={['#373ae6ff', '#FFF']}>
            <TouchableOpacity
              onPress={() => {
                // Do Actions Here....
                // Scaling the view...
                ScalingView();
              }}
              style={{width: 45, height: 45}}>
              <MaterialCommunityIcons
                name={
                  showMenu ? 'close-circle' : 'microsoft-xbox-controller-menu'
                }
                size={35}
                color="#fff"
                style={{marginTop: 10}}
              />
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                right: 20,
                top: 30,
              }}>
              <NotificationContainer />
            </View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20,
              }}>
              {currentTab}
            </Text>
          </LinearGradient>

          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 20,
            }}>
            {currentTab === 'Home' && <HomeContainer />}
            {currentTab === 'Send Money' && <SendMoneyContainer />}
            {currentTab === 'Redeem Money' && <RedeemMoneyContainer />}
            {currentTab === 'Transactions' && <TransactionsContainer />}
            {currentTab === 'My Wallet' && <WalletContainer />}
            {currentTab === 'Settings' && <SettingsContainer />}
          </View>
        </Animated.View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: showButtonTabMenu ? '#047cfdff' : '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Animated.View
            style={{
              height: showButtonTabMenu ? 200 : 0,
              paddingHorizontal: 20,
              paddingTop: 30,
              opacity: buttonTabMenuContainerValue,
              transform: [
                {
                  translateY: buttonTabMenuContainerValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            }}>
            {showButtonTabMenu && (
              <>
                {BOTTOM_MENU_LIST.map(item => (
                  <TouchableOpacity
                    key={generateUUIDV4()}
                    onPress={() => {
                      item.action();
                      setShowButtonTabMenu(prev => {
                        if (prev === true) {
                          Animated.spring(buttonTabMenuContainerValue, {
                            toValue: 0,
                            useNativeDriver: true,
                          }).start();
                          return false;
                        }
                        if (prev === false) {
                          Animated.spring(buttonTabMenuContainerValue, {
                            toValue: 1,
                            useNativeDriver: true,
                          }).start();
                          return true;
                        }
                        return true;
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      {item.icon}
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontWeight: '900',
                            fontSize: 20,
                            color: '#fff',
                          }}>
                          {item.title}
                        </Text>
                        <Text style={{color: '#fff'}}>{item.caption}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width,
            }}>
            <TouchableOpacity
              onPress={() => {
                setCurrentTab('Home');
              }}>
              <MaterialCommunityIcons
                name="home-analytics"
                size={40}
                color="#047cfdff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowButtonTabMenu(prev => {
                  if (prev === true) {
                    Animated.spring(buttonTabMenuContainerValue, {
                      toValue: 0,
                      useNativeDriver: true,
                    }).start();
                    return false;
                  }
                  if (prev === false) {
                    Animated.spring(buttonTabMenuContainerValue, {
                      toValue: 1,
                      useNativeDriver: true,
                    }).start();
                    return true;
                  }
                  return true;
                });
              }}>
              <MaterialCommunityIcons
                name="swap-vertical-circle"
                size={60}
                color="#f9e969ff"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="user-circle" size={35} color="#047cfdff" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#373ae6ff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
