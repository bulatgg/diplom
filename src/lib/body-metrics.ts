export function calculateBmi(weightKg: number, heightCm: number) {
  const heightMeters = heightCm / 100;
  if (!weightKg || !heightMeters) {
    return 0;
  }

  return weightKg / (heightMeters * heightMeters);
}

export function getBmiStatus(bmi: number) {
  if (bmi < 18.5) {
    return 'ниже нормы';
  }

  if (bmi < 25) {
    return 'хороший диапазон';
  }

  if (bmi < 30) {
    return 'выше нормы';
  }

  return 'нужен аккуратный план снижения';
}

export function getWeightDeltaText(currentWeightKg: number, targetWeightKg: number) {
  const delta = targetWeightKg - currentWeightKg;

  if (Math.abs(delta) < 1) {
    return 'Цель почти совпадает с текущим весом. Фокус будет на качестве тела и силе.';
  }

  if (delta > 0) {
    return `Нужно набрать примерно ${delta.toFixed(1)} кг. План сделает акцент на силовых тренировках, объеме и восстановлении.`;
  }

  return `Нужно снизить примерно ${Math.abs(delta).toFixed(1)} кг. План сделает акцент на регулярности, расходе энергии и контроле нагрузки.`;
}
