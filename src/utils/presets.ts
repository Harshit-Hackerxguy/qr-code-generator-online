import type { QRPreset } from '../types';

export const presets: QRPreset[] = [
  {
    id: 'classic',
    name: 'Classic',
    settings: {
      size: 256,
      fgColor: '#000000',
      bgColor: '#ffffff',
      level: 'M',
      margin: 4,
    },
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    settings: {
      size: 256,
      fgColor: '#ffffff',
      bgColor: '#1a1a2e',
      level: 'M',
      margin: 4,
    },
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    settings: {
      size: 200,
      fgColor: '#333333',
      bgColor: '#f4f4f5',
      level: 'L',
      margin: 2,
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    settings: {
      size: 300,
      fgColor: '#003366',
      bgColor: '#e6f2ff',
      level: 'Q',
      margin: 4,
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    settings: {
      size: 300,
      fgColor: '#000000',
      bgColor: '#ffff00',
      level: 'H',
      margin: 6,
    },
  },
];
