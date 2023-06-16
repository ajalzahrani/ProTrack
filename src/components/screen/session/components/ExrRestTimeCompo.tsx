import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const ExrRestTimeCompo = ({id, isStarted, setIsStarted, i, compoAddress}) => {
  const [time, setTime] = useState(5);
  // console.log(isStarted, ' ', id);
  const iad = compoAddress?.i;
  const jad = compoAddress?.j;

  useEffect(() => {
    // console.log('UseEffect Exercise: ', i);
    // console.log('iad: ', iad);
    if (iad === i && jad === undefined && isStarted === true) {
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
    <View className="p-5 mx-5 bg-red-500 items-center justify-center mt-3">
      <Text className="text-gray-900">
        ID: {id} Exercise Rest Time: {time}
      </Text>
    </View>
  );
};

export default ExrRestTimeCompo;

const styles = StyleSheet.create({});
