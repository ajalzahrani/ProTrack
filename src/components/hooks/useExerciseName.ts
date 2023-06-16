import useExerciseStore from 'src/store/useExerciseMaster';

const useExerciseName = () => {
  const exerciseMaster = useExerciseStore(s => s.exerciseMaster);

  const getExerciseName = (exerciseId: string) => {
    const exercise = exerciseMaster.find(e => e.id === exerciseId);
    return exercise ? exercise.name : null;
  };

  return getExerciseName;
};

export default useExerciseName;
