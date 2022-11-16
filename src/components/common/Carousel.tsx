import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {generateUUIDV4} from '@utils/funcs';

const {width} = Dimensions.get('screen');

const Indicator = ({
  scrollx,
  images,
}: {
  scrollx: Animated.Value;
  images: string[];
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {images.map((_, i) => {
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
              height: 7,
              width: 7,
              borderRadius: 7,
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

interface Props {
  images: string[];
  imageCardSize: {
    width: number;
    height: number;
  };
}
const Carousel = ({images, imageCardSize}: Props) => {
  const scrollx = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={_item => generateUUIDV4()}
        renderItem={({item: image}) => (
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}>
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: imageCardSize.width,
                height: imageCardSize.height,
                borderRadius: 10,
              }}
            />
          </View>
        )}
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
      />
      <View style={{alignItems: 'center'}}>
        <Indicator scrollx={scrollx} images={images} />
      </View>
    </View>
  );
};

export default Carousel;
