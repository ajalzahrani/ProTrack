import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet, Modal} from 'react-native';
import {colors} from 'src/assets/';
import {Pressable} from 'src/components/shared';

import {TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
/**
 *
 *
 * This picker has button this is the only differnet between this and
 * CustomPicker2
 *
 *
 */
type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

const CustomPicker = ({
  visible,
  onClose,
  children,
  items,
  selectedItem,
  setSelectedItem,
}: Props) => {
  const [value, setValue] = useState(selectedItem);
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
              <View style={{}}>
                <View style={styles.modalView}>
                  <Pressable
                    title="Done"
                    onPress={() => {
                      setSelectedItem(value);
                      onClose();
                    }}
                    titleStyle={{fontSize: 20}}
                    style={{
                      marginLeft: 'auto',
                    }}
                  />
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) => {
                      setValue(itemValue);
                    }}>
                    {items.map((item, index) => {
                      return (
                        <Picker.Item key={index} label={item} value={item} />
                      );
                    })}
                  </Picker>
                  {children}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomPicker;

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
