export type sessionExerciseType = {
  exerciseId: string;
  set: {
    setId: string;
    weight: number;
    reps: number;
    tut: number;
  }[];
};

export type sessionType = {
  sesisonId: string;
  datetime: string;
  duration: string;
  startTime: string;
  endTime: string;
  workoutId: string;
  routineId?: string;
  exercise: sessionExerciseType[];
};

export type userBodyMeasurementsType = {
  metric: 'imperial' | 'metric';
  height: string;
  weight: string;
  bmi: string;
  muscleMass: string;
  bodyWater: string;
  boneMass: string;
  visceralFat: string;
  boneDensity: string;
  registerDate: string;
};

export type bodyMeasurementsRecordType = {
  weightRecord: string;
  registerDate: string;
};

export type userType = {
  // user identity
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;

  // user social
  mobile?: string;
  email: string;
  location?: string;
};
export type exerciseMasterType = {
  id: string;
  name: string;
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  target?: string;
};

export type weekdaysType = {
  id: number;
  symbol: string;
  workoutId: string;
  isWorkday: boolean;
};

export type exercisesType = {
  id: string;
  freq: number[];
};

export type workoutType = {
  id: string;
  title: string;
  exercises: exercisesType[];
  resttime: number[];
};

export type routineType = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  level: number;
  description: string;
  workouts: workoutType[];
  weekdays: weekdaysType[];
};
