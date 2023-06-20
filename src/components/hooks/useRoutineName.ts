import useRoutineStore from 'src/store/useRoutineStore';

const useRoutineName = () => {
  const routines = useRoutineStore(s => s.routines);

  const getRoutineName = (routineId: string) => {
    const routine = routines.find(e => e.id === routineId);
    return routine ? routine.title : null;
  };

  return getRoutineName;
};

export default useRoutineName;
