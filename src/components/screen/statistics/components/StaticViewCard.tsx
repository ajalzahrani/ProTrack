import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors, assets} from 'src/assets';
import {CustomModal, ViewRow} from 'src/components/shared';

type Props = {
  title: string;
  notification: string;
  value?: string;
};

function StaticViewCard({title, notification, value}: Props) {
  const [notificationModal, setNotificationModal] = useState(false);
  return (
    <View style={styles.cardContainer}>
      <CustomModal
        visible={notificationModal}
        setVisible={setNotificationModal}
        message={notification}
        style={{backgroundColor: colors.secondary}}
        // buttons={[{text: 'Ok', onPress: () => setNotificationModal(false)}]}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            setNotificationModal(false);
          }}>
          <Text style={{}}>Ok</Text>
        </TouchableOpacity>
      </CustomModal>
      <ViewRow style={{flexWrap: 'wrap', alignItems: 'center'}}>
        <Text style={styles.cardTitle}>{title}</Text>
        <TouchableOpacity
          style={{marginLeft: 'auto'}}
          onPress={() => {
            setNotificationModal(true);
          }}>
          <Image
            source={assets.icn_remove2}
            style={{height: 15, width: 15, marginRight: 10}}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </ViewRow>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.cardRowValue}>{value}</Text>
      </View>
    </View>
  );
}

export default StaticViewCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 20,
    width: 20,
  },
  cardContainer: {
    width: 150,
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: colors.offwhite,
    borderRadius: 20,
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.white,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  cardRowValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  cardRowNotification: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});
