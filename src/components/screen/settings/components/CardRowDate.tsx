import {
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import styles from './CardPickersStyle';

type CardRowDateType = {
  header: string;
  value: string;
  setValue: (value: string) => void;
};
const CardRowDate: React.FC<CardRowDateType> = ({header, value, setValue}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState<Date>(
    value.length === 0 ? new Date() : new Date(value),
  );
  useEffect(() => {
    setValue(date.toLocaleDateString());
  }, [date]);
  useEffect(() => {
    console.log(value);
    console.log(value.length);
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
            // setValue(date.toString());
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
