import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode, ReactPropTypes} from 'react';

type propType = {
  children: ReactNode;
  style?: ViewStyle;
  space?: string;
};

const ViewRow = ({children, style, space}: propType) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export default ViewRow;

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
});
