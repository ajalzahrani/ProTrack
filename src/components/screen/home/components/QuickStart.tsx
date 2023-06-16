import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {useTranslation} from 'react-i18next';
import useRoutineStore from 'src/store/useRoutineStore';

import {colors, assets} from 'src/assets';

const QuickStart = () => {
  const routines = useRoutineStore(state => state.routines);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {/* FIXME: adjust the font and the button as the design */}

      <Text style={styles.introductionStyle}>{t('home.introduction')}</Text>

      <TouchableOpacity
        onPress={() => {
          console.log(JSON.stringify(routines));
        }}>
        <LinearGradient
          className="py-3 px-20 rounded-full mt-10"
          colors={['#E10D60', '#FA3B89']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.75, 1]}
          // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
        >
          <Text className="text-base font-semibold text-white">
            {t('home.btnQuickStart')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default QuickStart;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  introductionStyle: {
    color: colors.white,
    marginTop: 12,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
