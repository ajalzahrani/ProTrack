import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useRoutineStore from 'src/store/useRoutineStore';
import useSessionStore from 'src/store/useSessionStore';

// Componenets
import WorkoutListCard from './components/WorkoutListCard';
import {ScreenContainer, PressableButton} from 'src/components/shared';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeStackRootParamList} from 'src/components/navigation/HomeStack';
import uuidv4 from 'src/components/shared/uuid4v';
import weekdays from 'src/assets/database/weekdays';
import ScreenContainerScroll from 'src/components/shared/ScreenContainerScroll';
import {TouchableHighlight} from 'react-native-gesture-handler';

type WorkoutListScreenRouteType = RouteProp<
  HomeStackRootParamList,
  'WorkoutListScreen'
>;

export type WorkoutListNavigationProp = NativeStackNavigationProp<
  HomeStackRootParamList,
  'WorkoutListScreen'
>;

type WorkoutListScreenProp = {
  route: WorkoutListScreenRouteType;
  navigation: WorkoutListNavigationProp;
};

const WorkoutListScreen: FC<WorkoutListScreenProp> = ({route, navigation}) => {
  const routines = useRoutineStore(s => s.routines);
  const sessions = useSessionStore(s => s.sessions);
  const setRoutineId = useRoutineStore(s => s.setRoutineId);
  const deleteWorkout = useRoutineStore(s => s.deleteWorkout);

  const {t} = useTranslation();

  return (
    <ScreenContainerScroll>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeScreen', {name: ''});
              }}>
              <Image source={assets.icn_goback} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 30, fontWeight: '700', color: colors.white}}>
              {/* {t('routines.routines')} */}
              Workout List
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 72}}
          style={{marginTop: 20}}>
          {routines?.map((routine, i) =>
            routine.workouts?.map((workout, j) => (
              <View
                key={workout.id}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    setRoutineId(routine.id);
                    console.log('navigate to workout screen');
                    navigation.navigate('WorkoutScreen', {
                      workout: workout,
                      routineId: routine.id,
                      handleUpdateRoutineWorkout: () => {},
                      handleDeleteRoutineWorkout: () => {},
                    });
                  }}>
                  <WorkoutListCard
                    routineId={routine.id}
                    workout={workout}
                    handleUpdateRoutineWorkout={() => {}}
                  />
                </TouchableOpacity>
              </View>
            )),
          )}
        </ScrollView>
      </View>
    </ScreenContainerScroll>
  );
};

export default WorkoutListScreen;

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
