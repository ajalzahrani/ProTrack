import useRoutineStore from 'src/store/useRoutineStore';

const useCurrentRoutine = () => {
  const routines = useRoutineStore(s => s.routines);
  const routineId = useRoutineStore(s => s.stateId.routineId);

  const getCurrentRoutine = () => {
    const routine = routines.find(r => r.id === routineId);
    return routine;
  };

  return getCurrentRoutine;
};

export default useCurrentRoutine;
