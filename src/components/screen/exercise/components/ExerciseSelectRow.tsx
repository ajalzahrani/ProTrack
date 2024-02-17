import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Assets
import {colors, assets} from 'src/assets';

import {exerciseMasterType, exercisesType} from 'src/types';
import useExerciseStore from 'src/store/useExerciseMaster';
import useRoutineStore from 'src/store/useRoutineStore';

type ExerciseSelectRowType = {
  exerciseRow: exerciseMasterType;
  preSelectedExercises: exercisesType[];
  handleExercise: (exerciseId: string) => void;
  handleDeleteExerciseMaster: (exerciseId: string) => void;
};

const ExerciseSelectRow = ({
  exerciseRow,
  preSelectedExercises,
  handleExercise,
  handleDeleteExerciseMaster,
}: ExerciseSelectRowType) => {
  const [isSelected, setIsSelected] = useState(false);
  const [preSelected, setPreSelected] = useState(false);
  const [explore, setIsExplore] = useState(false); // show exercise details
  const [isSwiping, setIsSwiping] = useState(false);

  const handlePreSelect = () => {
    preSelectedExercises.find(exercise => {
      if (exercise.id === exerciseRow.id) {
        setIsSelected(true);
      }
    });
    setPreSelected(true);
  };

  useEffect(() => {
    if (!preSelected) {
      handlePreSelect();
    }
  }, []);

  const renderRightAction = () => {
    return (
      <TouchableOpacity
        onPress={() => handleDeleteExerciseMaster(exerciseRow.id)}
        style={style.rightAction}>
        <View style={style.actionView}>
          <Text style={style.actionText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightAction}
      key={exerciseRow.id}
      onSwipeableWillOpen={() => setIsSwiping(true)}
      onSwipeableWillClose={() => setIsSwiping(false)}>
      <TouchableOpacity
        onPress={() => {
          // setIsExplore(!explore);
          setIsSelected(!isSelected);
          // if (workoutId !== undefined) updateExercises(exerciseRow.id);
          handleExercise(exerciseRow.id);
        }}
        // style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
      >
        <View style={style.ExerciseRow}>
          <Text style={style.exerciseTitleStyle}>{exerciseRow.name}</Text>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={[
                {
                  backgroundColor: isSelected
                    ? colors.secondary
                    : colors.primary,
                },
                {padding: 12, borderRadius: 150 / 2},
              ]}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* {explore && <CardExerciseDetails exercise={exerciseRow} />} */}
    </Swipeable>
  );
};

const style = StyleSheet.create({
  ExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 10,
  },
  exerciseTitleStyle: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  exerciseDetails: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
    fontWeight: '200',
    fontSize: 16,
    lineHeight: 20,
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

export default ExerciseSelectRow;
