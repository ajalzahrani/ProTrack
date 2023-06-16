import React from 'react';
import {Text, View} from 'react-native';
import {ScreenContainer} from 'src/components/shared';

type Props = {};

const StoreScreen = (props: Props) => {
  return (
    <ScreenContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Welcome to Store</Text>
      </View>
    </ScreenContainer>
  );
};

export default StoreScreen;
