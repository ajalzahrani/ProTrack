import {ViewStyle, ScrollView} from 'react-native';
import React from 'react';
import ScreenContainer from './ScreenContainer';

type propType = {
  children: React.ReactNode;
  style?: ViewStyle | undefined;
  statusBarColor?: string;
  barStyle?: string;
};

const ScreenContainerScroll = ({children, style}: propType) => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{paddingBottom: 72}}>
        {children}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ScreenContainerScroll;
