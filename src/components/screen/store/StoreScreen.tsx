import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  ScreenContainer,
  Pressable,
  PressableButton,
  CustomModal,
  CustomPicker2,
} from 'src/components/shared';

type Props = {};

const StoreScreen = (props: Props) => {
  const [mv, setMv] = useState(false);
  const [mv1, setMv1] = useState(false);
  const [value, setValue] = useState('3');
  return (
    <ScreenContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Welcome to Store</Text>
      </View>
    </ScreenContainer>
  );
};

export default StoreScreen;
