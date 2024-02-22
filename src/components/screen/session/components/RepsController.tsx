import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from 'src/assets';

// Components
import CustomPicker from 'src/components/shared/CustomPicker';

type RepsControllerProp = {
  unitNumber: number;
  unit: string;
  indicatorTitle: string;
  addNumber: (value?: number) => void;
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
  const [modalVisible, setModalVisible] = useState(false);

  const items = Array.from({length: 100}, (_, i) => (i + 1).toString());

  const setValue = (value: string) => {
    addNumber(parseInt(value));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={style.containerStyle}>
      <CustomPicker
        visible={modalVisible}
        onClose={closeModal}
        selectedItem={number.toString()}
        setSelectedItem={setValue}
        items={items}
      />
      {/* inner set container */}
      <View style={style.innerContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          {/* Number indicator */}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={style.numberIndicator}>
            <Text style={{color: colors.white}}>
              {unitNumber} {unit}
            </Text>
          </TouchableOpacity>
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
