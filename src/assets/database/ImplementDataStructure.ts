import {store} from '../../store/Store';
import routines from './routines';
import exerciseMaster from './exerciseMaster';
import def from 'src/components/shared/GlobalDefinition';

export function ImplementDataStructure() {
  // store.delete('routines');
  // store.delete('exercises');
  // store.clearAll();

  if (!store.contains(def.exerciseMasterGlobalKey)) {
    store.set('exercises', JSON.stringify(exerciseMaster));
    console.log('✅ Exercises data implemented successfully');
  }

  if (!store.contains(def.routineGlobalKey)) {
    store.set('routines', JSON.stringify(routines));
    console.log('✅ Workouts data implemented successfully ');
  }
  // if (!store.contains(def.sessionGlobalKey)) {
  //   store.set('exercises', JSON.stringify(exerciseMaster));
  //   console.log('✅ Session data implemented successfully');
  // }

  // if (!store.contains(def.userPreferences)) {
  //   store.set('routines', JSON.stringify(routines));
  //   console.log('✅ User preferences data implemented successfully ');
  // }
  // if (!store.contains(def.userBodyMeasurements)) {
  //   store.set('exercises', JSON.stringify(exerciseMaster));
  //   console.log('✅ User body measurements data implemented successfully');
  // }

  // if (!store.contains(def.shopGKEY)) {
  //   store.set('routines', JSON.stringify(routines));
  //   console.log('✅ ShopGKEY data implemented successfully ');
  // }
}
