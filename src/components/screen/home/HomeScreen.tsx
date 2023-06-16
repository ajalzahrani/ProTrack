import {Text, View, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import KACModal from 'src/components/shared/KACModal';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import useBMICas from 'src/components/hooks/useBMI';


// assets
import {colors, assets} from 'src/assets';

// Components
import QuickStart from './components/QuickStart';
import {CustomModal, ModalInput, Pressable} from 'src/components/shared';
import PressableButton from '../../shared/PressableButton';
import ScreenContainer from 'src/components/shared/ScreenContainer';
import useRoutineStore from 'src/store/useRoutineStore';

const HomeScreen = () => {
  const [modalView, setModalVisible] = useState(false);
  const routines = useRoutineStore(s => s.routines);
  const [textValue, setTextValue] = useState('');
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <ModalInput
        message="Hello, World"
        visible={modalView}
        setVisible={setModalVisible}
        textValue={textValue}
        setTextValue={setTextValue}
      />

      <View style={styles.containerStyle}>
        {/* <Text style={styles.homeTitle}>{textValue}</Text> */}
        <Text style={styles.homeTitle}>{t('home.title')}!</Text>
        <Text style={styles.homeTitle}>{bm.metric}</Text>
        <Text style={styles.homeTitle}>
          weight: {bm.weight}
        </Text>
        <Text style={styles.homeTitle}>BMI {bm.bmi}</Text>
        <Image style={styles.image} source={assets.bgImage} />
        <View style={styles.descriptionContainerStyle}>
          {/* FIXME: adjust the font and the button as the design */}

          <Text style={styles.descriptionStyle}>{t('home.introduction')}</Text>

          <PressableButton
            title={t('home.btnQuickStart')}
            onPress={() => setModalVisible(true)}
            style={{paddingHorizontal: 40, marginTop: 20}}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeTitle: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '600',
  },
  containerStyle: {
    alignItems: 'center',
    padding: 16,
    marginTop: 120,
  },
  image: {
    marginTop: 12,
  },
  titleStyle: {
    marginTop: 1,
    fontWeight: '400',
    fontSize: '32',
    color: colors.white,
  },
  descriptionContainerStyle: {
    alignItems: 'center',
  },
  descriptionStyle: {
    color: colors.white,
    marginTop: 12,
    // fontFamily: 'normal',
    textAlign: 'center',
  },
});
