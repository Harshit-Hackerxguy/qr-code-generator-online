import type { QRCodeSettings } from '../types';

// Convert hex to RGB
const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Calculate luminance
const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Calculate contrast ratio
export const getContrastRatio = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export interface ReliabilityWarning {
  type: 'contrast' | 'margin' | 'size';
  message: string;
}

export const checkReliability = (settings: QRCodeSettings): ReliabilityWarning[] => {
  const warnings: ReliabilityWarning[] = [];

  const contrastRatio = getContrastRatio(settings.fgColor, settings.bgColor);
  // WCAG standard is 4.5:1 for normal text, for QR codes higher is better.
  if (contrastRatio < 3.0) {
    warnings.push({
      type: 'contrast',
      message: 'Low contrast may make this QR code difficult to scan.',
    });
  }

  if (settings.margin < 2) {
    warnings.push({
      type: 'margin',
      message: 'A small quiet zone (margin) may reduce scanning reliability.',
    });
  }

  if (settings.size < 150) {
    warnings.push({
      type: 'size',
      message: 'Small QR codes may be difficult for some devices to scan.',
    });
  }

  return warnings;
};
