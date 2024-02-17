import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

import useExerciseStore from 'src/store/useExerciseMaster';
import useRoutineStore from 'src/store/useRoutineStore';

// Assets
import {colors, assets} from 'src/assets';

type RestTimeControllerProps = {
  indicatorTitle: string;
  controllerType: number;
  resttime: number[];
  handleRestTimeChange: (resttime: number[]) => void;
};
const RestTimeController: React.FC<RestTimeControllerProps> = ({
  indicatorTitle,
  controllerType,
  resttime,
  handleRestTimeChange,
}) => {
  const [number, setNumber] = useState(() => {
    if (controllerType === 0) return resttime[0];
    else return resttime[1];
  });

  const [restTimeObj, setRestTimeObj] = useState(resttime);

  const [value, setValue] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  const [isPressed, setIsPressed] = useState(false);

  const handleChange = (newValue: ValueMap) => {
    setValue(newValue);
  };

  const convertTimeToSeconds = (min: number, sec: number) => {
    return min * 60 + sec;
  };

  const convertToTimeObj = (number = 0) => {
    let timeObj = {hours: 0, minutes: 0, seconds: 0};

    timeObj.minutes = Math.floor(number / 60);
    timeObj.seconds = number % 60;

    return timeObj;
  };

  useEffect(() => {
    // convert the time to seconds
    const convertedTime = convertTimeToSeconds(value.minutes, value.seconds);

    // update the number
    setNumber(convertedTime);

    // update the workoutObj using the handleRestTimeChange
    let newRestTime = [...restTimeObj];
    newRestTime[controllerType] = convertedTime;
    handleRestTimeChange(newRestTime);
  }, [value.seconds, value.minutes]);

  useEffect(() => {
    // update the restTimeObj
    setRestTimeObj(prev => {
      let newRestTime = [...prev];
      newRestTime[controllerType] = number;
      return newRestTime;
    });
  }, [number]);

  useEffect(() => {
    setValue(convertToTimeObj(number));
  }, []);

  return (
    <View style={style.containerStyle}>
      <View style={style.innerContainerStyle}>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'flex-start',
              flexDirection: 'row',
            }}>
            <Image
              source={isPressed ? assets.icn_min : assets.icn_add}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text style={style.middleTextStyle}>{indicatorTitle}</Text>
            {/* <ChevronDownIcon /> */}
            <Text style={style.middleTextStyle}>
              {value.minutes} Min {value.seconds} Sec
            </Text>
          </View>
        </TouchableOpacity>
        {isPressed && (
          <TimePicker
            value={value}
            onChange={handleChange}
            textColor={colors.white}
            pickerShows={['minutes', 'seconds']}
            secondsUnit="Sec"
            minutesUnit="Min"
            secondsInterval={5}
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 20,
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  numberIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    width: 80,
    height: 29,
  },
  middleTextStyle: {
    marginRight: 10,
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
});

export default RestTimeController;
