import {View, Text} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import useSessionStore from 'src/store/useSessionStore';
import useExerciseName from 'src/components/hooks/useExerciseName';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import ScreenContainerScroll from 'src/components/shared/ScreenContainerScroll';
import {ViewRow} from 'src/components/shared';
import StaticViewCard from './StaticViewCard';
import useBMI from 'src/components/hooks/useBMI';

type exerciseCounterArrayType = {
  id: string;
  value: number;
};
const StatisticView = () => {
  const um = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const sessions = useSessionStore(state => state.sessions);
  useBMI();

  const exerciseCounts = useMemo(() => {
    let exerciseCount = 0;
    sessions.forEach(session => {
      exerciseCount += session.exercise.length;
    });
    console.log('exerciseCount recomputed: ', exerciseCount.toString());
    return exerciseCount;
  }, [sessions]);

  const totalWeightLifted = useMemo(() => {
    const totalWeightLefted = sessions.reduce(
      (acc, cur) =>
        acc +
        cur?.exercise.reduce(
          (acc, cur) =>
            acc + cur?.set.reduce((acc, cur) => acc + cur?.weight, 0),
          0,
        ),
      0,
    );
    console.log('totalWightLeft recomputed: ', totalWeightLefted.toString());
    return totalWeightLefted;
  }, [sessions]);

  const totalDuration = useMemo(() => {
    let durations = 0;
    for (let i = 0; i < sessions.length; i++) {
      const [hours, minutes, seconds] = sessions[i].duration.split(':');
      const durationInHours = parseInt(hours) + parseInt(minutes) / 60;
      durations += durationInHours;
    }
    console.log('duration recomputed: ', durations.toString());
    return durations;
  }, [sessions]);

  const totalReps = useMemo(() => {
    const reps = sessions.reduce(
      (acc, cur) =>
        acc +
        cur?.exercise.reduce(
          (acc, cur) => acc + cur?.set.reduce((acc, cur) => acc + cur?.reps, 0),
          0,
        ),
      0,
    );
    console.log('reps recomputed: ', reps.toString());
    return reps;
  }, [sessions]);

  const totalSets = useMemo(() => {
    const sets = sessions.reduce(
      (acc, cur) =>
        acc + cur?.exercise.reduce((acc, cur) => acc + cur?.set.length, 0),
      0,
    );
    return sets;
  }, [sessions.length]);

  return (
    <ScreenContainerScroll style={{paddingHorizontal: 20}}>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <StaticViewCard
          title="Sessions"
          value={sessions.length.toString()}
          notification="Total Sessions you have done"
        />
        <StaticViewCard
          title="Exercies"
          value={exerciseCounts.toString()}
          notification="Total exercises you have made"
        />
        <StaticViewCard
          title="Weight Lifted"
          value={totalWeightLifted.toString()}
          notification="Totalou have lifted"
        />
        <StaticViewCard
          title="Reps"
          value={totalReps.toString()}
          notification="Total Reps you have made"
        />
        <StaticViewCard
          title="Time"
          value={totalDuration.toString()}
          notification="Total time you have spent"
        />
        <StaticViewCard
          title="Distance"
          value={'0'}
          notification="Total Distance you have covered"
        />
        <StaticViewCard
          title="Calories"
          value={'0'}
          notification="Total Calories you have burned"
        />
        <StaticViewCard
          title="Sets"
          value={totalSets.toString()}
          notification="Total Sets you have made"
        />
        <StaticViewCard
          title="BMI"
          value={um.bmi.toString()}
          notification="Your Body Mass Index"
        />
      </View>

      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{color: 'white', fontWeight: '600'}}>Statisctic View</Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          Show body measurements according to BMI scintific studies
        </Text>
      </View>
    </ScreenContainerScroll>
  );
};

export default StatisticView;
