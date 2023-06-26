import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './CardPickersStyle';
import CustomPicker2 from 'src/components/shared/CustomPicker2';
import useUserBodyMeasureSessionStore from 'src/store/useUserBodyMeasurementsRecordStore';
import {CustomModal} from 'src/components/shared';

type CardRowCPType = {
  header: string;
  items: string[];
  value: string;
  setValue: (value: string) => void;
};
const CardRowCP: React.FC<CardRowCPType> = ({
  header,
  items,
  value,
  setValue,
}) => {
  const bmSession = useUserBodyMeasureSessionStore(
    s => s.bodyMeasurementsSession,
  );
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [customModalVisable, setCustomModalVisable] = React.useState(false);
  const [pickedValue, setPickedValue] = React.useState(value);

  const closeModal = () => {
    setModalVisible(false);
    setValue(pickedValue);
    console.log('askUserModal');
    askUserModal();
  };

  const askUserModal = () => {
    console.log('Inside askUserModal');

    setCustomModalVisable(true);
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
      <CustomPicker2
        visible={modalVisible}
        onClose={closeModal}
        selectedItem={pickedValue}
        setSelectedItem={setPickedValue}
        items={items}></CustomPicker2>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{t(value)}</Text>
        {/* <Text style={styles.cardRowText}>{t('cm')}</Text> */}
      </TouchableOpacity>
    </>
  );
};

export default CardRowCP;
