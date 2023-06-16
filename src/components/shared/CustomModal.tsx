import {StyleSheet, Text, View, Pressable, ViewStyle} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import KACModal from './KACModal';

type buttonType = {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
};

type CustomModalProps = {
  message: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  buttons?: buttonType[];
  style?: ViewStyle | ViewStyle[] | null;
  children?: React.ReactNode;
};
const CustomModal = ({
  visible,
  setVisible,
  message,
  buttons,
  style,
  children,
}: CustomModalProps) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <KACModal visible={visible} onClose={onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, style]}>
          <Text style={styles.modalText}>{message}</Text>
          {children}
          <View style={{flexDirection: 'row'}}>
            {buttons?.map((button, i) => (
              <ScrollView key={i}>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    {
                      marginRight: 10,
                      backgroundColor: button.backgroundColor
                        ? button.backgroundColor
                        : '#2196F3',
                    },
                  ]}
                  onPress={() => {
                    button.onPress();
                  }}>
                  <Text style={[styles.textStyle, {color: button.textColor}]}>
                    {button.text}
                  </Text>
                </Pressable>
              </ScrollView>
            ))}
          </View>
        </View>
      </View>
    </KACModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  // modal style
  centeredView: {
    // flex: 1,
    // flexWrap: 'wrap',
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
