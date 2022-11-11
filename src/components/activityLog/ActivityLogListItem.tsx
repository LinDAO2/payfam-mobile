import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IActivityLogDocument} from '@types/activity-log-types';
import moment from 'moment';
import {Text} from 'react-native-paper';
import {getActivitySpaceIcon} from '@helpers/collection-helpers';

interface Props {
  activity: IActivityLogDocument;
}
const ActivityLogListItem = ({activity}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        marginVertical: 3,
      }}>
      <Text variant="bodySmall" style={{textAlign: 'right'}}>
        {moment(activity.addedOn.toDate()).format('lll')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: 30,
            height: 30,
            borderRadius: 15,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {getActivitySpaceIcon(activity.space)}
        </View>
        <Text>{activity.title}</Text>
      </View>
    </View>
  );
};

export default ActivityLogListItem;

const styles = StyleSheet.create({});
