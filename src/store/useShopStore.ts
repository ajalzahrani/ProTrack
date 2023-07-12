import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {userType} from 'src/types';

type shopType = {
  id: string;
  name: string;
};

const getPreferences = (): shopType => {
  const preferencesString = store.getString(def.shopGKEY);
  return store.contains(def.userPreferences) &&
    typeof preferencesString === 'string'
    ? JSON.parse(preferencesString)
    : {
        id: '',
        name: '',
      };
};

type State = {
  shopItem: shopType;
};

type Actions = {
  setId: (id: string) => void;
  setName: (name: string) => void;
};

const initialState: State = {
  shopItem: getPreferences(),
};

const useShopStore = create<State & Actions>(
  persist(
    set => ({
      ...initialState,

      setId: id =>
        set(state => ({...state, shopItem: {...stat≠e.shopItem, id}})),
      setName: name =>
        set(state => ({...state, shopItem: {...state.shopItem, name}})),
    }),
    {name: 'storge_name', storage: createJSONStorage(() => store)},
  ),
);

export default useShopStore;

const storeSet = (data: string) => {
  store.set(def.userPreferences, data);
};
