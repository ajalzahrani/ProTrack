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
  handleRemoveFinishedSet: (exerciseId: string, setId: string) => void;;

export default function SetScreen({

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
}: SessionExerciseCardType) {
  
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
    <Text>SetScreen</Text>
  )
}
