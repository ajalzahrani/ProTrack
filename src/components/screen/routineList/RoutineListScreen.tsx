import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useRoutineStore from 'src/store/useRoutineStore';

// Componenets
import RoutineCard from './components/RoutineCard';
import {ScreenContainer, PressableButton} from 'src/components/shared';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import uuidv4 from 'src/components/shared/uuid4v';
import weekdays from 'src/assets/database/weekdays';

type RoutineListScreenRouteType = RouteProp<
  RoutineStackRootParamList,
  'RoutineListScreen'
>;

export type RoutineListNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'RoutineListScreen'
>;

type RoutineListProps = {
  route: RoutineListScreenRouteType;
  navigation: RoutineListNavigationProp;
};

const RoutineListScreen: React.FC<RoutineListProps> = ({route, navigation}) => {
  const routines = useRoutineStore(s => s.routines);
  const setRoutineId = useRoutineStore(s => s.setRoutineId);

  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 30, fontWeight: '700', color: colors.white}}>
              {t('routines.routines')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RoutineFormScreen', {
                  routine: {
                    id: '',
                    title: '',
                    startDate: '',
                    endDate: '',
                    level: 1,
                    description: '',
                    workouts: [],
                    weekdays: weekdays,
                  },
                });
              }}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 72}}
          style={{marginTop: 20}}>
          {routines?.map((routine, i) => (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  setRoutineId(routine.id);
                  navigation.navigate('RoutineScreen');
                }}>
                <RoutineCard routine={routine} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <PressableButton
          title={t('routines.printRoutines')}
          onPress={() => console.log(JSON.stringify(routines))}
        />
      </View>
    </ScreenContainer>
  );
};

export default RoutineListScreen;

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  workoutContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: 30,
    marginTop: 56,
  },
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 24.5,
  },
  startTextStyle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  titleButtonContainerStyle: {
    marginHorizontal: 72,
  },
});
