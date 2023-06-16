import create from 'zustand';
import {produce} from 'immer';
import {store} from './mmkv';
import uuid from 'react-native-uuid';
import {exerciseMasterType} from 'src/types';
import def from 'src/components/shared/GlobalDefinition';

const getExerciseMaster = (): exerciseMasterType[] => {
  const exerciseMaseterString = store.getString(def.exerciseMasterGlobalKey);
  return store.contains(def.exerciseMasterGlobalKey) &&
    typeof exerciseMaseterString === 'string'
    ? JSON.parse(exerciseMaseterString)
    : [];
};

type State = {
  exerciseMaster: exerciseMasterType[];
};

type Actions = {
  addNewExerciseMaster: (name: string) => void;
};

const initialState: State = {
  exerciseMaster: getExerciseMaster(),
};

const useExerciseStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addNewExerciseMaster: name =>
    set(
      produce(draft => {
        const newExercise = {
          id: uuid,
          name: name,
        };
        draft.exercisesMaster.push(newExercise);
        store.set('exercises', JSON.stringify(draft.exercisesMaster));
      }),
    ),
}));

export default useExerciseStore;
