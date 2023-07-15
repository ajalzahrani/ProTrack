import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import useUserPreferencesStore from 'src/store/useUserPreferencesStore';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import useUnit from 'src/components/hooks/useUnit';
import {convertHeight, convertWeight} from 'src/utility/unitconversion';

// Store this import is for testing
import {store} from 'src/store/mmkv';
import def from 'src/components/shared/GlobalDefinition';

// Components
import {colors, assets} from 'src/assets';
import {
  PressableButton,
  PressableButtonColor,
  ScreenContainer,
} from 'src/components/shared';
import {useTranslation} from 'react-i18next';
import CardInformationHC from './components/CardInformationHC';
import useBMICas from 'src/components/hooks/useBMI';
import PickerList from 'src/components/shared/PickerList';
import {Picker} from '@react-native-picker/picker';
import {ViewRow} from 'src/components/shared';
import {
  bodyMeasurementsRecordType,
  userBodyMeasurementsType,
  userType,
} from 'src/types';

function generateNums(min: number, max: number, adder: number) {
  const setOfNums: string[] = [];
  for (let i = min; i <= max; i += adder) {
    setOfNums.push(i.toString());
  }
  return setOfNums;
}

// TODO: Categorize Settings
// Account
// Body Measurements
// Notification and Sounds
// Appearence
// Languages
// ProTrack FAQ

// FIXME: Editing email and location with empty the textInput

const SettingsScreen = () => {
  const userPreferences = useUserPreferencesStore(s => s.preferences);
  const setLocation = useUserPreferencesStore(s => s.setLocation);
  const setGender = useUserPreferencesStore(s => s.setGender);
  const setEmail = useUserPreferencesStore(s => s.setEmail);
  const setDOB = useUserPreferencesStore(s => s.setDOB);

  const bodyMeasurements = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setMetric = useUserBodyMeasureStore(s => s.setMetric);
  const setHight = useUserBodyMeasureStore(s => s.setHeight);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  useUnit();

  const {t, i18n} = useTranslation();

  // array with all supported languages
  const languages = [
    {name: 'ar', label: 'Arabic'},
    {name: 'en', label: 'English'},
  ];

  type LanguageButtonPropType = {
    name: string;
    label: string;
  };

  const LanguageButton = ({name, label}: LanguageButtonPropType) => (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => {
        i18n.changeLanguage(name); //changes the app language
        // console.log(i18n.language);
      }}>
      <Text style={styles.textStyle}>
        {t(`common.actions.toggleTo${label}`)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <View style={styles.profileTitleStyle}>
        <View style={styles.container}>
          <Image source={assets.AsianBueaty} style={styles.image} />
          <View style={{marginLeft: 16}}>
            <Text style={styles.userFullName}>John Wick</Text>
            <Text style={styles.username}>@johnWick</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <CardInformationHC
          title="Account Information"
          rows={[
            {
              picker: 'picker',
              header: 'Gender',
              items: ['Male', 'Female'],
              value: userPreferences.gender,
              setValue: setGender,
            },
            {
              picker: 'date',
              header: 'DOB',
              value: userPreferences.dob,
              setValue: setDOB,
            },
            {
              picker: 'text',
              header: 'Email',
              setValue: setEmail,
              value: userPreferences.email,
              message: 'Please enter your email',
            },
            {
              picker: 'text',
              header: 'Location',
              value: userPreferences.location,
              message: 'Please enter your location',
              setValue: setLocation,
            },
          ]}
        />
        <CardInformationHC
          title="Body Measurements"
          rows={[
            {
              picker: 'picker',
              header: 'Height',
              setValue: setHight,
              value: bodyMeasurements.height,
              items:
                bodyMeasurements.metric == 'metric'
                  ? generateNums(120, 220, 1)
                  : generateNums(1, 10, 0.5),
              extra: bodyMeasurements.metric == 'metric' ? 'CM' : 'FT',
            },
            {
              picker: 'picker',
              header: 'Weight',
              items:
                bodyMeasurements.metric == 'metric'
                  ? generateNums(40, 240, 1)
                  : generateNums(88, 529, 1),
              value: bodyMeasurements.weight,
              setValue: setWeight,
              extra: bodyMeasurements.metric == 'metric' ? 'KG' : 'LB',
            },
            {
              picker: 'picker',
              header: 'Unit',
              items: ['metric', 'imperial'],
              value: bodyMeasurements.metric,
              setValue: setMetric,
            },
          ]}
        />

        <View style={styles.centeredView}>
          {languages.map(lang => (
            <LanguageButton {...lang} key={lang.name} />
          ))}
        </View>
        <TouchableOpacity
          style={{padding: 12, backgroundColor: 'gray'}}
          onPress={() => {
            const userMesasurement = store.getString(def.userBodyMeasurements);
            if (userMesasurement != undefined) {
              const um: userBodyMeasurementsType = JSON.parse(userMesasurement);
              um.bmi = '';
              um.height = '168';
              um.weight = '76';
              um.metric = 'metric';
              store.set(def.userBodyMeasurements, JSON.stringify(um));
              console.log('User body measurement cleared.');
            }
          }}>
          <Text>Clear User Measurements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 12, backgroundColor: 'gray'}}
          onPress={() => {
            const userPreferences = store.getString(def.userPreferences);
            console.log(userPreferences);
          }}>
          <Text>Print User Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 12, backgroundColor: 'gray'}}
          onPress={() => {
            const userPreferences = store.getString(def.userPreferences);
            if (userPreferences != undefined) {
              const up: userType = JSON.parse(userPreferences);
              up.dob = '';
              store.set(def.userPreferences, JSON.stringify(up));
              console.log('User Prefrences dob cleared.');
            }
          }}>
          <Text>Clear User Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: colors.offwhite,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {color: 'white'},
  buttonOpen: {},
  profileTitleStyle: {
    marginTop: 10,
    marginLeft: 12,
  },
  cardInformationStyle: {},

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userFullName: {
    color: colors.white,
    fontSize: 24,
  },
  username: {
    color: colors.white,
    fontStyle: 'normal',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
});
