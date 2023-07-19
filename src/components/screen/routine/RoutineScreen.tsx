import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import produce from 'immer';

// Components
import CalenderRow from './components/CalenderRow';
import WorkoutCard from './components/WorkoutCard';
import {CustomModal, PressableButton} from 'src/components/shared';
import compareObjects from 'src/components/shared/compareObjects';
import {ScreenContainer} from 'src/components/shared';
import {routineType, workoutType} from 'src/types';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useRoutineStore from 'src/store/useRoutineStore';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {RouteProp} from '@react-navigation/native';

type RoutineScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'RoutineScreen'
>;

export type RoutineScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'RoutineScreen'
>;

type RoutineScreenProps = {
  route: RoutineScreenRouteProp;
  navigation: RoutineScreenNavigationProp;
};

const RoutineScreen: React.FC<RoutineScreenProps> = ({route, navigation}) => {
  // FIXME: workout name should'nt take all the space in pre-list of workout
  // FIXME: Auto select new added workout.
  // FIXME: Clicking on navigation button should prsiste configurations.

  const routineStore = useRoutineStore(s => s.getRoutine());
  const addNewRoutine = useRoutineStore(s => s.addNewRoutine);
  const [routine, setRoutine] = useState<routineType>(routineStore);

  const [workoutId, setWorkoutId] = useState('');
  const workoutIndex = routine.workouts.findIndex(w => w.id === workoutId);
  const workout = routine.workouts[workoutIndex];

  const [dayId, setDayId] = useState(new Date().getDay());

  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateRoutineWorkout = (workout: workoutType) => {
    const workoutIndex = routine.workouts.findIndex(w => w.id === workout.id);
    setRoutine(
      produce(routine, draft => {
        if (workoutIndex === -1) {
          draft.workouts.push(workout);
          return;
        }
        draft.workouts[workoutIndex] = workout;
      }),
    );
  };

  const handleUpdateRoutineAddWekDay = (workoutId: string) => {
    setWorkoutId(workoutId);
    if (workoutId !== '') {
      setRoutine(
        produce(routine, draft => {
          draft.weekdays[dayId].workoutId = workoutId;
          draft.weekdays[dayId].isWorkday = true;
        }),
      );
    }
  };

  const handleUpdateRoutineDeleteWeekDay = () => {
    setWorkoutId('');
    setRoutine(
      produce(routine, draft => {
        draft.weekdays[dayId].workoutId = '';
        draft.weekdays[dayId].isWorkday = false;
      }),
    );
  };

  const handleUpdateRoutine = () => {
    addNewRoutine(routine.id, routine);
    navigation.navigate('RoutineListScreen', {name: ''});
  };

  return (
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
              handleUpdateRoutine();
              setModalVisible(false);
            },
          },
        ]}
      />
      <View>
        <View style={style.goBackStyle}>
          <TouchableOpacity
            onPress={() => {
              if (!compareObjects(routineStore, routine)) {
                setModalVisible(prev => !prev);
                return;
              } else {
                navigation.navigate('RoutineListScreen', {name: ''});
              }
            }}>
            <Image source={assets.icn_goback} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.addNewWorkout}
            onPress={() => {
              // setWorkoutId(undefined);
              navigation.navigate('WorkoutScreen', {
                workout: undefined,
                handleUpdateRoutineWorkout: handleUpdateRoutineWorkout,
              });
            }}>
            <Image source={assets.icn_plus} style={{}} />
            <Text style={{color: colors.red}}>
              {t('schedule.addNewWorkout')}
            </Text>
          </TouchableOpacity>
        </View>

        <CalenderRow
          routine={routine}
          setWorkoutId={setWorkoutId}
          dayId={dayId}
          setDayId={setDayId}
        />
      </View>
      <View style={style.workoutContainerStyle}>
        {routine.workouts[workoutIndex] ? (
          <>
            <View style={style.workoutTitleStyle}>
              <Text style={style.workoutTitleStyle}>{workout.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('WorkoutScreen', {
                    workout: workout,
                    handleUpdateRoutineWorkout: handleUpdateRoutineWorkout,
                  });
                }}>
                <Image source={assets.icn_edit} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleUpdateRoutineDeleteWeekDay();
                }}>
                <Image source={assets.icn_remove} />
              </TouchableOpacity>
            </View>

            <PressableButton
              title={'Start'}
              iconSource={assets.icn_start}
              onPress={() => {
                addNewRoutine(routine.id, routine);
                navigation.navigate('SessionScreen', {
                  routineId: routine.id,
                  workout: workout,
                });
              }}
            />
          </>
        ) : (
          <Text style={style.noWorkoutWorning}>
            {t('schedule.addNewWorkoutOrChoose')}
          </Text>
        )}
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <View style={style.preWorkoutListContainerStyle}>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {routine.workouts?.map(workout => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => {
                  handleUpdateRoutineAddWekDay(workout.id);
                }}>
                <WorkoutCard
                  routineId={routine.id}
                  workout={workout}
                  handleUpdateRoutineWorkout={handleUpdateRoutineWorkout}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
};

const style = StyleSheet.create({
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  addNewWorkout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  workoutContainerStyle: {
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 30,
    marginTop: 56,
  },
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  workoutTitleStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: '600',
    fontSize: 30,
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

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
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
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    // height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
  },

  noWorkoutWorning: {
    color: colors.yellow,
  },
});

export default RoutineScreen;
