import {create} from 'zustand';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {userBodyMeasurementsType} from 'src/types';

const getUserBodyMeasurements = (): userBodyMeasurementsType => {
  const userBodyMeasurements = store.getString(def.userBodyMeasurements);
  return store.contains(def.userBodyMeasurements) &&
    typeof userBodyMeasurements === 'string'
    ? JSON.parse(userBodyMeasurements)
    : {
        metric: 'metric',
        height: '168',
        weight: '76',
        bmi: '',
        muscleMass: '',
        bodyWater: '',
        boneMass: '',
        visceralFat: '',
        boneDensity: '',
      };
};

type State = {
  bodyMeasurements: userBodyMeasurementsType;
};

type Actions = {
  setMetric: (metric: 'imperial' | 'metric') => void;
  setHeight: (height: string) => void;
  setWeight: (weight: string) => void;
  setBmi: (bmi: string) => void;
  setMuscleMass: (muscleMass: string) => void;
  setBodyWater: (bodyWater: string) => void;
  setBoneMass: (bodyMass: string) => void;
  setVisceralFat: (visceralFat: string) => void;
  setBoneDensity: (boneDensity: string) => void;
};

const initialState: State = {
  bodyMeasurements: getUserBodyMeasurements(),
};

const useUserBodyMeasureStore = create<State & Actions>((set, get) => ({
  ...initialState,

  setMetric: metric =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.bodyMeasurements.metric = metric;
        storeSet(JSON.stringify(state.bodyMeasurements));
        console.log('Metric saved');
      }),
    ),

  setHeight: height =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.bodyMeasurements.height = height;
        storeSet(JSON.stringify(state.bodyMeasurements));
        console.log('height saved');
      }),
    ),

  setWeight: weight =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.bodyMeasurements.weight = weight;
        storeSet(JSON.stringify(state.bodyMeasurements));
        console.log('weight saved');
      }),
    ),

  setBmi: bmi =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.bodyMeasurements.bmi = bmi;
        storeSet(JSON.stringify(state.bodyMeasurements));
        console.log('bmi saved');
      }),
    ),

  setMuscleMass: muscleMass =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, muscleMass},
    })),

  setBodyWater: bodyWater =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, bodyWater},
    })),
  setBoneMass: boneMass =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, boneMass},
    })),
  setVisceralFat: visceralFat =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, visceralFat},
    })),
  setBoneDensity: boneDensity =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, boneDensity},
    })),
}));

export default useUserBodyMeasureStore;

const storeSet = (data: string) => {
  store.set(def.userBodyMeasurements, data);
};
