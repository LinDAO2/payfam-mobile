import {Dimensions} from 'react-native';
import React from 'react';
import Carousel from '@components/common/Carousel';

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
      <Carousel
        images={ADS_LIST}
        imageCardSize={{width: width - 30, height: 150}}
      />
    </>
  );
};

export default HomeContainer;
