import React, { ReactNode } from 'react';
import type { ColorType, Size, Weight } from '@rms/forge-utils';

import styles from './Text.module.scss';

type TextProp = {
  size: Size;
  weight?: Weight;
  color?: ColorType;
  className?: string;
  children: ReactNode;
};

export const Text = ({ size, color = 'white', weight, className, children }: TextProp) => {
  const colorClass = styles[`color_${color}`]; // e.g. styles.size_h1
  const sizeClass = styles[`size_${size}`]; // e.g. styles.color_primary
  const weightClass = styles[`weight_${weight}`];
  return (
    <span className={`${colorClass} ${sizeClass} ${weightClass} ${className}`}>{children}</span>
  );
};
