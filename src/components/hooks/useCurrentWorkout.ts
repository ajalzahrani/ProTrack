import useRoutineStore from 'src/store/useRoutineStore';
import useCurrentRoutine from './useCurrentRoutine';

const useCurrentWorkout = () => {
  const getCurrentRoutine = useCurrentRoutine();
  const workoutId = useRoutineStore(s => s.stateId.workoutId);

  const getCurrentWorkout = () => {
    const workout = getCurrentRoutine()?.workouts.find(w => w.id === workoutId);

    return workout ? workout : undefined;
  };

  return getCurrentWorkout;
};

export default useCurrentWorkout;
