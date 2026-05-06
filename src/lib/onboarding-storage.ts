import AsyncStorage from 'expo-sqlite/kv-store';

export const onboardingStorage = {
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  },
  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  },
};
