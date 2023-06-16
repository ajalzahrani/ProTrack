import {
  StyleSheet,
  View,
  ViewStyle,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';

type propType = {
  children: React.ReactNode;
  style?: ViewStyle;
};
const ViewCenter = ({children, style}: propType) => {
  return <View style={[styles.center, style]}>{children}</View>;
};

export default ViewCenter;

const styles = StyleSheet.create({
  center: {alignItems: 'center'},
});
