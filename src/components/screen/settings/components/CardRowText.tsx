import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ModalInput} from 'src/components/shared';
import styles from './CardPickersStyle';

type CardRowTextType = {
  header: string;
  text: string;
  message: string;
};
const CardRowText: React.FC<CardRowTextType> = ({header, text, message}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textValue, setTextValue] = React.useState(text);
  const onClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <ModalInput
        message={message}
        visible={modalVisible}
        setVisible={onClose}
        textValue={textValue}
        setTextValue={setTextValue}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{textValue}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardRowText;
