import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionCard } from '@/components/onboarding/option-card';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { useOnboarding } from '@/context/onboarding-context';
import { OnboardingGoal } from '@/types/onboarding';

const goals: { value: OnboardingGoal; title: string; description: string }[] = [
  { value: 'gain_muscle', title: 'Накачаться', description: 'Больше силовых тренировок, прогрессия нагрузки и набор массы.' },
  { value: 'lose_weight', title: 'Похудеть', description: 'Больше регулярности, контроля объема и расхода энергии.' },
];

export default function GoalScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState<OnboardingGoal | null>(profile.goal);

  async function continueNext() {
    if (!selectedGoal) {
      return;
    }

    await updateProfile({ goal: selectedGoal });
    router.push('/onboarding/muscles');
  }

  return (
    <OnboardingScreen eyebrow="Шаг 2" title="Какая главная цель?" subtitle="Для MVP оставляем два понятных направления, а позже добавим силу, выносливость и здоровье.">
      {goals.map((goal) => (
        <OptionCard
          key={goal.value}
          title={goal.title}
          description={goal.description}
          selected={selectedGoal === goal.value}
          onPress={() => setSelectedGoal(goal.value)}
        />
      ))}
      <PrimaryButton label="Продолжить" disabled={!selectedGoal} onPress={continueNext} />
    </OnboardingScreen>
  );
}
