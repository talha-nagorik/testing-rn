import { RetroColors } from '@/constants/theme';

export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '−' : '';
  return `${sign}${absNum.toString().padStart(4, '0')}`;
};

export const getNumberColor = (num: number): string => {
  if (num < 0) return RetroColors.neon.magenta;
  if (num !== 0 && num % 10 === 0) return RetroColors.neon.yellow;
  return RetroColors.neon.cyan;
};

export const getCounterAnimationType = (value: number, previousValue: number) => {
  const isReset = value === 0 && previousValue !== 0;
  const isMultipleOfTen = value !== 0 && value % 10 === 0;
  const isRegular = !isReset && !isMultipleOfTen;
  
  return { isReset, isMultipleOfTen, isRegular };
};
