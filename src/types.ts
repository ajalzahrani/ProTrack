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
  // customMeasurements?: [{title: string; value: number}];
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

  // workout preferences
  activityLevel?: number; // 1-7 days per week
  activityLevelDescription?: [
    'Basal Metabolic Rate (BMR)',
    'Sedentary: little or no exercise',
    'Light: exercise 1-3 times/week',
    'Moderate: exercise 4-5 times/week',
    'Active: daily exercise or intense exercise 3-4 times/week',
    'Very Active: intense exercise 6-7 times/week',
    'Extra Active: very intense exercise daily, or physical job',
  ];
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
