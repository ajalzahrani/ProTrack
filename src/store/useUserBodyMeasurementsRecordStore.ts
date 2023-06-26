import {create} from 'zustand';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {bodyMeasurementsRecordType} from 'src/types';

// const getUserBodyMeasurements = (): userBodyMeasurementsType => {
//   const userBodyMeasurements = store.getString(def.userBodyMeasurements);
//   return store.contains(def.userBodyMeasurements) &&
//     typeof userBodyMeasurements === 'string'
//     ? JSON.parse(userBodyMeasurements)
//     : {
//         height: '168',
//         weight: '71',
//         registerDate: '',
//       };
// };

type State = {
  bodyMeasurementsRecord: bodyMeasurementsRecordType[];
};

type Actions = {
  setWeight: (weight: string) => void;
};

const initialState: State = {
  bodyMeasurementsRecord: [
    {weight: '71', registerDate: new Date().toISOString()},
  ],
};

const useUserBodyMeasurementsRecordStore = create<State & Actions>(
  (set, get) => ({
    ...initialState,
    setWeight: weight =>
      set(state => ({
        ...state,
        bodyMeasurements: {
          ...state.bodyMeasurementsRecord,
          weight,
          registerDate: new Date().toISOString(),
        },
      })),
  }),
);

export default useUserBodyMeasurementsRecordStore;
