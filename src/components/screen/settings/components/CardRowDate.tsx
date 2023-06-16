import {
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import styles from './CardPickersStyle';

type CardRowDateType = {
  header: string;
  dob: Date;
};
const CardRowDate: React.FC<CardRowDateType> = ({header, dob}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState<Date>(dob);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <DatePicker
          modal
          open={modalVisible}
          date={date}
          onConfirm={date => {
            setModalVisible(false);
            setDate(date);
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
        <Text style={styles.cardRowText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardRowDate;
