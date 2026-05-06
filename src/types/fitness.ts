export type TrainingGoal = 'strength' | 'muscle' | 'fatLoss' | 'endurance';
export type TrainingPlace = 'home' | 'gym';
export type AthleteLevel = 'beginner' | 'intermediate' | 'advanced';

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty?: AthleteLevel;
  description?: string;
  place: TrainingPlace | 'both';
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: string;
  intensityPercent?: number;
  restSeconds: number;
};

export type WorkoutTemplate = {
  id: string;
  title: string;
  author: string;
  goal: TrainingGoal;
  place: TrainingPlace;
  level: AthleteLevel;
  daysPerWeek: number;
  description: string;
  isPublic: boolean;
  likes: number;
  exercises: WorkoutExercise[];
};

export type BenchPredictionInput = {
  weight: number;
  reps: number;
  weeks: number;
  level: AthleteLevel;
  adherence: number;
  recovery: number;
};
