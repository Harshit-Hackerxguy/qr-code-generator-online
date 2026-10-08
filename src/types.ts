export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export interface QRCodeData {
  type: QRType;
  url?: string;
  text?: string;
  email?: { address: string; subject: string; body: string };
  phone?: string;
  wifi?: { ssid: string; password?: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden: boolean };
}

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeSettings {
  size: number;
  fgColor: string;
  bgColor: string;
  level: ErrorCorrectionLevel;
  margin: number;
}

export interface QRPreset {
  id: string;
  name: string;
  settings: QRCodeSettings;
}

export interface QRHistoryEntry {
  id: string;
  timestamp: number;
  data: QRCodeData;
  settings: QRCodeSettings;
  presetId?: string;
}
