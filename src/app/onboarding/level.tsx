import { useRouter } from 'expo-router';
import React from 'react';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionCard } from '@/components/onboarding/option-card';
import { useOnboarding } from '@/context/onboarding-context';
import { FitnessLevel } from '@/types/onboarding';

const levels: { value: FitnessLevel; title: string; description: string }[] = [
  { value: 'beginner', title: 'Нуб', description: 'Тренировок мало или был большой перерыв.' },
  { value: 'intermediate', title: 'Средний', description: 'Уже есть опыт и базовая техника.' },
  { value: 'advanced', title: 'Про', description: 'Тренируешься стабильно и понимаешь рабочие веса.' },
];

export default function LevelScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();

  async function selectLevel(fitnessLevel: FitnessLevel) {
    await updateProfile({ fitnessLevel });
    router.push('/onboarding/strength-test');
  }

  return (
    <OnboardingScreen eyebrow="Шаг 7" title="В какой ты форме?" subtitle="Уровень будет влиять на прогноз и осторожность нагрузки.">
      {levels.map((level) => (
        <OptionCard
          key={level.value}
          title={level.title}
          description={level.description}
          selected={profile.fitnessLevel === level.value}
          onPress={() => selectLevel(level.value)}
        />
      ))}
    </OnboardingScreen>
  );
}
