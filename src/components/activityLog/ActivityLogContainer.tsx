import {Modal, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActivityLogList from './ActivityLogList';
import {Text} from 'react-native-paper';

const ActivityLogContainer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowModal(!showModal);
        }}>
        <MaterialIcons name="book" size={30} color="#000" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={{backgroundColor: '#ccc', flex: 1}}>
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
              }}>
              <MaterialIcons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <Text variant='headlineMedium' style={{textAlign: 'center'}}>Activity logs</Text>
            <ActivityLogList />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ActivityLogContainer;
