export const framePerSecond = 16;

export function CalculateAttackSpeed(weaponAttackSpeed: number, speedOption: number) {
  const a = Math.floor(framePerSecond * weaponAttackSpeed);
  const b = 100 / (100 + speedOption);
  return Math.floor(a * b);
}

// 0~600
export function calculateMinAndMax(weaponAttackSpeed: number, frame: number) {
  const a = Math.floor(framePerSecond * weaponAttackSpeed);
  const ok = new Array();
  for (let i = 0; i < 601; i++) {
    const b = 100 / (100 + i);
    if (Math.floor(a * b) === frame) {
      ok.push(i);
    }
  }

  return [Math.min(...ok), Math.max(...ok)];
}

export const DefaultSpeedOption = 20;

export const baseSpeedOptions = [
  '0.75',
  '0.90',
  '1.00',
  '1.10',
  '1.20',
  '1.30',
  '1.40',
  '1.50',
  '1.60',
  '1.70',
  '1.80',
];
