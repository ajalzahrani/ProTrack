import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet, Modal} from 'react-native';
import {colors} from 'src/assets/';

import {TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

const CustomPicker2 = ({
  visible,
  onClose,
  children,
  items,
  selectedItem,
  setSelectedItem,
}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={50} // adjust the offset as needed
          >
            <TouchableWithoutFeedback onPress={() => null}>
              <View style={styles.modalView}>
                <Picker
                  selectedValue={selectedItem}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedItem(itemValue)
                  }>
                  {items.map((item, index) => {
                    return (
                      <Picker.Item key={index} label={item} value={item} />
                    );
                  })}
                </Picker>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomPicker2;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.secondary,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 35,
    // paddingBottom: 35,
  },
});
