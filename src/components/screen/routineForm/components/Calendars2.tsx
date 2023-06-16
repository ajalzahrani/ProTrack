import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {Calendar, CalendarList, WeekCalendar} from 'react-native-calendars';
import {colors} from 'src/assets';
import moment from 'moment';

const Calendars2 = ({startDay, setStartDay, endDay, setEndDay}) => {
  // FIXME: handle user select only start day
  // FIXME: handle user not selecting any date
  const [markedDate, setMarkedDate] = useState({});
  const [isStartDaySet, setIsStartSet] = useState(false);

  useEffect(() => {
    markSelectedDates();
  }, []);

  useEffect(() => {
    markSelectedDates();
  }, [startDay, endDay]);

  const handleDayPress = dayString => {
    if (!isStartDaySet) {
      if (dayString == startDay) {
        setStartDay(undefined);
        setEndDay(undefined);
        return;
      }
      setStartDay(dayString);
      setEndDay(undefined);
      setIsStartSet(true);
    } else {
      setEndDay(dayString);
      setIsStartSet(false);
    }
  };

  const markSelectedDates = () => {
    let marked = {};
    let duration = [];

    if (startDay !== undefined && endDay !== undefined) {
      duration = getDaysArray(startDay, endDay);
      duration?.forEach(item => {
        marked[moment(item).format('YYYY-MM-DD')] = {
          selected: true,
          selectedColor: colors.red,
        };
      });
      setMarkedDate(marked);
    } else {
      let marked = {};
      marked[startDay] = {
        selected: true,
        selectedColor: colors.red,
      };
      setMarkedDate(marked);
    }
  };

  const getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        {startDay && (
          <>
            <Text style={{color: 'white', fontSize: 16}}>Start Date: </Text>
            <Text style={{color: 'yellow', fontSize: 16, fontWeight: '600'}}>
              {moment(startDay).format('YYYY-MM-DD')}
            </Text>
          </>
        )}
        {endDay && (
          <View
            style={{
              marginLeft: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>End Date: </Text>
            <Text
              style={{
                color: 'yellow',
                marginLeft: 'auto',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {moment(endDay).format('YYYY-MM-DD')}
            </Text>
          </View>
        )}
      </View>
      <Calendar
        // onDayPress={day => console.log(day)}
        // disableArrowLeft={true}
        // disableArrowRight={true}
        // hideArrows={true}
        // initialDate="2022-11-09"
        // showWeekNumbers={true}
        // firstDay={1}
        // minDate="2022-11-01"
        // maxDate="2022-11-12"
        markedDates={markedDate}
        enableSwipeMonths={true}
        onDayPress={day => {
          // setStartDay(day.dateString);
          // setSelectedDate(day.dateString);
          handleDayPress(day.dateString);
        }}
        style={{
          borderRadius: 10,
          marginVertical: 1,
          backgroundColor: colors.primary,
          // elevation: 5,
          // borderWidth: 4,
          // borderColor: 'rgba(100, 100, 100, 0.2)',
        }}
        theme={{
          calendarBackground: colors.primary,
          dayTextColor: colors.white,
          textDisabledColor: colors.red,
          monthTextColor: colors.white,
          weekVerticalMargin: 0,
        }}
      />
    </>
  );
};

export default Calendars2;
