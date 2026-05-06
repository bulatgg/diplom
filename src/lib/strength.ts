import { AthleteLevel, BenchPredictionInput } from '@/types/fitness';

const levelGrowthRate: Record<AthleteLevel, number> = {
  beginner: 0.018,
  intermediate: 0.01,
  advanced: 0.005,
};

export function calculateEpleyOneRepMax(weight: number, reps: number) {
  return weight * (1 + reps / 30);
}

export function calculateBrzyckiOneRepMax(weight: number, reps: number) {
  return weight * (36 / (37 - reps));
}

export function estimateOneRepMax(weight: number, reps: number) {
  if (reps <= 1) {
    return weight;
  }

  const safeReps = Math.min(reps, 12);
  const epley = calculateEpleyOneRepMax(weight, safeReps);
  const brzycki = calculateBrzyckiOneRepMax(weight, safeReps);

  return (epley + brzycki) / 2;
}

export function predictBenchPress(input: BenchPredictionInput) {
  const currentOneRepMax = estimateOneRepMax(input.weight, input.reps);
  const growthRate = levelGrowthRate[input.level];
  const progressMultiplier = 1 + growthRate * input.weeks * input.adherence * input.recovery;
  const predictedOneRepMax = currentOneRepMax * progressMultiplier;

  return {
    currentOneRepMax,
    predictedOneRepMax,
    optimisticOneRepMax: predictedOneRepMax * 1.025,
    conservativeOneRepMax: Math.max(currentOneRepMax, predictedOneRepMax * 0.975),
  };
}

export function getTrainingWeight(oneRepMax: number, intensityPercent: number) {
  return Math.round((oneRepMax * intensityPercent) / 100 / 2.5) * 2.5;
}
