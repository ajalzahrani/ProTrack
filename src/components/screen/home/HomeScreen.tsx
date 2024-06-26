import {Text, View, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import {routineType, workoutType} from 'src/types';

// assets
import {colors, assets} from 'src/assets';

// Components
import {PressableButton, ScreenContainer} from 'src/components/shared';
import useRoutineStore from 'src/store/useRoutineStore';
import useSessionStore from 'src/store/useSessionStore';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackRootParamList} from 'src/components/navigation/HomeStack';
import {RouteProp, useNavigation} from '@react-navigation/native';

type HomeScreenRouteProp = RouteProp<
  HomeStackRootParamList,
  'HomeScreen'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackRootParamList,
  'HomeScreen'
>;

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({route, navigation}) => {
  const routines = useRoutineStore(s => s.routines);
  const sesisons = useSessionStore(s => s.sessions);
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const {t} = useTranslation();

  const routineStore = useRoutineStore(s => s.getRoutine());

  const [routine, setRoutine] = useState<routineType>(routineStore);

  return (
    <ScreenContainer>
      <View style={styles.containerStyle}>
        <Text style={styles.homeTitle}>{t('home.title')}!</Text>
        <Text style={styles.homeTitle}>{bm.metric}</Text>
        <Text style={styles.homeTitle}>weight: {bm.weight}</Text>
        <Text style={styles.homeTitle}>BMI {bm.bmi}</Text>
        <Image style={styles.image} source={assets.bgImage} />
        <View style={styles.descriptionContainerStyle}>
          {/* FIXME: adjust the font and the button as the design */}

          <Text style={styles.descriptionStyle}>{t('home.introduction')}</Text>

          <PressableButton
            title={t('home.btnQuickStart')}
            // onPress={() => console.log(sesisons[2])}
            onPress={() => {
              navigation.navigate('WorkoutListScreen');
              
            }}
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
    // marginTop: 120,
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
