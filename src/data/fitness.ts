import { Exercise, WorkoutTemplate } from '@/types/fitness';

export const exercises: Exercise[] = [
  {
    id: 'bench-press',
    name: 'Жим лежа',
    muscleGroup: 'Грудь',
    equipment: 'Штанга',
    difficulty: 'intermediate',
    description: 'Базовое упражнение для груди, передних дельт и трицепса.',
    place: 'gym',
  },
  {
    id: 'squat',
    name: 'Присед со штангой',
    muscleGroup: 'Ноги',
    equipment: 'Штанга',
    difficulty: 'intermediate',
    description: 'Базовое упражнение для ног, ягодиц и корпуса.',
    place: 'gym',
  },
  {
    id: 'deadlift',
    name: 'Становая тяга',
    muscleGroup: 'Спина',
    equipment: 'Штанга',
    difficulty: 'advanced',
    description: 'Силовое упражнение для задней цепи, спины, ног и хвата.',
    place: 'gym',
  },
];

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: 'bench-2-week-base',
    title: 'Жимовой старт на 2 недели',
    author: 'System Coach',
    goal: 'strength',
    place: 'gym',
    level: 'beginner',
    daysPerWeek: 3,
    description: 'Базовый силовой микроцикл: техника, объем и один тяжелый день в неделю.',
    isPublic: true,
    likes: 42,
    exercises: [
      { exerciseId: 'bench-press', sets: 5, reps: '5', intensityPercent: 72, restSeconds: 150 },
      { exerciseId: 'squat', sets: 4, reps: '6', intensityPercent: 70, restSeconds: 150 },
      { exerciseId: 'deadlift', sets: 3, reps: '5', intensityPercent: 75, restSeconds: 180 },
    ],
  },
  {
    id: 'home-upper-base',
    title: 'Домашний верх без железа',
    author: 'System Coach',
    goal: 'endurance',
    place: 'home',
    level: 'beginner',
    daysPerWeek: 2,
    description: 'Легкий домашний план для привычки к тренировкам и контроля техники.',
    isPublic: true,
    likes: 18,
    exercises: [
      { exerciseId: 'push-ups', sets: 4, reps: '8-15', restSeconds: 75 },
      { exerciseId: 'squat', sets: 4, reps: '10', restSeconds: 90 },
    ],
  },
];
