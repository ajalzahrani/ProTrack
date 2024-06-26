import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// Assets
import {colors} from 'src/assets';

// Components
import useExerciseName from 'src/components/hooks/useExerciseName';
import useRoutineName from 'src/components/hooks/useRoutineName';

import moment from 'moment';

import {sessionType} from 'src/types';
import Divider from 'src/components/shared/Divider';
type SessionReportProp = {
  session: sessionType;
};

const SessionReport: React.FC<SessionReportProp> = ({session}) => {
  const getExerciseName = useExerciseName();
  const getRoutineName = useRoutineName();

  return (
    <View>
      <Text style={{fontSize: 30, color: colors.white}}>
        {moment(session.datetime).format('DD MMM YYYY h:mm a')}
      </Text>
      <Text style={style.generalFontSize}>
        {session.startTime
          ? !isNaN(parseInt(session.startTime)) &&
            moment
              .unix(parseInt(session.startTime) / 1000)
              .format('h:mm a')
              .toString()
          : null}
        {' - '}
        {session.endTime
          ? !isNaN(parseInt(session.endTime)) &&
            moment
              .unix(parseInt(session.endTime) / 1000)
              .format('h:mm a')
              .toString()
          : null}
      </Text>
      <Divider />
      <Text style={style.generalFontSize}>Total Time</Text>
      <Text style={{color: colors.yellow, fontSize: 35, fontWeight: 'bold'}}>
        {session.duration}
      </Text>
      <Divider />
      <Text style={[style.generalFontSize, , {fontWeight: 'bold'}]}>
        Routine: {session.routineId ? getRoutineName(session.routineId) : null}
      </Text>
      {session.exercise.map((exercise, i) => {
        return (
          <View key={i}>
            <Divider />
            <Text style={[style.generalFontSize]}>
              {getExerciseName(exercise.exerciseId)}
            </Text>
            <Text style={style.generalFontSize}>
              {exercise.set.length} {exercise.set.length > 1 ? 'Sets' : 'Set'}
            </Text>
            {exercise.set.map((s, i) => {
              return (
                <Text key={i} style={{color: 'white'}}>
                  {} {s.reps} {s.reps > 1 ? 'Reps' : 'Rep'} | {s.weight} KG |{' '}
                  {s.tut} TUT
                </Text>
              );
            })}
            {/* {i !== session.exercise.length - 1 ? <Divider /> : null} */}
          </View>
        );
      })}
    </View>
  );
};

export default SessionReport;

const style = StyleSheet.create({
  // ScrollViewStyle: {
  //   padding: 20,
  // },
  headerStyle: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#1a2421',
  },
  headerTextStyle: {
    fontSize: 35,
    color: colors.white,
  },
  generalFontSize: {
    fontSize: 20,
    color: colors.white,
  },
  doneButtonStyle: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
