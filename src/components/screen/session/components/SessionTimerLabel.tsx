import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const SessionTimerLabel = ({isActive, seconds, setSeconds}) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      if (seconds === 0) {
        toggle();
        console.log(`secon fi ${seconds}, ${isActive}`);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text className="text-black text-lg">{seconds}</Text>
    </View>
  );
};

export default SessionTimerLabel;
