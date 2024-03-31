import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors, assets} from 'src/assets';
import {CustomModal, ViewRow} from 'src/components/shared';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  title: string;
  notification: string;
  value?: string;
  style?: any;
};

// function StaticViewCard({title, notification, value, style}: Props) {
//   const [notificationModal, setNotificationModal] = useState(false);
//   return (
//     <View style={[styles.cardContainer]}>
//       <CustomModal
//         visible={notificationModal}
//         setVisible={setNotificationModal}
//         message={notification}
//         style={{backgroundColor: colors.secondary}}
//         // buttons={[{text: 'Ok', onPress: () => setNotificationModal(false)}]}
//       >
//         <TouchableOpacity
//           style={{
//             backgroundColor: colors.white,
//             padding: 10,
//             borderRadius: 10,
//           }}
//           onPress={() => {
//             setNotificationModal(false);
//           }}>
//           <Text style={{}}>Ok</Text>
//         </TouchableOpacity>
//       </CustomModal>
//       <ViewRow style={{flexWrap: 'wrap', alignItems: 'center'}}>
//         <Text style={styles.cardTitle}>{title}</Text>
//         <TouchableOpacity
//           style={{marginLeft: 'auto'}}
//           onPress={() => {
//             setNotificationModal(true);
//           }}>
//           <Entypo name="info-with-circle" size={16} color={colors.offwhite} />
//         </TouchableOpacity>
//       </ViewRow>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text style={styles.cardRowValue}>{value}</Text>
//       </View>
//     </View>
//   );
// }
function StaticViewCard({title, notification, value, style}: Props) {
  const [notificationModal, setNotificationModal] = useState(false);
  return (
    <View style={[styles.cardContainer, style]}>
      <CustomModal
        visible={notificationModal}
        setVisible={setNotificationModal}
        message={notification}
        style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setNotificationModal(false);
          }}>
          <Text style={styles.modalButtonText}>Ok</Text>
        </TouchableOpacity>
      </CustomModal>
      <ViewRow style={{flexWrap: 'wrap', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>{title}</Text>
        <TouchableOpacity
          style={{marginLeft: 'auto'}}
          onPress={() => {
            setNotificationModal(true);
          }}>
          <Entypo name="info-with-circle" size={16} color={colors.offwhite} />
        </TouchableOpacity>
      </ViewRow>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={styles.cardRowValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: '30%',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardRowValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },

  modalContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StaticViewCard;

// const styles = StyleSheet.create({
//   cardContainer: {
//     flexBasis: '30%',
//     marginBottom: 20,
//     marginTop: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 20,
//     backgroundColor: colors.offwhite,
//     borderRadius: 10,
//   },
//   cardTitle: {
//     color: colors.white,
//   },
//   cardRowValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.white,
//   },
// });
