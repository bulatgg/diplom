import { useRouter } from 'expo-router';
import React from 'react';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionCard } from '@/components/onboarding/option-card';
import { useOnboarding } from '@/context/onboarding-context';
import { TrainingPlacePreference } from '@/types/onboarding';

const places: { value: TrainingPlacePreference; title: string; description: string }[] = [
  { value: 'gym', title: 'Спортзал', description: 'Штанги, тренажеры, гантели и больше вариантов прогрессии.' },
  { value: 'home', title: 'Дом', description: 'План без сложного оборудования, упор на регулярность.' },
  { value: 'outdoor', title: 'Улица', description: 'Турники, брусья, бег и функциональные тренировки.' },
  { value: 'mixed', title: 'Смешанный формат', description: 'Комбинируем дом, зал и улицу.' },
];

export default function PlaceScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useOnboarding();

  async function selectPlace(trainingPlace: TrainingPlacePreference) {
    await updateProfile({ trainingPlace });
    router.push('/onboarding/generating');
  }

  return (
    <OnboardingScreen eyebrow="Шаг 11" title="Где будешь тренироваться?" subtitle="От места зависит набор упражнений и доступное оборудование.">
      {places.map((place) => (
        <OptionCard
          key={place.value}
          title={place.title}
          description={place.description}
          selected={profile.trainingPlace === place.value}
          onPress={() => selectPlace(place.value)}
        />
      ))}
    </OnboardingScreen>
  );
}
