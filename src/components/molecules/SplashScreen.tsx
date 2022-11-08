import {Animated, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FC} from 'react';
import {ReactNode} from 'react';

const {width, height} = Dimensions.get('window');

interface Props {
  children: ReactNode | ReactNode[];
}
const SplashScreen: FC<Props> = ({children}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(2)).current;
  const logoXYPos = useRef(new Animated.ValueXY()).current;
  const [isAppReady, setisAppReady] = useState(false);
  const [hideContainer, setHideContainer] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 5000, // Fade out duration
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 5000, // Fade out duration
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.spring(logoXYPos, {
          toValue: {
            x: -width / 2 - 200,
            y: -height - 60,
          },
          delay: 2000,
          useNativeDriver: true,
          bounciness: 0.25,
        }),
        Animated.timing(logoScale, {
          toValue: 0.4,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 1000, // Fade out duration
          useNativeDriver: true,
        }).start(() => {
          setHideContainer(true);
          setisAppReady(true);
        });
      });
    });
  }, []);

  return (
    <>
      {isAppReady && children}
      {!hideContainer && (
        <Animated.View
          collapsable={false}
          style={[styles.container, {opacity: containerOpacity}]}>
          <Animated.Image
            source={require('assets/images/500x500.png')}
            style={[
              {
                width: 150,
                height: 150,
              },
              {
                opacity: logoOpacity,
                transform: [
                  {
                    scale: logoScale,
                  },

                  {
                    translateX: logoXYPos.x,
                  },
                  {
                    translateY: logoXYPos.y,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      )}
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
