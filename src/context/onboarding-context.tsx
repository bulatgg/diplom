import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { onboardingStorage } from '@/lib/onboarding-storage';
import { defaultOnboardingProfile, OnboardingProfile } from '@/types/onboarding';

const STORAGE_KEY = 'sport-mentor:onboarding-profile';

type OnboardingContextValue = {
  isLoading: boolean;
  profile: OnboardingProfile;
  updateProfile: (patch: Partial<OnboardingProfile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<OnboardingProfile>(defaultOnboardingProfile);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const rawProfile = await onboardingStorage.getItem(STORAGE_KEY);
        if (!rawProfile || !isMounted) {
          return;
        }

        const savedProfile = JSON.parse(rawProfile) as Partial<OnboardingProfile>;
        setProfile({ ...defaultOnboardingProfile, ...savedProfile });
      } catch (error) {
        console.warn('Failed to load onboarding profile', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistProfile = useCallback(async (nextProfile: OnboardingProfile) => {
    setProfile(nextProfile);

    try {
      await onboardingStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch (error) {
      console.warn('Failed to save onboarding profile', error);
    }
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<OnboardingProfile>) => {
      await persistProfile({ ...profile, ...patch });
    },
    [persistProfile, profile],
  );

  const completeOnboarding = useCallback(async () => {
    await persistProfile({ ...profile, onboardingCompleted: true });
  }, [persistProfile, profile]);

  const resetOnboarding = useCallback(async () => {
    await persistProfile(defaultOnboardingProfile);
  }, [persistProfile]);

  const value = useMemo(
    () => ({ isLoading, profile, updateProfile, completeOnboarding, resetOnboarding }),
    [completeOnboarding, isLoading, profile, resetOnboarding, updateProfile],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return context;
}
