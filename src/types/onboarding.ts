export type Gender = 'male' | 'female' | 'none';
export type OnboardingGoal = 'gain_muscle' | 'lose_weight';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type StrengthExercise = 'bench' | 'squat' | 'deadlift';
export type WeekStartDay = 'monday' | 'sunday';
export type TrainingPlacePreference = 'home' | 'gym' | 'outdoor' | 'mixed';
export type UnitSystem = 'metric' | 'imperial';

export type StrengthTest = {
  exercise: StrengthExercise;
  weightKg: number;
  reps: number;
  estimatedOneRepMax: number;
};

export type OnboardingProfile = {
  onboardingCompleted: boolean;
  gender: Gender | null;
  goal: OnboardingGoal | null;
  muscleGroups: string[];
  heightCm: number;
  heightUnit: UnitSystem;
  weightKg: number;
  weightUnit: UnitSystem;
  targetWeightKg: number;
  fitnessLevel: FitnessLevel | null;
  strengthTest: StrengthTest;
  trainingDaysPerWeek: number;
  selectedTrainingDays: string[];
  weekStartDay: WeekStartDay;
  equipment: string[];
  trainingPlace: TrainingPlacePreference | null;
};

export const defaultOnboardingProfile: OnboardingProfile = {
  onboardingCompleted: false,
  gender: null,
  goal: null,
  muscleGroups: [],
  heightCm: 175,
  heightUnit: 'metric',
  weightKg: 75,
  weightUnit: 'metric',
  targetWeightKg: 72,
  fitnessLevel: null,
  strengthTest: {
    exercise: 'bench',
    weightKg: 60,
    reps: 5,
    estimatedOneRepMax: 70,
  },
  trainingDaysPerWeek: 3,
  selectedTrainingDays: ['Пн', 'Ср', 'Пт'],
  weekStartDay: 'monday',
  equipment: [],
  trainingPlace: null,
};
