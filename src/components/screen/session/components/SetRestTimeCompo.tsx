import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const SetRestTimeCompo = ({
  id,
  isStarted,
  setIsStarted,
  i,
  j,
  compoAddress,
}) => {
  const [time, setTime] = useState(10);
  // console.log(isStarted, ' ', id);
  const iad = compoAddress?.i;
  const jad = compoAddress?.j;

  useEffect(() => {
    // console.log('UseEffect SET: ', i, j);
    // console.log('iad: ', iad, 'jad: ', jad);
    if (iad === i && jad === j && isStarted === true) {
      //   console.log('useEffect id ', id);
      setTimeout(() => {
        setTime(prev => prev - 1);
      }, 1000);

      if (time === 1) {
        setIsStarted(false);
        // setTime(10);
      }
    }
  }, [time, isStarted]);

  return (
    <View
      style={styles.containerStyle}
      // className="p-2 mx-5 bg-yellow-500 items-center justify-center"
    >
      <Text className="text-gray-900">
        ID: {id} SET Rest Time: {time}
      </Text>
    </View>
  );
};

export default SetRestTimeCompo;

const styles = StyleSheet.create({
  containerStyle: {
    padding: 5,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
