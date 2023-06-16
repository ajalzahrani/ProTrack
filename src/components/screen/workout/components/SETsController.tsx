import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from 'src/assets';

type SETsControllerProp = {
  indicatorTitle: string;
  index: number;
  freq: number[];
  handleExerciseFreqRepCount: (
    exerciseId: string,
    index: number,
    value: number,
  ) => void;
  exerciseId: string;
};

const SETsController: React.FC<SETsControllerProp> = ({
  indicatorTitle,
  freq,
  index,
  handleExerciseFreqRepCount,
  exerciseId,
}) => {
  const [number, setNumber] = useState(freq[index] || 0);
  const updateFreq = () => {
    handleExerciseFreqRepCount(exerciseId, index, number);
  };

  const addNumber = () => {
    setNumber(number + 1);
  };

  const minNumber = () => {
    if (number === 0) {
      setNumber(0);
    } else {
      setNumber(number - 1);
    }
  };

  useEffect(() => {
    updateFreq();
  }, [number]);

  return (
    <View style={style.containerStyle}>
      {/* inner set container */}
      <View style={style.innerContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          {/* Number indicator */}
          <View style={style.numberIndicator}>
            <Text style={{color: colors.white}}>{number}</Text>
          </View>

          {/* FIXME: Add check box to copy first set reps to other sets reps */}
          {/* {index == 0 ? <Text>CheckBox copy</Text> : ''} */}
        </View>

        <Text style={style.middleTextStyle}>{indicatorTitle}</Text>

        {/* plus - min buttons */}
        <View
          style={{flexDirection: 'row'}}
          // className="space-x-10"
        >
          <TouchableOpacity
            onPress={() => {
              minNumber();
            }}>
            <Image source={assets.icn_min} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addNumber()}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>
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
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
});

export default SETsController;
