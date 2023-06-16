import create from 'zustand';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {userType} from 'src/types';

const getPreferences = (): userType => {
  const preferencesString = store.getString(def.userPreferences);
  return store.contains(def.userPreferences) &&
    typeof preferencesString === 'string'
    ? JSON.parse(preferencesString)
    : {
        id: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        dob: '',
        gender: '',
        email: '',
      };
};

type State = {
  preferences: userType;
};

type Actions = {
  setUsername: (username: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setDOB: (dob: string) => void;
  setMobile: (mobile: string) => void;
  setEmail: (email: string) => void;
  setLocation: (location: string) => void;
  setGender: (gender: string) => void;
};

const initialState: State = {
  preferences: getPreferences(),
};

const useUserPreferencesStore = create<State & Actions>((set, get) => ({
  ...initialState,

  setUsername: username =>
    set(state => ({...state, preferences: {...state.preferences, username}})),
  setFirstName: firstname =>
    set(state => ({...state, preferences: {...state.preferences, firstname}})),
  setLastName: lastname =>
    set(state => ({...state, preferences: {...state.preferences, lastname}})),
  setDOB: dob =>
    set(state => ({...state, preferences: {...state.preferences, dob}})),
  setMobile: mobile =>
    set(state => ({...state, preferences: {...state.preferences, mobile}})),
  setEmail: email =>
    set(state => ({...state, preferences: {...state.preferences, email}})),
  setLocation: location =>
    set(state => ({...state, preferences: {...state.preferences, location}})),
  setGender: gender =>
    set(state => ({...state, preferences: {...state.preferences, gender}})),
}));

export default useUserPreferencesStore;
