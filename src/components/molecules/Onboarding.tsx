import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {RefObject, useRef} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

export const ONBOARDING_BGS = ['#A5BBFF', '#FFFFFF', '#FF63ED', '#B98EFF'];

export const ONBOARDING_DATA = [
  {
    key: '100',
    title: 'Africa, the second largest continent (after Asia). ',
    description:
      'The continent is bounded on the west by the Atlantic Ocean, on the north by the Mediterranean Sea, on the east by the Red Sea and the Indian Ocean, and on the south by the mingling waters of the Atlantic and Indian oceans.',
    lottieFile: require('assets/lottie/93344-money-investment.json'),
  },
  {
    key: '101',
    title:
      'Africa is covering about one-fifth of the total land surface of Earth.',
    description:
      'The continent is total land area is approximately 11,724,000 square miles (30,365,000 square km), and the continent measures about 5,000 miles (8,000 km) from north to south and about 4,600 miles (7,400 km) from east to west.',
    lottieFile: require('assets/lottie/92520-money-hand.json'),
  },
  {
    key: '102',
    title: 'Africa contains an enormous wealth of mineral resources.',
    description:
      'The continent includes some of the world’s largest reserves of fossil fuels, metallic ores, and gems and precious metals. This richness is matched by a great diversity of biological resources.',
    lottieFile: require('assets/lottie/89118-money.json'),
  },
  {
    key: '103',
    title:
      'The African continent essentially consists of five ancient Precambrian cratons.',
    description:
      'Kaapvaal, Zimbabwe, Tanzania, Congo, and West African—that were formed between about 3.6 and 2 billion years ago and that basically have been tectonically stable since that time.',
    lottieFile: require('assets/lottie/86328-transfer-money.json'),
  },
];

const NextButton = ({
  scrollx,
  flatListRef,
}: {
  scrollx: Animated.Value;
  flatListRef: RefObject<FlatList<any>>;
}) => {
  const yolo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );
  const scale = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  let indexIncrementer = 1;
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: height * 0.1 + 30,
        flexDirection: 'row',
      }}>
      <Pressable
        onPress={() => {
          if (
            flatListRef &&
            flatListRef?.current &&
            indexIncrementer < ONBOARDING_DATA.length
          ) {
            flatListRef?.current.scrollToIndex({index: indexIncrementer});
            indexIncrementer++;
          } else {
            //@ts-ignore
            navigation.navigate('MainScreen');
          }
        }}>
        {({pressed}) => (
          <Animated.View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#000',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  scale,
                },
              ],
            }}>
            <FontAwesome5 name="arrow-right" size={20} color="#fff" />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
};

const Backdrop = ({scrollx}: {scrollx: Animated.Value}) => {
  const backgroundColor = scrollx.interpolate({
    inputRange: ONBOARDING_BGS.map((_, i) => i * width),
    outputRange: ONBOARDING_BGS.map(bg => bg),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const Indicator = ({scrollx}: {scrollx: Animated.Value}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: height * 0.2 + 30,
        flexDirection: 'row',
      }}>
      {ONBOARDING_DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indiator-${i}`}
            style={{
              height: 5,
              width: 5,
              borderRadius: 5,
              backgroundColor: '#333',
              margin: 2,
              opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

export default function Onboarding() {
  const scrollx = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollx={scrollx} />

      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        keyExtractor={_item => _item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollx,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <View style={styles.onboardContainer}>
              <View style={styles.onboardImageContainer}>
                <Lottie source={item.lottieFile} autoPlay loop />
              </View>
              <View style={styles.onboardContentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} />
      <NextButton scrollx={scrollx} flatListRef={flatListRef} />
      <TouchableOpacity
        style={{position: 'absolute', bottom: height * 0.1}}
        onPress={() => {
          //@ts-ignore
          navigation.navigate('MainScreen');
        }}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardContainer: {
    flex: 1,
    width,
  },
  onboardImageContainer: {
    height: height * 0.5,
  },
  onboardContentContainer: {
    height: height * 0.5,
    paddingTop: 20,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
});
