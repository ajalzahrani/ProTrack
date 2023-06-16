import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ViewStyle,
  ImageProps,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../assets';
/**
 * 
 * 
 *  This component button has Linear Gradient
 * 
 */
type propType = {
  title: string;
  onPress: (event: Event) => void;
  iconSource?: ImageProps;
  style?: ViewStyle | ViewStyle[];
};
function PressableButton({title, onPress, iconSource, style}: propType) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.linearGradientStyle || {},
        {opacity: pressed ? 0.5 : 1},
      ]}>
      <LinearGradient
        style={[styles.linearGradientStyle, style]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={colors.linerGradient2}>
        <View style={styles.titlePosition}>
          <Text style={styles.text}>{title}</Text>
          {iconSource && <Image source={iconSource.source} />}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

// className="text-base font-semibold text-black"

export default PressableButton;

const styles = StyleSheet.create({
  linearGradientStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  titlePosition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
