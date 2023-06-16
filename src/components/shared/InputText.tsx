import {StyleSheet, Text, View, TextInput, ViewStyle} from 'react-native';
import React, {LegacyRef, MutableRefObject, RefObject} from 'react';

type propType = {
  value: string | undefined;
  onChangeText: (text: string) => void;
  style?: ViewStyle | ViewStyle[];
  placeholderTextColor?: string;
  placeholder?: string;
  refe?: LegacyRef<TextInput> | undefined;
  keyboardType?: string;
};

const InputText = ({
  value,
  onChangeText,
  style,
  placeholder,
  refe,
}: propType) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      cursorColor="black"
      onChangeText={inpuText => onChangeText(inpuText)}
      placeholderTextColor="#ADD8E6"
      placeholder={placeholder}
      keyboardType="default"
      ref={refe}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#82D7CB',
    borderRadius: 12,
  },
});
