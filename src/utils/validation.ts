import type { QRCodeData } from '../types';

export interface ValidationErrors {
  [key: string]: string;
}

export const validateData = (data: QRCodeData): ValidationErrors => {
  const errors: ValidationErrors = {};

  switch (data.type) {
    case 'url':
      if (!data.url) {
        errors.url = 'URL is required';
      } else {
        try {
          new URL(data.url);
        } catch (e) {
          errors.url = 'Must be a valid URL (e.g. https://example.com)';
        }
      }
      break;
    case 'text':
      if (!data.text || data.text.trim() === '') {
        errors.text = 'Text is required';
      }
      break;
    case 'email':
      if (!data.email?.address) {
        errors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.address)) {
        errors.email = 'Must be a valid email address';
      }
      break;
    case 'phone':
      if (!data.phone || data.phone.trim() === '') {
        errors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-]{3,}$/.test(data.phone)) {
         errors.phone = 'Must be a valid phone number';
      }
      break;
    case 'wifi':
      if (!data.wifi?.ssid) {
        errors.ssid = 'Network name (SSID) is required';
      }
      if (data.wifi?.encryption !== 'nopass' && !data.wifi?.password) {
        errors.password = 'Password is required for secured networks';
      }
      break;
  }

  return errors;
};
