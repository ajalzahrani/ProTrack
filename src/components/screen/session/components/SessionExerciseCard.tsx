import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTimer} from 'use-timer';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useSessionStore from 'src/store/useSessionStore';

// Components
import RepsContoller from './RepsController';

type SessionExerciseCardType = {
  scrollIndex: number;
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  setOrderNumber: number;
  reps: number;
  expiryTimestamp?: number;
  scrollToNextCard: (index: number) => void;
  // setSelectedId: () => void;
};

const SessionExerciseCard: React.FC<SessionExerciseCardType> = ({
  scrollIndex,
  sessionId,
  exerciseId,
  exerciseName,
  setOrderNumber,
  reps,
  expiryTimestamp,
  scrollToNextCard,
}) => {
  // FIXME: Add value picker for weight and time
  // FIXME: Disable edit session proprties after set is registered
  const registerSet = useSessionStore(s => s.registerSet);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [skitchTitle, setSkitchTitle] = useState(false);

  const [weight, setWeight] = useState(0);
  const [rep, setRep] = useState(reps);
  const [tut, setTut] = useState(0);

  const [isRegistered, setIsRegistered] = useState(false);

  const {time, start, pause, status} = useTimer({
    initialTime: expiryTimestamp,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    if (time === 0) {
      handleTimerLableStop();
    }
  }, [time]);

  const handleTimerLableStop = () => {
    scrollToNextCard(scrollIndex);
    setIsExpanded(s => !s);
    setSkitchTitle(true);
  };

  function toggleRestTimer() {
    setIsActive(!isActive);
    start();
  }

  function reset() {
    setIsActive(false);
  }

  const addWeight = (value?: number) => {
    if (value) {
      setWeight(value);
    } else {
      setWeight(weight + 5);
    }
  };
  const minWeight = () => {
    if (weight === 0) {
      setWeight(0);
    } else {
      setWeight(weight - 1);
    }
  };
  const addRep = (value?: number) => {
    if (value) {
      setRep(value);
    } else {
      setRep(rep + 1);
    }
  };
  const minRep = () => {
    if (rep === 0) {
      setRep(0);
    } else {
      setRep(rep - 1);
    }
  };
  const addTut = (value?: number) => {
    if (value) {
      setTut(value);
    } else {
      setTut(tut + 5);
    }
  };
  const minTut = () => {
    if (tut === 0) {
      setTut(0);
    } else {
      setTut(tut - 1);
    }
  };

  return (
    <>
      <View
        style={[
          style.cardContainer,
          {borderBottomEndRadius: isExpanded ? 0 : 10},
          {borderBottomStartRadius: isExpanded ? 0 : 10},
          {marginBottom: isExpanded ? 0 : 7},
        ]}>
        <View style={style.cardTitle}>
          <View>
            {isExpanded ? (
              <></>
            ) : (
              <Text style={style.timerLable}>
                {time > 0 ? time + 's' : '--'}
              </Text>
            )}
          </View>
          <Text
            style={skitchTitle ? style.workoutTitleDone : style.workoutTitle}>
            {exerciseName}
          </Text>
          <Text
            style={
              skitchTitle
                ? style.setOrderNumberDoneStyle
                : style.setOrderNumberStyle
            }>
            {' '}
            (Set {setOrderNumber})
          </Text>
        </View>
        <View style={style.editContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}>
            <Image source={isExpanded ? assets.icn_min : assets.icn_add} />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && (
        <View style={style.controllerContainerStyle}>
          {/* <SETsController indicatorTitle={'Set'} /> */}
          <RepsContoller
            unitNumber={weight}
            unit="kg"
            indicatorTitle="Weight"
            addNumber={addWeight}
            minNumber={minWeight}
          />

          {/* Dividor */}
          <View
            style={{
              borderWidth: 1,
              width: 300,
              borderColor: colors.secondaryow,
            }}
          />

          <RepsContoller
            unitNumber={rep}
            unit="r"
            indicatorTitle="Reps"
            addNumber={addRep}
            minNumber={minRep}
          />

          {/* Dividor */}
          <View
            style={{
              borderWidth: 1,
              width: 300,
              borderColor: colors.secondaryow,
            }}
          />

          <RepsContoller
            unitNumber={tut}
            unit="s"
            indicatorTitle="TUT"
            addNumber={addTut}
            minNumber={minTut}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: colors.secondaryow,
              justifyContent: 'space-between',
              marginLeft: 5,
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.yellow,
                borderRadius: 150 / 2,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  textAlign: 'left',
                }}>
                {time > 0 ? time + 's' : '--'}
              </Text>
            </View>
            <TouchableOpacity
              disabled={isRegistered}
              style={{padding: 10}}
              onPress={() => {
                toggleRestTimer();
                // Register set to exercises array
                registerSet(sessionId, exerciseId, weight, rep, tut);
                setIsRegistered(true);
              }}>
              <LinearGradient
                // className="py-3 px-10 rounded-full"
                colors={['#E10D60', '#FA3B89']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.75, 1]}
                style={{borderRadius: 20}}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                    padding: 10,
                  }}>
                  {skitchTitle ? 'Edit' : 'Register set'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  // Exercise card
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 5,
    marginBottom: 7,
    marginTop: 7,
    marginHorizontal: 20,
    // marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.secondaryow,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  workoutTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
  workoutTitleDone: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.offwhite,
    textDecorationLine: 'line-through',
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
  controllerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 7,
    marginHorizontal: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.secondaryow,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  controllerMiddleTextStyle: {
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
  timerLable: {
    marginRight: 20,
    fontSize: 18,
    color: 'white',
    // width: 50, // Adjust this value as needed
    textAlign: 'left',
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 30,
    alignItems: 'center',
  },
  setOrderNumberStyle: {
    color: colors.red,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 30,
    // marginTop: 10,
  },
  setOrderNumberDoneStyle: {
    color: colors.red,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 30,
    // marginTop: 10,
    textDecorationLine: 'line-through',
  },
});

export default SessionExerciseCard;
