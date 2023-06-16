import {StyleSheet, Text, View, Modal, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {colors, assets} from 'src/assets';
import {exerciseMasterType} from 'src/types';

type CardExerciseDetailsType = {
  exercise: exerciseMasterType;
};

const CardExerciseDetails = ({exercise}: CardExerciseDetailsType) => {
  const {t} = useTranslation();
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <Text style={{color: 'white'}}>
      TODO: not implimented CardExerciseDetails component
    </Text>
  );

  // return (
  //   <>
  //     <View className="px-5 py-4 placeholder-sky-300 rounded-lg">
  //       <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
  //         <Text className="text-white text-sm font-medium">
  //           {t('exercise.bodyPart')}
  //         </Text>
  //         <Text className="text-white text-base font-normal">
  //           {exercise.bodyPart}
  //         </Text>
  //       </View>

  //       <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
  //         <Text className="text-white text-sm font-medium">
  //           {t('exercise.equipment')}
  //         </Text>
  //         <Text className="text-white text-base font-normal">
  //           {exercise.equipment}
  //         </Text>
  //       </View>

  //       <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
  //         <Text className="text-white text-sm font-medium">
  //           {t('exercise.target')}
  //         </Text>
  //         <Text className="text-white text-base font-normal">
  //           {exercise.target}
  //         </Text>
  //       </View>

  //       {/* <View style={styles.imageContainer}>
  //         <Image
  //           source={assets.abs}
  //           style={styles.imageSelf}
  //           resizeMode="contain"
  //         />
  //       </View> */}
  //     </View>
  //   </>
  // );
};

export default CardExerciseDetails;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  imageSelf: {
    width: 300,
    height: 300,
  },
});
