import {View, Text} from 'react-native';
import React from 'react';

// Assets
import {colors, assets} from 'src/assets';

const Divider = ({color}: {color?: string}) => {
  return (
    <View>
      <View
        style={{
          borderWidth: 0.5,
          width: '100%',
          borderColor: color || colors.secondaryow,
          marginVertical: 15,
        }}
      />
    </View>
  );
};

export default Divider;
