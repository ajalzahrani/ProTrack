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
        <Pressable
          title="CustomModal"
          onPress={() => {
            console.log('Presable component');
            setMv(true);
          }}
          titleStyle={{color: 'black'}}
          style={{backgroundColor: 'red', padding: 10}}
        />
        <Pressable
          title={value}
          onPress={() => {
            console.log('CustomPicker2');
            setMv1(true);
          }}
          titleStyle={{color: 'black'}}
          style={{backgroundColor: 'red', padding: 10}}
        />
        <CustomModal
          visible={mv}
          setVisible={setMv}
          message="Hello, World"
          buttons={[{text: 'Ok', onPress: () => setMv(false)}]}
        />
        <CustomPicker2
          visible={mv1}
          onClose={() => setMv1(false)}
          items={['1', '2', '3', '4']}
          setSelectedItem={item => setValue(item)}
          selectedItem={value}
        />
      </View>
    </ScreenContainer>
  );
};

export default StoreScreen;
