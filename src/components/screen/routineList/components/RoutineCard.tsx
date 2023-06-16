import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {colors, assets} from 'src/assets';
import {useNavigation} from '@react-navigation/native';
import ListCardTitle from 'src/components/shared/ListCardTitle';
import useRoutineStore from 'src/store/useRoutineStore';

import {RoutineListNavigationProp} from '../RoutineListScreen';
import {routineType} from 'src/types';
import CustomModal from 'src/components/shared/CustomModal';

type RoutineCardProps = {
  routine: routineType;
};

const RoutineCard: React.FC<RoutineCardProps> = ({routine}) => {
  const deleteRoutine = useRoutineStore(s => s.deleteRoutine);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<RoutineListNavigationProp>();

  const onClose = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <CustomModal
        visible={modalVisible}
        onClose={onClose}
        message="Are you sure you want to save changes?"
        buttons={[
          {
            text: 'No',
            onPress: () => setModalVisible(false),
            backgroundColor: colors.red,
            textColor: colors.white,
          },
          {
            text: 'Yes',
            onPress: () => {
              setModalVisible(false);
              deleteRoutine(routine.id);
            },
          },
        ]}
      />

      <ListCardTitle title={routine.title}>
        <View style={style.editContainerStyle}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              navigation.navigate('RoutineFormScreen', {routine: routine});
            }}>
            <Image source={assets.icn_plus} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image source={assets.icn_remove} />
          </TouchableOpacity>
        </View>
      </ListCardTitle>
    </>
  );
};

const style = StyleSheet.create({
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default RoutineCard;
