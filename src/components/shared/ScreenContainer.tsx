import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from 'src/assets';

type propType = {
  children: React.ReactNode;
  style?: ViewStyle | undefined;
  statusBarColor?: string;
  barStyle?: string;
};

const ScreenContainer = ({children, style}: propType) => {
  return (
    <SafeAreaView style={[styles.safeAreaView, style]}>{children}</SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  safeAreaView: {
    // marginHorizontal: 20,
    // marginTop: 20,
    backgroundColor: colors.primary,
    flex: 1,
  },
});
