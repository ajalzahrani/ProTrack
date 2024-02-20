import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from 'src/assets';

type RepsControllerProp = {
  unitNumber: number;
  unit: string;
  indicatorTitle: string;
  addNumber: () => void;
  minNumber: () => void;
};

const RepsContoller: React.FC<RepsControllerProp> = ({
  unitNumber,
  unit,
  indicatorTitle,
  addNumber,
  minNumber,
}) => {
  const [number, setNumber] = useState(unitNumber);

  return (
    <View style={style.containerStyle}>
      {/* inner set container */}
      <View style={style.innerContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          {/* Number indicator */}
          <View style={style.numberIndicator}>
            <Text style={{color: colors.white}}>
              {unitNumber} {unit}
            </Text>
          </View>
        </View>

        <Text style={style.middleTextStyle}>{indicatorTitle}</Text>

        {/* plus - min buttons */}
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

export default RepsContoller;
