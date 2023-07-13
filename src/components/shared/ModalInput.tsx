import {StyleSheet, ViewStyle, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomModal from './CustomModal';

type ModalInputProps = {
  message: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  style?: ViewStyle | ViewStyle[] | null;
  children?: React.ReactNode;
  textValue: string;
  setTextValue: (text: string) => void;
};

export default function ModalInput({
  message,
  visible,
  setVisible,
  textValue,
  setTextValue,
}: ModalInputProps) {
  const [text, setText] = useState(textValue);

  return (
    <>
      <CustomModal
        message={message}
        visible={visible}
        setVisible={setVisible}
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              setTextValue(text);
              setVisible(false);
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              // setTextValue('');
              setText(textValue);
              setVisible(false);
            },
          },
        ]}>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
        />
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 250,
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    borderBottomWidth: 0.2,
    marginVertical: 12,
    // backgroundColor: 'gray',
    padding: 5,
    fontSize: 20,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
