import {
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import styles from './CardPickersStyle';
import moment from 'moment';

type CardRowDateType = {
  header: string;
  value: string;
  setValue: (value: string) => void;
};
const CardRowDate: React.FC<CardRowDateType> = ({header, value, setValue}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<Date>(
    value.length === 0
      ? moment(new Date(), 'yyyy-mm-dd').toDate()
      : moment(new Date(value), 'yyyy-mm-dd').toDate(),
  );
  useEffect(() => {
    console.log('Date to save, at cmp create: ', date.toDateString());
    setValue(date.toDateString());
  }, [date]);

  useEffect(() => {
    console.log(value);
  }, []);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <DatePicker
          modal
          mode="date"
          open={modalVisible}
          date={date}
          onConfirm={date => {
            setModalVisible(false);
            setDate(date);
            // setValue(date.toLocaleDateString());
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{value}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardRowDate;
