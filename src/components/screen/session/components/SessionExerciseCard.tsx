import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTimer} from 'use-timer';
import {
  AnimatedCircularProgress,
  CircularProgress,
} from 'react-native-circular-progress';

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
  setId: string;
  reps: number;
  expiryTimestamp?: number;
  handleScrollToNextCard: (index: number) => void;
  handleRemoveFinishedSet: (exerciseId: string, setId: string) => void;
};

const SessionExerciseCard: React.FC<SessionExerciseCardType> = ({
  scrollIndex,
  sessionId,
  exerciseId,
  exerciseName,
  setOrderNumber,
  setId,
  reps,
  expiryTimestamp,
  handleScrollToNextCard,
  handleRemoveFinishedSet,
}) => {
  // FIXME: Disable edit session proprties after set is registered
  const registerSet = useSessionStore(s => s.registerSet);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [skitchTitle, setSkitchTitle] = useState(false);
  const [fill, setFill] = useState(0);

  const [weight, setWeight] = useState(0);
  const [rep, setRep] = useState(reps);
  const [tut, setTut] = useState(0);

  const [isRegistered, setIsRegistered] = useState(false);
  const setOrderNumberState = useRef<number>(setOrderNumber);

  const {time, start, pause, status} = useTimer({
    initialTime: expiryTimestamp,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    if (time === 0) {
      handleTimerLableStop();
    }
  }, [time]);

  const handleProgressUpdate = () => {
    setFill(100);
  };

  const handleTimerLableStop = () => {
    // handleScrollToNextCard(scrollIndex);
    handleRemoveFinishedSet(exerciseId, setId);
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
          style.cardTitleContainer,
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
            (Set {setOrderNumberState.current + 1})
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
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={fill}
            tintColor="#00e0ff"
            duration={time * 1000}
            onAnimationComplete={() => console.log('OnAnimateionComplete')}
            backgroundColor="#3d5875"
            children={fill => (
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
            )}
          />
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
              // disabled={isRegistered}
              style={{padding: 10}}
              onPress={() => {
                toggleRestTimer();
                handleProgressUpdate();
                // Register set to exercises array
                // registerSet(sessionId, exerciseId, weight, rep, tut);
                // setIsRegistered(true);
                // Debugging
                // handleRemoveFinishedSet(exerciseId, setOrderNumberState);
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
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                console.log('setId: ', setId);
              }}>
              <Text>print set order number</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  // Exercise card
  cardTitleContainer: {
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
    // flex: 1,
    // height: 500,
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
