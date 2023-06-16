import create from 'zustand';
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
        weight: '71',
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
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, metric},
    })),

  setHeight: height =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, height},
    })),

  setWeight: weight =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, weight},
    })),

  setBmi: bmi =>
    set(state => ({
      ...state,
      bodyMeasurements: {...state.bodyMeasurements, bmi},
    })),

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
