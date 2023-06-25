import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors} from 'src/assets';

type propType = {
  children: React.ReactNode;
  style?: ViewStyle | undefined;
  statusBarColor?: string;
  barStyle?: string;
};

const ScreenContainerScroll = ({children, style}: propType) => {
  return (
    <SafeAreaView style={[styles.safeAreaView, style]}>
      <ScrollView contentContainerStyle={{paddingBottom: 72}}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenContainerScroll;

const styles = StyleSheet.create({
  safeAreaView: {
    // marginHorizontal: 20,
    // marginTop: 20,
    backgroundColor: colors.primary,
    flex: 1,
  },
});
