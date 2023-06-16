import {View, Text, StyleSheet, TextInput, ActionSheetIOS} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors} from 'src/assets';

// Components
import uuidv4 from 'src/components/shared/uuid4v';
import {PressableButton} from 'src/components/shared';
import Calendars2 from './components/Calendars2';
import useRoutineStore from 'src/store/useRoutineStore';

// Navigation
import {RouteProp} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RoutineFormScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'RoutineFormScreen'
>;
type RoutineFormScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'RoutineFormScreen'
>;

type RoutineFormScreenProp = {
  route: RoutineFormScreenRouteProp;
  navigation: RoutineFormScreenNavigationProp;
};

const RoutineFormScreen: React.FC<RoutineFormScreenProp> = ({
  route,
  navigation,
}) => {
  const routine = route.params?.routine;
  const addNewRoutine = useRoutineStore(s => s.addNewRoutine);

  const [title, setTitle] = useState(routine.title);
  const [startDate, setStartDate] = useState(routine.startDate);
  const [endDate, setEndDate] = useState(routine.endDate);
  const [levelIndex, setLevelIndex] = useState(1);
  const [description, setDescription] = useState(routine.description);
  const [result, setResult] = useState('Beginner');
  const [destructiveButtonIndex, setDestructiveButtonIndex] = useState(1);

  const restForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setLevelIndex(0);
  };

  const handleOnPress = () => {
    if (routine !== undefined) {
      addNewRoutine(routine?.id, {
        id: uuidv4(),
        title: title,
        startDate: startDate,
        endDate: endDate,
        level: levelIndex,
        description: description,
        workouts: routine.workouts,
        weekdays: routine.weekdays,
      });
      navigation.goBack();
    } else {
      console.log('Type in routine title');
    }
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Beginner', 'Intermediate', 'Professional'],
        destructiveButtonIndex: destructiveButtonIndex,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult('Beginner');
          setDestructiveButtonIndex(1);
        } else if (buttonIndex === 2) {
          setResult('Intermediate');
          setDestructiveButtonIndex(2);
        } else if (buttonIndex === 3) {
          setResult('Professional');
          setDestructiveButtonIndex(3);
        }
      },
    );

  return (
    <View style={style.centeredView}>
      <Text style={style.modalText}>Configure new routine</Text>
      <TextInput
        placeholder="Routine title"
        placeholderTextColor={colors.offwhite}
        onChangeText={inpuText => setTitle(inpuText)}
        style={style.textInputStyle}
        defaultValue={title}
      />
      <Calendars2
        startDay={startDate}
        setStartDay={setStartDate}
        endDay={endDate}
        setEndDay={setEndDate}
      />

      <PressableButton title={`${result} Level`} onPress={onPress} />

      <TextInput
        style={[style.textInputStyle, style.richBox]}
        placeholder="Description"
        placeholderTextColor={colors.offwhite}
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <PressableButton onPress={handleOnPress} title="Okey" />
    </View>
  );
};

export default RoutineFormScreen;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
    // alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 20,
    textAlign: 'center',
    // fontSize: 24,
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
  },
  selectText: {
    color: colors.white,
  },
  textInputStyle: {
    backgroundColor: colors.offwhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 100,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  richBox: {
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
