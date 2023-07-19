import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './CardPickersStyle';
import useUserBodyMeasurementsRecordStore from 'src/store/useUserBodyMeasurementsRecordStore';
import {
  CustomModal,
  ViewRow,
  CustomPicker2,
  CustomPicker,
} from 'src/components/shared';

type CardRowCPType = {
  header: string;
  items: string[];
  value: string;
  setValue: (value: string) => void;
  isRecord: boolean;
  extra?: string;
};
const CardRowCP: React.FC<CardRowCPType> = ({
  header,
  items,
  value,
  setValue,
  isRecord,
  extra,
}) => {
  const bmSession = useUserBodyMeasurementsRecordStore(
    s => s.bodyMeasurementsRecord,
  );
  const setWeightRecord = useUserBodyMeasurementsRecordStore(
    s => s.setWeightRecord,
  );
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [customModalVisable, setCustomModalVisable] = useState(false);
  const [pickedValue, setPickedValue] = useState(value);

  const closeModal = () => {
    setModalVisible(false);
    // setValue(pickedValue);
    // if (isRecord) setCustomModalVisable(true);
  };

  return (
    <>
      <CustomModal
        visible={customModalVisable}
        setVisible={setCustomModalVisable}
        message="Do you want make a record?"
        buttons={[
          {
            text: 'Yes',
            onPress: () => {
              // record value to userBodySession
              console.log('record value to userBodyRecord');
              setWeightRecord(pickedValue);
              setCustomModalVisable(false);
            },
          },
          {
            text: 'No',
            onPress: () => {
              setCustomModalVisable(false);
            },
          },
        ]}
      />
      <CustomPicker
        visible={modalVisible}
        onClose={closeModal}
        selectedItem={value}
        setSelectedItem={setValue}
        items={items}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <ViewRow>
          <Text style={styles.cardRowText}>{t(value)}</Text>
          <Text style={styles.cardRowText}> {extra}</Text>
        </ViewRow>
      </TouchableOpacity>
    </>
  );
};

export default CardRowCP;
