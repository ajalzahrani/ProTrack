import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import uuidv4 from 'src/components/shared/uuid4v';

// Assets
import {colors, assets} from 'src/assets';

// components
import ExerciseCard from './components/ExerciseCard';
import RestTimeController from './components/RestTimeController';
import {
  PressableButton,
  ScreenContainer,
  CustomModal,
} from 'src/components/shared';

// Navigation
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {workoutType} from 'src/types';
import compareObjects from 'src/components/shared/compareObjects';
export type WorkoutScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'WorkoutScreen'
>;

type WorkoutScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'WorkoutScreen'
>;

type WorkoutScreenProp = {
  route?: WorkoutScreenRouteProp;
  navigation: WorkoutScreenNavigationProp;
};

const WorkoutScreen: React.FC<WorkoutScreenProp> = ({route, navigation}) => {
  const workoutStore = route?.params?.workout;
  const routineId = route?.params?.routineId;
  const [workout, setWorkout] = useState<workoutType>(
    workoutStore || {
      id: uuidv4(),
      title: '',
      exercises: [],
      resttime: [],
    },
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [noExercisesModal, setNoExercisesModal] = useState(false);
  const [timeToRestSet, setTimeToRestSet] = useState(workout.resttime[0]);
  const [timeToRestExercise, setTimeToRestExercise] = useState(
    workout.resttime[1],
  );

  const {t} = useTranslation();

  const handleTimeToRestSet = useCallback(
    (time: number) => {
      setTimeToRestSet(time);
    },
    [setTimeToRestSet],
  );

  const handleTimeToRestExercise = useCallback(
    (time: number) => {
      setTimeToRestExercise(time);
    },
    [setTimeToRestExercise],
  );

  const handleAddWorkout = () => {
    if (workout?.title.length === 0) {
      setTitleModalVisible(true);
    } else {
      if (workout !== undefined) {
        const routineWorkoutHandler = route?.params.handleUpdateRoutineWorkout;
        if (routineWorkoutHandler !== undefined) routineWorkoutHandler(workout);
      } else {
        console.log('workout is undefined');
      }

      navigation!.goBack();
    }
  };

  const handleDeleteWorkout = () => {
    if (workout !== undefined) {
      const routineWorkoutHandler = route?.params.handleUpdateRoutineWorkout;
      if (routineWorkoutHandler !== undefined) routineWorkoutHandler(workout);
    } else {
      console.log('workout is undefined');
    }

    navigation!.goBack();
  };

  const handleTitle = (title: string) => {
    setWorkout(prev => {
      const newWorkout = {...prev};
      newWorkout.title = title;
      return newWorkout;
    });
  };

  const handleExercise = useCallback(
    (exerciseId: string) => {
      setWorkout(prev => {
        const exerciseIndex = prev.exercises.findIndex(
          e => e.id === exerciseId,
        );
        const newExercises = [...prev.exercises];
        if (exerciseIndex !== -1) {
          newExercises.splice(exerciseIndex, 1);
        } else {
          newExercises.push({id: exerciseId, freq: []});
        }
        return {...prev, exercises: newExercises};
      });
    },
    [setWorkout],
  );

  const handleDeleteExercise = useCallback(
    (exerciseId: string) => {
      setWorkout(prev => {
        const exerciseIndex = prev.exercises.findIndex(
          e => e.id === exerciseId,
        );
        if (exerciseIndex !== -1) {
          const newExercises = [...prev.exercises];
          newExercises.splice(exerciseIndex, 1);
          return {...prev, exercises: newExercises};
        } else {
          return prev;
        }
      });
    },
    [setWorkout],
  );

  const handleExerciseFreqSetCount = useCallback(
    (exerciseId: string, newLength: number) => {
      setWorkout(prev => {
        const exerciseIndex = prev.exercises.findIndex(
          e => e.id === exerciseId,
        );
        const newExercises = [...prev.exercises];
        if (exerciseIndex !== -1) {
          const updatedExercise = {
            ...newExercises[exerciseIndex],
            freq: newExercises[exerciseIndex].freq.slice(0, newLength),
          };
          newExercises[exerciseIndex] = updatedExercise;
          return {...prev, exercises: newExercises};
        } else {
          return prev;
        }
      });
    },
    [setWorkout],
  );

  const handleExerciseFreqRepCount = useCallback(
    (exerciseId: string, index: number, value: number) => {
      setWorkout(prev => {
        const exerciseIndex = prev.exercises.findIndex(
          e => e.id === exerciseId,
        );
        const newExercises = [...prev.exercises];
        if (exerciseIndex !== -1) {
          const updatedExercise = {
            ...newExercises[exerciseIndex],
            freq: [...newExercises[exerciseIndex].freq],
          };
          updatedExercise.freq[index] = value;
          newExercises[exerciseIndex] = updatedExercise;
          return {...prev, exercises: newExercises};
        } else {
          return prev;
        }
      });
    },
    [setWorkout],
  );

  // write a function to handle rest time
  const handleRestTimeChange = (index: number, time: number) => {
    console.log(
      'rest time changed 1: ',
      workout.resttime[0],
      index == 0 ? time : 'false',
      ' 2: ',
      workout.resttime[1],
      index == 1 ? time : 'false',
    );
    setWorkout(prev => {
      const newWorkout = {...prev};
      newWorkout.resttime[index] = time;
      return newWorkout;
    });
    console.log('finsished');
  };

  // write same handleRestTimeChange function using useCallback
  const handleRestTimeChangeCallback = useCallback(
    (index: number, time: number) => {
      console.log(
        'rest time changed 1: ',
        workout.resttime[0],
        index == 0 ? time : 'false',
        ' 2: ',
        workout.resttime[1],
        index == 1 ? time : 'false',
      );
      setWorkout(prev => {
        const newWorkout = {...prev};
        newWorkout.resttime[index] = time;
        console.log('rest time changed after: ', newWorkout.resttime[index]);
        return newWorkout;
      });
      console.log('finsished');
    },
    [workout],
  );

  const RestTimeDrawer = () => {
    if (workout !== undefined) {
      let exercises = workout?.exercises?.length;
      if (exercises === 1) {
        return (
          <RestTimeController
            handleTimeToRestSet={handleTimeToRestSet}
            handleTimeToRestExercise={handleTimeToRestExercise}
            controllerType={0}
            indicatorTitle="Set rest time:"
            resttime={workout.resttime}
          />
        );
      } else if (exercises > 1) {
        return (
          <>
            <RestTimeController
              handleTimeToRestSet={handleTimeToRestSet}
              handleTimeToRestExercise={handleTimeToRestExercise}
              controllerType={0}
              indicatorTitle="Set rest time:"
              resttime={workout.resttime}
            />
            <RestTimeController
              handleTimeToRestSet={handleTimeToRestSet}
              handleTimeToRestExercise={handleTimeToRestExercise}
              controllerType={1}
              indicatorTitle="Exercise rest time:"
              resttime={workout.resttime}
            />
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  useEffect(() => {
    // update workout resttime when timeToRestSet or timeToRestExercise changes
    setWorkout(prev => {
      const newWorkout = {...prev};
      newWorkout.resttime = [timeToRestSet, timeToRestExercise];
      return newWorkout;
    });
  }, [timeToRestExercise, timeToRestSet]);

  useEffect(() => {
    RestTimeDrawer();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScreenContainer>
        <CustomModal
          visible={modalVisible}
          setVisible={setModalVisible}
          message="Are you sure you want to save changes?"
          buttons={[
            {text: 'Cancel', onPress: () => setModalVisible(false)},

            {
              text: 'No',
              onPress: () => navigation.goBack(),
              backgroundColor: colors.red,
              textColor: colors.white,
            },
            {
              text: 'Save',
              onPress: () => {
                handleAddWorkout();
                setModalVisible(false);
              },
            },
          ]}
        />
        <CustomModal
          visible={noExercisesModal}
          setVisible={setNoExercisesModal}
          message="This workout has no exercies or sets added! Add exercises to this workout or sets?"
          buttons={[
            {
              text: 'OK',
              onPress: () => {
                setNoExercisesModal(false);
              },
            },
          ]}
        />
        <CustomModal
          visible={titleModalVisible}
          setVisible={setTitleModalVisible}
          message="Please enter a workout name"
          buttons={[{text: 'Ok', onPress: () => setTitleModalVisible(false)}]}
        />
        <View style={style.goBackStyle}>
          <TouchableOpacity onPress={() => navigation!.goBack()}>
            <Image source={assets.icn_goback} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.addNewExercise}
            onPress={() => {
              navigation.navigate('ExerciseScreen', {
                exercises: workout?.exercises,
                handleExercise: handleExercise,
                handleDeleteExercise: handleDeleteExercise,
              });
            }}>
            <Image source={assets.icn_plus} style={{}} />
            <Text style={{color: colors.red}}>
              {t('workout.addNewExercise')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 16, flex: 1}}>
          <View style={style.preWorkoutListContainerStyle}>
            <ScrollView contentContainerStyle={{paddingBottom: 72}}>
              <TextInput
                placeholder="Workout name"
                placeholderTextColor={colors.offwhite}
                onChangeText={inpuText => handleTitle(inpuText)}
                defaultValue={workout?.title}
                style={style.textInputStyle}
              />

              {workout?.exercises?.map(exercise => {
                return (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    handleExerciseFreqRepCount={handleExerciseFreqRepCount}
                    handleExerciseFreqSetCount={handleExerciseFreqSetCount}
                    handleDeleteExercise={handleDeleteExercise}
                  />
                );
              })}
              {RestTimeDrawer()}

              {routineId === undefined ? (
                <>
                  <PressableButton
                    title={t('workout.skitch')}
                    iconSource={assets.icn_edit}
                    onPress={() => {
                      if (workoutStore !== undefined) {
                        if (!compareObjects(workoutStore, workout)) {
                          console.log('objects not equals each other');
                          setModalVisible(prev => !prev);
                          return;
                        }
                        console.log('objects equals each other');
                        handleAddWorkout();
                      } else {
                        handleAddWorkout();
                      }
                    }}
                  />

                  <PressableButton
                    title={t('workout.delete')}
                    onPress={() => {
                      if (workout !== undefined) {
                        if (workout.id !== undefined) {
                          route?.params.handleDeleteRoutineWorkout(workout);
                        }
                      }
                      navigation!.goBack();
                    }}
                  />

                  {/* Test button */}
                  <PressableButton
                    title={'Test'}
                    onPress={() => {
                      console.log(
                        'workout resttime set: ',
                        workout.resttime[0],
                      );
                      console.log(
                        'workout resttime exc: ',
                        workout.resttime[1],
                      );
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </ScrollView>
            {routineId !== undefined ? (
              <TouchableOpacity
                style={style.fab}
                onPress={() => {
                  // Check if workout has exercises or no sets in frist exercise, if not, navigate to workout screen
                  if (
                    workout.exercises.length === 0 ||
                    workout.exercises[0].freq.length === 0
                  ) {
                    // show a modal to add exercises, or to cancel
                    setNoExercisesModal(true);
                    return;
                  }
                  // naviaget to session screen
                  navigation.navigate('SessionScreen', {
                    routineId: routineId,
                    workout: workout,
                  });
                }}>
                <Image source={assets.icn_start} style={{marginRight: 6}} />
                <Text style={{fontWeight: '700', color: colors.white}}>
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScreenContainer>
    </View>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  preWorkoutListContainerStyle: {
    // marginTop: 24,
    marginBottom: 24,
    flex: 1,
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
  textInputStyle: {
    backgroundColor: colors.offwhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 100,
    marginHorizontal: 30,
    marginTop: 47,
  },

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  addNewExercise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fab: {
    display: 'flex',
    flexDirection: 'row',

    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 100,

    position: 'absolute',
    // width: 56,
    // height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    // borderRadius: 30,
    elevation: 8,
  },
});

export default WorkoutScreen;
