import {create} from 'zustand';
import {store} from './mmkv';
import produce, {Draft} from 'immer';
import {sessionExerciseType, sessionType} from 'src/types';
import uuidv4 from 'src/components/shared/uuid4v';
import moment from 'moment';
import def from 'src/components/shared/GlobalDefinition';

const getSession = (): sessionType[] => {
  const sessionString = store.getString(def.sessionGlobalKey);
  return store.contains(def.sessionGlobalKey) &&
    typeof sessionString === 'string'
    ? JSON.parse(sessionString)
    : [];
};

type State = {
  sessions: sessionType[];
};

type Actions = {
  registerSet: (
    sessionId: string,
    exerciseId: string,
    weight: number,
    reps: number,
    tut: number,
  ) => void;
  registerSession: (
    sessionId: string,
    datetime: string,
    duration: string,
    startTime: string,
    endTime: string,
    workoutId: string,
    exercise?: sessionExerciseType[],
  ) => void;
  getSessionsByDate: (date: string) => sessionType[];
};

const initialState: State = {
  sessions: getSession(),
};

const useSessionStore = create<State & Actions>((set, get) => ({
  ...initialState,

  registerSet: (
    sessionId: string,
    exerciseId: string,
    weight: number,
    reps: number,
    tut: number,
  ) =>
    set(
      produce((state: Draft<State>) => {
        const session = state.sessions.find(s => s.sesisonId === sessionId);
        if (session) {
          const exercise = session.exercise.find(
            e => e.exerciseId === exerciseId,
          );
          if (exercise) {
            exercise.set.push({
              setId: uuidv4(),
              weight,
              reps,
              tut,
            });
          } else {
            session.exercise.push({
              exerciseId,
              set: [{setId: uuidv4(), weight, reps, tut}],
            });
          }
        }
      }),
    ),

  registerSession: (
    sessionId: string,
    datetime: string,
    duration: string,
    startTime: string,
    endTime: string,
    workoutId: string,
    exercise?: sessionExerciseType[],
  ) =>
    set(
      produce((state: Draft<State>) => {
        const sessionIndex = state.sessions.findIndex(
          s => s.sesisonId === sessionId,
        );
        if (sessionIndex !== -1) {
          state.sessions[sessionIndex].datetime = datetime;
          state.sessions[sessionIndex].duration = duration;
          state.sessions[sessionIndex].startTime = startTime;
          state.sessions[sessionIndex].endTime = endTime;
          state.sessions[sessionIndex].workoutId = workoutId;
        } else {
          if (exercise !== undefined) {
            state.sessions.push({
              sesisonId: sessionId,
              datetime: datetime,
              duration: duration,
              startTime: startTime,
              endTime: endTime,
              workoutId: workoutId,
              exercise: exercise,
            });
          }
          store.set(def.sessionGlobalKey, JSON.stringify(state.sessions));
        }
      }),
    ),

  getSessionsByDate: (date: string) => {
    let daySession = [];
    for (let i = 0; i < get().sessions.length; i++) {
      console.log(
        moment(
          get().sessions[i].datetime,
          'ddd MMM DD YYYY HH:mm:ss [GMT]ZZZ',
        ).format('YYYY-MM-DD'),
      );
      console.log(date);
      if (
        moment(get().sessions[i].datetime, 'YYYY-MM-DD').toString() === date
      ) {
        daySession.push(get().sessions[i]);
      }
    }
    return daySession;
  },
}));

export default useSessionStore;
