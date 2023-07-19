import React from 'react';
import {Text, View} from 'react-native';
import {ScreenContainer} from 'src/components/shared';
import PressableButton from 'src/components/shared/PressableButton';
import Pressable from 'src/components/shared/Pressable';

type Props = {};

const StoreScreen = (props: Props) => {
  return (
    <ScreenContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Welcome to Store</Text>
        <Pressable
          title="Pressable"
          onPress={() => console.log('Presable component')}
          titleStyle={{color: 'black'}}
          style={{backgroundColor: 'red', padding: 10}}
        />
        <PressableButton
          title="PressableButton"
          onPress={() => console.log('PressableButton')}
          style={{backgroundColor: 'gray', padding: 20, marginTop: 20}}
        />
      </View>
    </ScreenContainer>
  );
};

export default StoreScreen;
