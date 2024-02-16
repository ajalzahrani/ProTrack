import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Assets
import {colors, assets} from 'src/assets';

// components
import SETsController from './SETsController';

// Store
import {exercisesType} from 'src/types';
import useRoutineStore from 'src/store/useRoutineStore';
import useExerciseName from 'src/components/hooks/useExerciseName';

type ExerciseCardProp = {
  exercise: exercisesType;
  handleExerciseFreqRepCount: (
    exerciseId: string,
    index: number,
    value: number,
  ) => void;
  handleExerciseFreqSetCount: (exerciseId: string, newLength: number) => void;
  handleDeleteExercise: (exerciseId: string) => void;
};
const ExerciseCard: React.FC<ExerciseCardProp> = ({
  exercise,
  handleExerciseFreqRepCount,
  handleExerciseFreqSetCount,
  handleDeleteExercise,
}) => {
  const deleteExercise = useRoutineStore(s => s.deleteExercise);
  const [set, setSet] = useState(exercise.freq.length);
  const getExerciseName = useExerciseName();

  const [isSwiping, setIsSwiping] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [sharedReps, setSharedReps] = useState(0);

  useEffect(() => {
    if (toggleCheckBox) {
      setSharedReps(exercise.freq[0]);
      // for (let i = 1; i < set; i++) {
      //   handleExerciseFreqRepCount(exercise.id, i, exercise.freq[0]);
      // }
      console.log('recalculating reps controllers');
    } else {
      setSharedReps(0);
    }
  }, [toggleCheckBox]);

  const addSet = () => {
    setSet(set + 1);
    handleExerciseFreqSetCount(exercise.id, set);
  };

  const minSet = () => {
    if (set === 0) {
      setSet(0);
      handleExerciseFreqSetCount(exercise.id, 0);
    } else {
      setSet(set - 1);
      handleExerciseFreqSetCount(exercise.id, set - 1);
    }
  };

  const RepControllerComponent = () => {
    const rows = [];
    for (let i = 0; i < set; i++) {
      // check if the checkbox is checked
      if (toggleCheckBox) {
        rows.push(
          <SETsController
            key={i}
            freq={exercise.freq}
            sharedReps={sharedReps}
            index={i}
            handleExerciseFreqRepCount={handleExerciseFreqRepCount}
            indicatorTitle={'Set ' + (i + 1)}
            exerciseId={exercise.id}
          />,
        );
      } else {
        rows.push(
          <SETsController
            key={i}
            freq={exercise.freq}
            sharedReps={0}
            index={i}
            handleExerciseFreqRepCount={handleExerciseFreqRepCount}
            indicatorTitle={'Set ' + (i + 1)}
            exerciseId={exercise.id}
          />,
        );
      }
      // rows.push(
      //   <SETsController
      //     key={i}
      //     freq={exercise.freq}
      //     index={i}
      //     handleExerciseFreqRepCount={handleExerciseFreqRepCount}
      //     indicatorTitle={'Set ' + (i + 1)}
      //     exerciseId={exercise.id}
      //   />,
      // );
    }
    return <>{rows}</>;
  };

  const renderRightAction = () => {
    return (
      <TouchableOpacity
        onPress={() => handleDeleteExercise(exercise.id)}
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
      key={exercise.id}
      onSwipeableWillOpen={() => setIsSwiping(true)}
      onSwipeableWillClose={() => setIsSwiping(false)}>
      <View style={style.cardContainer}>
        {/* Exercise Titile */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 14,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={style.exerciseTitleStyle}>
              {getExerciseName(exercise?.id)}
            </Text>
          </View>
        </View>

        {/* <SETsController indicatorTitle={'Set'} /> */}
        <View style={style.containerStyle}>
          {/* inner set container */}
          <View style={style.innerContainerStyle}>
            {/* Number indicator */}
            <View style={style.numberIndicator}>
              {/* add check box  */}

              <Text style={{color: colors.white}}>
                {set} {set > 1 ? 'sets' : 'set'}
              </Text>
            </View>

            <Text style={style.middleTextStyle}>Sets</Text>
            <TouchableOpacity
              onPress={() => {
                minSet();
              }}>
              <Image source={assets.icn_min} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addSet()}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        </View>
        {set > 1 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{
                alignSelf: 'center',
                marginTop: 7,
                transform: [{scaleX: 0.8}, {scaleY: 0.8}],
              }}
            />
            <Text style={{color: colors.white}}>Copy reps to other sets</Text>
          </View>
        ) : (
          ''
        )}

        {RepControllerComponent()}
      </View>
    </Swipeable>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 20,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    // marginTop: 10,
  },
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  numberIndicator: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    // paddingHorizontal: 5,
    // paddingVertical: 1,
    width: 80,
    height: 29,
  },
  middleTextStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 24.5,
  },
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default ExerciseCard;
