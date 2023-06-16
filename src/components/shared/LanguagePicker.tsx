import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import {colors} from 'src/assets';

const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {i18n} = useTranslation(); //i18n instance

  // array with all supported languages
  const languages = [
    {name: 'ar', label: 'Arabic'},
    {name: 'en', label: 'English'},
  ];

  const LanguageItem = ({name, label}: {name: string; label: string}) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name); //changes the app language
      }}>
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.centeredView}>
      {languages.map(lang => (
        <LanguageItem {...lang} key={lang.name} />
      ))}
    </View>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
