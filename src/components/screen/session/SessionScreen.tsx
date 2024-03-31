import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import uuidv4 from 'src/components/shared/uuid4v';
import useExerciseName from 'src/components/hooks/useExerciseName';

// Assets
import {colors} from 'src/assets';

// Components
import SessionExerciseCard from './components/SessionExerciseCard';
import SessionController from './components/SessionController';
import {ScreenContainer} from 'src/components/shared';

// Store
import useSessionStore from 'src/store/useSessionStore';

// Navigation
import {RouteProp} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SessionScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'SessionScreen'
>;
type SessionScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'SessionScreen'
>;

import type {exercisesType} from 'src/types';

export type set = {
  id: string;
  value: number;
};

export type exerciseWithSets = {
  id: string;
  sets: set[];
};

type SessionScreenProp = {
  route: SessionScreenRouteProp;
  navigation: SessionScreenNavigationProp;
};

const SessionScreen: React.FC<SessionScreenProp> = ({route, navigation}) => {
  const workout = route.params.workout;
  const [exerciseData, setExerciseData] = useState<exerciseWithSets[]>(
    createExercisesWithSets(workout.exercises),
  );
  const routineId = route.params.routineId;
  // const listRef = useRef<FlatList<exerciseWithSets> | null>(null);
  const registerSession = useSessionStore(s => s.registerSession);
  const [sessionId, setSessionId] = useState(uuidv4());
  const getExerciseName = useExerciseName();

  const handleScrollToNextCard = (index: number) => {
    // listRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  function createExercisesWithSets(
    exercises: exercisesType[],
  ): exerciseWithSets[] {
    return exercises.map(exercise => ({
      id: exercise.id,
      sets: exercise.freq.map(value => ({id: uuidv4(), value})),
    }));
  }

  const handleRemoveFinishedSet = (exerciseId: string, setId: string) => {
    setExerciseData(prev =>
      prev.map(exercise => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter(set => set.id !== setId),
          };
        } else {
          return exercise;
        }
      }),
    );
  };

  let scrollIndex = 0;
  const renderExercise: ListRenderItem<exerciseWithSets> = ({
    item,
  }: ListRenderItemInfo<exerciseWithSets>) => {
    let exername = getExerciseName(item.id) || '';
    const rows = [];
    let key = 0;
    for (let j = 0; j < item.sets.length; j++) {
      // Redner Last Exercise Card SET of an Exercise
      if (item.sets.length - j == 1) {
        rows.push(
          <SessionExerciseCard
            key={item.sets[j].id}
            scrollIndex={scrollIndex}
            sessionId={sessionId}
            setOrderNumber={j}
            exerciseId={item.id}
            exerciseName={exername}
            setId={item.sets[j].id}
            reps={item.sets[j].value}
            expiryTimestamp={workout.resttime[1]}
            handleScrollToNextCard={handleScrollToNextCard}
            handleRemoveFinishedSet={handleRemoveFinishedSet}
          />,
        );
      } else {
        // Redner Exercise Cards of an Exercise
        rows.push(
          <SessionExerciseCard
            key={item.sets[j].id}
            scrollIndex={scrollIndex}
            sessionId={sessionId}
            exerciseId={item.id}
            exerciseName={exername}
            setOrderNumber={j}
            setId={item.sets[j].id}
            reps={item.sets[j].value}
            expiryTimestamp={workout.resttime[0]}
            handleScrollToNextCard={handleScrollToNextCard}
            handleRemoveFinishedSet={handleRemoveFinishedSet}
          />,
        );
      }
      key++;
      scrollIndex++;
    }

    return <>{rows}</>;
  };

  useEffect(() => {
    registerSession(
      sessionId,
      new Date().toString(),
      '',
      new Date().toString(),
      new Date().toString(),
      workout.id,
      routineId,
      [],
    );
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.semiPrimary,
        },
      });
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={style.workoutContainerStyle}>
        {/* <Text style={style.workoutTitleStyle}>{workout.title}</Text> */}
        <TouchableOpacity
          style={{backgroundColor: colors.greeny, padding: 10}}
          onPress={() => {
            console.log('Debug: ', exerciseData);
          }}>
          <Text>Debug: Show vol</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 72}}
        data={exerciseData}
        // extraData={exerciseData}
        // ref={listRef}
        renderItem={renderExercise}
        keyExtractor={item => item.id}
        // pagingEnabled
      />
      <SessionController
        sessionId={sessionId}
        routineId={routineId}
        workoutId={workout.id}
      />
    </ScreenContainer>
  );
};

export default SessionScreen;

const style = StyleSheet.create({
  workoutContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.white,
  },
  workoutTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },

  // modal style
  MainContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalView: {
    width: 300,
    height: 240,
    backgroundColor: colors.greeny,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },

  text: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
});
