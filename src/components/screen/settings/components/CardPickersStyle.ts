import {StyleSheet, Text, View} from 'react-native';
import {colors} from 'src/assets';

const styles = StyleSheet.create({
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexGrow: 0,
  },
  cardRowText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;
