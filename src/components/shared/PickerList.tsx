import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from 'src/assets/';
import ViewRow from './ViewRow';
import {} from 'react-native';
import PressableButton from './Pressable';

type picker = {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

type Props = {
  visible: boolean;
  onClose: (fvalue: string, svalue: string) => void;
  children?: React.ReactNode;
  pickers: picker[];
};

const PickerList = ({visible, onClose, children, pickers}: Props) => {
  const [fvalue, setFValue] = useState('');
  const [svalue, setSValue] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback
        onPress={() => {
          onClose(fvalue, svalue);
        }}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={50} // adjust the offset as needed
          >
            <TouchableWithoutFeedback onPress={() => null}>
              <View style={styles.modalView}>
                {/* <PressableButton
                  title="Done"
                  onPress={() => {
                    onClose(fvalue, svalue);
                  }}
                /> */}
                <ViewRow
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  {/* Left picker */}
                  <View
                    style={{
                      width: 150,
                    }}>
                    <Text>seom</Text>
                    <Picker
                      selectedValue={fvalue}
                      onValueChange={itemValue => setFValue(itemValue)}>
                      {pickers[0].items.map((item, index) => {
                        return (
                          <Picker.Item key={index} label={item} value={item} />
                        );
                      })}
                    </Picker>
                  </View>
                  <Text>.</Text>
                  {/* Right picker */}
                  <View
                    style={{
                      width: 150,
                    }}>
                    <Text>seom</Text>
                    <Picker
                      selectedValue={svalue}
                      onValueChange={itemValue => setSValue(itemValue)}>
                      {pickers[1].items.map((item, index) => {
                        return (
                          <Picker.Item key={index} label={item} value={item} />
                        );
                      })}
                    </Picker>
                  </View>
                </ViewRow>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PickerList;

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
