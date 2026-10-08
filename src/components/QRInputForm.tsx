import React from 'react';
import type { QRCodeData } from '../types';
import type { ValidationErrors } from '../utils/validation';

interface Props {
  data: QRCodeData;
  onChange: (data: QRCodeData) => void;
  errors: ValidationErrors;
}

export const QRInputForm: React.FC<Props> = ({ data, onChange, errors }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, text: e.target.value });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, url: e.target.value });
  };

  const handleEmailChange = (field: string, value: string) => {
    onChange({
      ...data,
      email: { ...data.email, [field]: value } as any,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, phone: e.target.value });
  };

  const handleWifiChange = (field: string, value: any) => {
    onChange({
      ...data,
      wifi: { ...data.wifi, [field]: value } as any,
    });
  };

  return (
    <div className="input-form">
      {data.type === 'url' && (
        <div className="form-group">
          <label>Website URL</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={data.url || ''}
            onChange={handleUrlChange}
          />
          {errors.url && <span className="error-text">{errors.url}</span>}
        </div>
      )}

      {data.type === 'text' && (
        <div className="form-group">
          <label>Plain Text</label>
          <textarea
            placeholder="Enter your message here..."
            value={data.text || ''}
            onChange={handleTextChange}
            rows={4}
          />
          {errors.text && <span className="error-text">{errors.text}</span>}
        </div>
      )}

      {data.type === 'email' && (
        <>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="user@example.com"
              value={data.email?.address || ''}
              onChange={(e) => handleEmailChange('address', e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Subject (Optional)</label>
            <input
              type="text"
              placeholder="Hello"
              value={data.email?.subject || ''}
              onChange={(e) => handleEmailChange('subject', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea
              placeholder="Your message body..."
              value={data.email?.body || ''}
              onChange={(e) => handleEmailChange('body', e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}

      {data.type === 'phone' && (
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="+1234567890"
            value={data.phone || ''}
            onChange={handlePhoneChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      )}

      {data.type === 'wifi' && (
        <>
          <div className="form-group">
            <label>Network Name (SSID)</label>
            <input
              type="text"
              placeholder="My WiFi Network"
              value={data.wifi?.ssid || ''}
              onChange={(e) => handleWifiChange('ssid', e.target.value)}
            />
            {errors.ssid && <span className="error-text">{errors.ssid}</span>}
          </div>
          <div className="form-group">
            <label>Security</label>
            <select
              value={data.wifi?.encryption || 'WPA'}
              onChange={(e) => handleWifiChange('encryption', e.target.value)}
            >
              <option value="WPA">WPA/WPA2/WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open)</option>
            </select>
          </div>
          {data.wifi?.encryption !== 'nopass' && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Network password"
                value={data.wifi?.password || ''}
                onChange={(e) => handleWifiChange('password', e.target.value)}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
          )}
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="hidden-wifi"
              checked={data.wifi?.hidden || false}
              onChange={(e) => handleWifiChange('hidden', e.target.checked)}
            />
            <label htmlFor="hidden-wifi" style={{ margin: 0 }}>Hidden Network</label>
          </div>
        </>
      )}
    </div>
  );
};
