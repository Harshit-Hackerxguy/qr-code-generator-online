import type { QRHistoryEntry, QRCodeData, QRCodeSettings } from '../types';

const STORAGE_KEY = 'qr-generator-history';
const MAX_HISTORY = 20;

export const getHistory = (): QRHistoryEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse QR history', e);
    return [];
  }
};

export const saveToHistory = (
  data: QRCodeData,
  settings: QRCodeSettings,
  presetId?: string
) => {
  try {
    const history = getHistory();
    const newEntry: QRHistoryEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      timestamp: Date.now(),
      data,
      settings,
      presetId,
    };
    const newHistory = [newEntry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error('Failed to save to history', e);
    return getHistory();
  }
};

export const deleteFromHistory = (id: string) => {
  try {
    const history = getHistory();
    const newHistory = history.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error('Failed to delete from history', e);
    return getHistory();
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
};
