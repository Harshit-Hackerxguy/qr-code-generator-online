import type { QRCodeData } from '../types';

export const generatePayload = (data: QRCodeData): string => {
  switch (data.type) {
    case 'url':
      return data.url || '';
    case 'text':
      return data.text || '';
    case 'email': {
      if (!data.email?.address) return '';
      const { address, subject, body } = data.email;
      let payload = `mailto:${address}`;
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      if (params.length > 0) {
        payload += `?${params.join('&')}`;
      }
      return payload;
    }
    case 'phone':
      return data.phone ? `tel:${data.phone.replace(/[^0-9+]/g, '')}` : '';
    case 'wifi': {
      if (!data.wifi?.ssid) return '';
      const { ssid, password, encryption, hidden } = data.wifi;
      const escape = (str: string) => str.replace(/([\\;,":])/g, '\\$1');
      let payload = `WIFI:S:${escape(ssid)};T:${encryption};`;
      if (encryption !== 'nopass' && password) {
        payload += `P:${escape(password)};`;
      }
      if (hidden) {
        payload += `H:true;`;
      }
      payload += ';';
      return payload;
    }
    default:
      return '';
  }
};
