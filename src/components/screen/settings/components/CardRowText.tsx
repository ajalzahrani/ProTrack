import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ModalInput} from 'src/components/shared';
import styles from './CardPickersStyle';

type CardRowTextType = {
  header: string;
  value: string;
  message: string;
  setValue: (value: string) => void;
};
const CardRowText: React.FC<CardRowTextType> = ({
  header,
  value,
  message,
  setValue,
}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [textValue, setTextValue] = useState(value);

  const onClose = () => {
    setModalVisible(false);
  };

  const handleSetTextValue = (text: string) => {
    setTextValue(text);
    setValue(text);
  };

  return (
    <>
      <ModalInput
        message={message}
        visible={modalVisible}
        setVisible={onClose}
        textValue={textValue}
        setTextValue={handleSetTextValue}
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
