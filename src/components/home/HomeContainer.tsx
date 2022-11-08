import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {generateUUIDV4} from '@utils/funcs';

const {width} = Dimensions.get('window');

const HomeContainer = () => {
  const ADS_LIST = [
    'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1006060/pexels-photo-1006060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/321452/pexels-photo-321452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const VISIBLE_ITEMS = 2;
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  return (
    <>
      <View style={{height: 150, overflow: 'hidden'}}>
        <Animated.FlatList
          data={ADS_LIST}
          keyExtractor={_item => generateUUIDV4()}
          CellRendererComponent={({item, index, children, style, ...props}) => {
            const newStyle = [style, {zIndex: ADS_LIST.length - index}];
            return (
              <View style={newStyle} index={index} {...props}>
                {children}
              </View>
            );
          }}
          renderItem={({item, index}) => {
            const inputRange = [index - 1, index, index + 1];
            const translateY = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [10, 0, -40], 
            });
            const scale = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [0.8, 1, 1.3],
            });
            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
            });
            return (
              // <View style={{position: 'relative'}}>
              <Animated.Image
                source={{uri: item}}
                style={{
                  height: 150,
                  width: width - 20,
                  borderRadius: 6,
                  resizeMode: 'cover',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  // opacity,
                  // transform: [
                  //   {
                  //     translateY,
                  //   },
                  //   {
                  //     scale,
                  //   },
                  // ],
                }}
              />
              // </View>
            );
          }}
          // snapToInterval={150}
          // decelerationRate="fast"
          // showsHorizontalScrollIndicator={false}
          // bounces={false}
          // scrollEnabled={true}
          // horizontal
          pagingEnabled
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: 10,
            // borderWidth: 1,
            // borderColor: '#ddd',
            // borderStyle: 'solid',
          }}
          removeClippedSubviews={false}
        />
      </View>
      <ScrollView>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={{
            height: 150,
            borderRadius: 6,
            marginTop: 10,
          }}
        />
      </ScrollView>
    </>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({});
