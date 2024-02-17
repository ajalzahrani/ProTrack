import {create} from 'zustand';
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
  addNewExerciseMaster: (name: string) => exerciseMasterType;
  deleteExerciseMaster: (id: string) => void;
};

const initialState: State = {
  exerciseMaster: getExerciseMaster(),
};

const useExerciseStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addNewExerciseMaster: name => {
    const newExercise = {
      id: uuid.v4(),
      name: name,
    };

    set(
      produce(draft => {
        draft.exerciseMaster.push(newExercise);
        store.set(
          def.exerciseMasterGlobalKey,
          JSON.stringify(draft.exerciseMaster),
        );
      }),
    );

    return newExercise;
  },
  deleteExerciseMaster: (id: string) =>
    set(
      produce(draft => {
        draft.exerciseMaster = draft.exerciseMaster.filter(
          exercise => exercise.id !== id,
        );
        store.set(
          def.exerciseMasterGlobalKey,
          JSON.stringify(draft.exerciseMaster),
        );
      }),
    ),
}));

export default useExerciseStore;
