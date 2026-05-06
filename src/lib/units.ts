export function cmToFeet(heightCm: number) {
  return heightCm / 30.48;
}

export function feetToCm(heightFeet: number) {
  return Math.round(heightFeet * 30.48);
}

export function kgToLb(weightKg: number) {
  return weightKg * 2.2046226218;
}

export function lbToKg(weightLb: number) {
  return Math.round((weightLb / 2.2046226218) * 10) / 10;
}
