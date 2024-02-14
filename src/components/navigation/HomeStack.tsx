import React from 'react';

// Stack Navigator
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const StackNav = createNativeStackNavigator<HomeStackRootParamList>();

// Screens
import HomeScreen from '../screen/home/HomeScreen';
import WorkoutListScreen from '../screen/workoutList/WorkoutListScreen';
import WorkoutScreen from '../screen/workout/WorkoutScreen';
import ExerciseScreen from '../screen/exercise/ExerciseScreen';
import SessionScreen from '../screen/session/SessionScreen';
import SessionReportScreen from '../screen/sessionReport/SessionReportScreen';
import {exercisesType, routineType, workoutType} from '../../types';

export type HomeStackRootParamList = {
  HomeScreen: undefined;
  WorkoutListScreen: undefined;
  WorkoutScreen: {
    workout: workoutType | undefined;
    routineId: string | undefined;
    handleUpdateRoutineWorkout: (workout: workoutType) => void;
    handleDeleteRoutineWorkout: (workout: workoutType) => void;
  };
  ExerciseScreen: {
    exercises: exercisesType[];
    handleExercise: (exerciseId: string) => void;
  };
  SessionScreen: {routineId: string; workout: workoutType}; 
  SessionReportScreen: {sessionId: string};
};

// use this for useNavigation hook
export type homeeStackProp =
  NativeStackNavigationProp<HomeStackRootParamList>;

const HomeStack = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="HomeScreen" component={HomeScreen} />
      <StackNav.Screen name="WorkoutListScreen" component={WorkoutListScreen}/>
      <StackNav.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <StackNav.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <StackNav.Screen name="SessionScreen" component={SessionScreen} />
      <StackNav.Screen
        name="SessionReportScreen"
        component={SessionReportScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
    </StackNav.Navigator>
  );
};

export default HomeStack;
