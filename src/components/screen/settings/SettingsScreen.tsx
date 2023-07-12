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

function generateNums(N: number) {
  const setOfNums = [...Array(N).keys()].map(i => (i + 1).toString());
  return setOfNums;
}

// TODO: Categorize Settings
// Account
// Body Measurements
// Notification and Sounds
// Appearence
// Languages
// ProTrack FAQ

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
  useBMICas();

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
              value: userPreferences.gender ? userPreferences.gender : 'Male',
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
              value: '',
              message: 'Please enter your email',
            },
            {
              picker: 'text',
              header: 'Location',
              value: '',
              message: 'Please enter your location',
            },
          ]}
        />
        <CardInformationHC
          title="Body Measurements"
          rows={[
            {
              picker: 'picker',
              header: 'Height',
              items: generateNums(200),
              value:
                bodyMeasurements.height +
                (bodyMeasurements.metric == 'metric' ? ' CM' : ' FT'),
              setValue: setHight,
              // isRecord: true,
            },
            {
              picker: 'picker',
              header: 'Weight',
              items: generateNums(250),
              value:
                bodyMeasurements.weight +
                (bodyMeasurements.metric == 'imperial' ? ' LB' : ' KG'),
              setValue: setWeight,
              // isRecord: true,
            },
            {
              picker: 'picker',
              header: 'BMI',
              items: generateNums(50),
              value: bodyMeasurements.bmi,
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
