import {create} from 'zustand';
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
        location: '',
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
  setGender: gender =>
    set(state => ({...state, preferences: {...state.preferences, gender}})),
  setEmail: email =>
    set(
      produce((state: Draft<State & Actions>) => {
        console.log('email address: ', email);
        if (email.length > 0 && email != undefined) {
          state.preferences.email = email;
          storeSet(JSON.stringify(state.preferences));
          console.log('email saved');
        }
      }),
    ),
  setLocation: location =>
    set(
      produce((state: Draft<State & Actions>) => {
        console.log('location address: ', location);
        if (location.length > 0 && location != undefined) {
          state.preferences.location = location;
          storeSet(JSON.stringify(state.preferences));
          console.log('location saved');
        }
      }),
    ),
}));

export default useUserPreferencesStore;

const storeSet = (data: string) => {
  store.set(def.userPreferences, data);
};
