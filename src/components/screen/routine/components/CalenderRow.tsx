import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import produce from 'immer';

import {colors} from 'src/assets';

// Store
import {routineType} from 'src/types';
import useRoutineStore from 'src/store/useRoutineStore';

const dayButton = [
  {id: 0, ispicked: false, istoday: false},
  {id: 1, ispicked: false, istoday: false},
  {id: 2, ispicked: false, istoday: false},
  {id: 3, ispicked: false, istoday: false},
  {id: 4, ispicked: false, istoday: false},
  {id: 5, ispicked: false, istoday: false},
  {id: 6, ispicked: false, istoday: false},
];

type CalenderRowProp = {
  routine: routineType;
  setWorkoutId: React.Dispatch<React.SetStateAction<string>>;
  dayId: number;
  setDayId: React.Dispatch<React.SetStateAction<number>>;
};

const CalenderRow: React.FC<CalenderRowProp> = ({
  routine,
  setWorkoutId,
  dayId,
  setDayId,
}) => {
  const [db, setDB] = useState(dayButton);

  const generateWorkdays = () => {
    const array = routine.weekdays?.map(day => {
      return (
        <View
          key={day.id}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            key={day.id}
            onPress={() => {
              setDayId(day.id);
              setWorkoutId(day.workoutId);
              setDB(
                produce(draft => {
                  draft.forEach(day => (day.ispicked = false));
                  draft[day.id].ispicked = true;
                }),
              );
            }}
            style={[
              {
                display: 'flex',
                backgroundColor: day.isWorkday
                  ? colors.secondary
                  : colors.offwhite,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,

                height: db[day.id].ispicked ? 44 : 44,
                width: db[day.id].ispicked ? 65 : 44,
                flexGrow: 0,
              },
              {
                // shadowColor: db[day.id].ispicked ? '#fff' : '#000',
                // shadowOffset: {width: 0, height: 20},
                // shadowOpacity: 0.58,
                // shadowRadius: 16.0,
                // elevation: 24,
              },
            ]}>
            <Text style={style.textSytle}>{day.symbol}</Text>
          </TouchableOpacity>
          <View
            style={
              db[day.id].istoday
                ? {
                    marginTop: 2,
                    padding: 2,
                    backgroundColor: colors.secondary,
                    borderRadius: 20,
                  }
                : {}
            }></View>
        </View>
      );
    });
    return <>{array}</>;
  };

  const handleWhichDay = () => {
    setDB(
      produce(draft => {
        draft.forEach(day => {
          day.ispicked = false;
          day.istoday = false;
        });
        draft[dayId].istoday = true;
        draft[dayId].ispicked = true;
      }),
    );

    // if (routine.weekdays[dayId].workoutId !== '') {
    setWorkoutId(routine.weekdays[dayId].workoutId);
    // }
  };

  useEffect(() => {
    handleWhichDay();
  }, []);

  // TODO: update Calender row after selecting a workout
  // useEffect(() => {
  //   generateWorkdays();
  //   console.log('rerender');
  // }, [routine.weekdays[dayId].workout]);

  return (
    // <View className="flex-row justify-around pt-5 mx-3">
    <View style={style.containerStyle}>{generateWorkdays()}</View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginTop: 26,
    marginHorizontal: 16,
  },
  touchableOpacityStyle: {
    display: 'flex',
    backgroundColor: colors.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 44,
    width: 44,
    order: 6,
    flexGrow: 0,
  },
  textSytle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.black,
  },
});

export default CalenderRow;
