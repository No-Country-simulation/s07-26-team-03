import React from 'react';

export interface CardTag {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface CardData {
  id: number;
  icon: string;
  title: string;
  value: string;
  valueColorClass: string;
  subtitle: string;
  tag?: CardTag;
}