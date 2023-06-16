import {StyleSheet, Text, View, Modal, Pressable, Alert} from 'react-native';
import React from 'react';

type GeneralModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  action: () => void;
  noAction?: () => void;
  message: string;
  buttons?: {
    text: string;
    action: () => void;
    backgroundColor?: string;
    textColor?: string;
  }[];
};
const GeneralModal = ({
  modalVisible,
  setModalVisible,
  action,
  noAction,
  message,
}: GeneralModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose, {marginRight: 10}]}
              onPress={() => {
                action();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            {noAction && (
              <Pressable
                style={[styles.button, styles.buttonClose, {marginRight: 10}]}
                onPress={() => {
                  if (noAction) {
                    noAction();
                  }
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose, {marginRight: 10}]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GeneralModal;

const styles = StyleSheet.create({
  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginHorizontal: 16,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    // height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
  },
});
