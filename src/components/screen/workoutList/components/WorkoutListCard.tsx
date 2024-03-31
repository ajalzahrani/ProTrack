import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Assets
import {colors, assets} from 'src/assets';
import {ListCardTitle} from 'src/components/shared';

import useRoutineStore from 'src/store/useRoutineStore';
import {workoutType} from 'src/types';

// Navigation
import {useNavigation} from '@react-navigation/native';
type WorkoutCardType = {
  routineId: string;
  workout: workoutType;
  handleUpdateRoutineWorkout: (workout: workoutType) => void;
};

const WorkoutLisCard = ({
  routineId,
  workout,
  handleUpdateRoutineWorkout,
}: WorkoutCardType) => {
  const setWorkoutId = useRoutineStore(s => s.setWorkoutId);

  return <ListCardTitle title={workout.title} />;
};

const style = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.secondaryow,
    borderRadius: 10,
  },
  workoutTitle: {
    flex: 1,
    flexWrap: 'wrap',
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
  rightAction: {
    backgroundColor: colors.greeny,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10,
    paddingHorizontal: 6,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default WorkoutLisCard;
