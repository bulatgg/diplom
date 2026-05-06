import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionCard } from '@/components/onboarding/option-card';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { useOnboarding } from '@/context/onboarding-context';
import { Gender } from '@/types/onboarding';

const options: { value: Gender; title: string; description: string }[] = [
  { value: 'male', title: 'Мужской', description: 'Для расчета нормы веса и тренировочного профиля.' },
  { value: 'female', title: 'Женский', description: 'Для более точной оценки параметров тела.' },
  { value: 'none', title: 'Не указывать', description: 'Можно пропустить, если не хочешь выбирать.' },
];

export default function GenderScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(profile.gender);

  async function continueNext() {
    if (!selectedGender) {
      return;
    }

    await updateProfile({ gender: selectedGender });
    router.push('/onboarding/goal');
  }

  return (
    <OnboardingScreen eyebrow="Шаг 1" title="Укажи пол" subtitle="Пока это влияет только на сохраненный профиль, позже добавим более точные рекомендации.">
      {options.map((option) => (
        <OptionCard
          key={option.value}
          title={option.title}
          description={option.description}
          selected={selectedGender === option.value}
          onPress={() => setSelectedGender(option.value)}
        />
      ))}
      <PrimaryButton label="Продолжить" disabled={!selectedGender} onPress={continueNext} />
    </OnboardingScreen>
  );
}
