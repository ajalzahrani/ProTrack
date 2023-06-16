import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  Alert,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors, assets} from 'src/assets';

// components
import ExerciseSelectRow from './components/ExerciseSelectRow';
import {ScreenContainer} from 'src/components/shared';

// Store
import useExerciseStore from 'src/store/useExerciseMaster';

// Navigation
import {RouteProp} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {exerciseMasterType} from 'src/types';
import {ScrollView} from 'react-native-gesture-handler';

type ExerciseScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'ExerciseScreen'
>;
type ExerciseScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'ExerciseScreen'
>;

type ExerciseScreenProp = {
  route: ExerciseScreenRouteProp;
  navigation: ExerciseScreenNavigationProp;
};

const ExerciseScreen: React.FC<ExerciseScreenProp> = ({route, navigation}) => {
  // FIXME: presis exercise selection when search
  // FIXME: auto select new added exercise
  const exerciseMaster = useExerciseStore(s => s.exerciseMaster);
  const addNewExerciseMaster = useExerciseStore(s => s.addNewExerciseMaster);
  const [search, setSearch] = useState(''); //
  const [searchResult, setSearchResult] = useState(exerciseMaster);
  const [notFound, setNotFound] = useState(false); // handle if no exercise found in search
  const [modalVisible, setModalVisible] = useState(false);

  const handleExercise = route.params.handleExercise;
  const preSelectedExercises = route.params.exercises;

  // search the list of exercises data and eanble the user to add not found exercies.
  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    const filterdExercies = exerciseMaster.filter((exer, index) => {
      // console.log(exer.title.match(searchText));
      return exer.name.match(searchText.toLowerCase());
    });
    if (searchText.length === 0) {
      setSearchResult(filterdExercies);
      setNotFound(false);
    } else if (filterdExercies.length === 0) {
      setNotFound(true);
    } else {
      setSearchResult(filterdExercies);
      setNotFound(false);
    }
  };

  const renderExercise: ListRenderItem<exerciseMasterType> = ({
    item,
  }: ListRenderItemInfo<exerciseMasterType>) => {
    return (
      <View style={styles.preListContainerStyle}>
        <ExerciseSelectRow
          key={item.id}
          exerciseRow={item}
          preSelectedExercises={preSelectedExercises}
          handleExercise={handleExercise}
        />
      </View>
    );
  };

  return (
    <ScreenContainer>
      <Modal
        // animationType="pageSheet"
        presentationStyle="fullScreen"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Which pride</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={handleSearch}
          value={search}
          style={styles.textInputStyle}
        />
        {notFound && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              // opacity: notFound ? 1 : 0,
            }}>
            <Text style={{color: 'white', marginRight: 10}}>
              Not found, Do you want to add
            </Text>
            {/* <Button title="Add" /> */}
            {/* FIXME: after save delete search and show the list again */}
            <TouchableOpacity
              onPress={() => {
                setNotFound(false);
                setSearch('');
                addNewExerciseMaster(search);
                setSearchResult(exerciseMaster);
              }}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          contentContainerStyle={{paddingBottom: 72}}
          data={searchResult}
          renderItem={renderExercise}
          keyExtractor={exercise => exercise.id}
        />
        {/* <ScrollView>
          {searchResult.map(exercise => (
            <View style={styles.preListContainerStyle}>
              <ExerciseSelectRow
                key={exercise.id}
                exerciseRow={exercise}
                preSelectedExercises={preSelectedExercises}
                handleExercise={handleExercise}
              />
            </View>
          ))}
        </ScrollView> */}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {backgroundColor: 'blue'},
  imageSelf: {width: '100%', height: '100%', resizeMode: 'contain'},
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  searchIcons: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  ExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  preListContainerStyle: {
    // flex: 1,
    marginTop: 24,
    backgroundColor: colors.secondaryow,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 80,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
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
    marginTop: 47,
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  tinyLogo: {
    width: 100,
    height: 100,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ExerciseScreen;
