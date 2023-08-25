import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
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
  const getExerciesName = useExerciseName();
  useBMI();

  const exerciseCounterArray: exerciseCounterArrayType[] = [{id: '', value: 0}];
  const exerciseCounts = useMemo(() => {
    for (let i = 0; i < sessions.length; i++) {
      for (let j = 0; j < sessions[i].exercise.length; j++) {
        const id = sessions[i].exercise[j].exerciseId;
        const index = sessions[i].exercise.findIndex(i => i.exerciseId === id);
        if (index === -1) {
          exerciseCounterArray.push({id: id, value: 1});
        } else {
          exerciseCounterArray[index].value += 1;
        }
      }
    }
    return exerciseCounterArray;
  }, [sessions]);

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
          value={sessions
            .reduce((acc, cur) => acc + cur?.exercise.length, 0)
            .toString()}
          notification="Total exercises you have made"
        />
        <StaticViewCard
          title="Weight Lifted"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce(
                  (acc, cur) =>
                    acc + cur?.sets.reduce((acc, cur) => acc + cur?.weight, 0),
                  0,
                ),
              0,
            )
            .toString()}
          notification="Total weight you have lifted"
        />
        <StaticViewCard
          title="Reps"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce(
                  (acc, cur) =>
                    acc + cur?.sets.reduce((acc, cur) => acc + cur?.reps, 0),
                  0,
                ),
              0,
            )
            .toString()}
          notification="Total Reps you have made"
        />
        <StaticViewCard
          title="Time"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce(
                  (acc, cur) =>
                    acc + cur?.sets.reduce((acc, cur) => acc + cur?.time, 0),
                  0,
                ),
              0,
            )
            .toString()}
          notification="Total time you have spent"
        />
        <StaticViewCard
          title="Distance"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce(
                  (acc, cur) =>
                    acc +
                    cur?.sets.reduce((acc, cur) => acc + cur?.distance, 0),
                  0,
                ),
              0,
            )
            .toString()}
          notification="Total Distance you have covered"
        />
        <StaticViewCard
          title="Calories"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce(
                  (acc, cur) =>
                    acc +
                    cur?.sets.reduce((acc, cur) => acc + cur?.calories, 0),
                  0,
                ),
              0,
            )
            .toString()}
          notification="Total Calories you have burned"
        />
        <StaticViewCard
          title="Sets"
          value={sessions
            .reduce(
              (acc, cur) =>
                acc +
                cur?.exercise.reduce((acc, cur) => acc + cur?.sets.length, 0),
              0,
            )
            .toString()}
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

/* {exerciseCounts.map((v, i) => {
      return (
        <Text style={{color: 'white'}} key={i}>
          {getExerciesName(v.id)}: {v.value}
        </Text>
      );
    })} */
