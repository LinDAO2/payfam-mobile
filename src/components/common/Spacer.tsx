import {View} from 'react-native';
import React from 'react';

interface Props {
  space: number;
}
const Spacer = ({space}: Props) => {
  return <View style={{marginTop: space}} />;
};

export default Spacer;
