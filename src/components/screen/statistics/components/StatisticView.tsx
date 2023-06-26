import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import useSessionStore from 'src/store/useSessionStore';
import useExerciseName from 'src/components/hooks/useExerciseName';

type exerciseCounterArrayType = {
  id: string;
  value: number;
};
const StatisticView = () => {
  const sessions = useSessionStore(state => state.sessions);
  const getExerciesName = useExerciseName();

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
    <View style={{padding: 20}}>
      <Text style={{color: 'white'}}>Sessions: {sessions.length}</Text>
      <Text style={{color: 'white'}}>
        Exercies: {sessions.reduce((acc, cur) => acc + cur?.exercise.length, 0)}
      </Text>
      {exerciseCounts.map((v, i) => {
        return (
          <Text style={{color: 'white'}} key={i}>
            {getExerciesName(v.id)}: {v.value}
          </Text>
        );
      })}
      <Text style={{color: 'white', fontWeight: '600'}}>
        {'\n'}
        {'\n'}
        {'\n'}
        Statisctic View
        {'\n'}
      </Text>
      <Text style={{color: 'white', fontWeight: '200'}}>
        Show body measurements according to BMI scintific studies
      </Text>
    </View>
  );
};

export default StatisticView;
