import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    showDatepicker();
  }, []);

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      display={'default'}
      mode={mode}
      is24Hour={true}
      onChange={onChange}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
    />
  );
};

export default DateTimePickers;

const styles = StyleSheet.create({});
