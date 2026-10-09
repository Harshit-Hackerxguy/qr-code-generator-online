import React from 'react';
import type { QRCodeData } from '../types';
import type { ValidationErrors } from '../utils/validation';

interface Props {
  data: QRCodeData;
  onChange: (data: QRCodeData) => void;
  errors: ValidationErrors;
}

// Shared input / textarea / select class strings
const inputCls = `
  w-full px-3 py-2 rounded-lg text-sm text-white
  bg-white/[0.04] border border-white/10
  placeholder:text-neutral-600
  focus:outline-none focus:border-white/30 focus:bg-white/[0.06]
  transition-colors duration-150
`;

const labelCls = 'block text-xs font-medium text-neutral-400 mb-1.5 tracking-wide';
const groupCls = 'mb-4';
const errorCls = 'block mt-1.5 text-[11px] text-red-400 tracking-wide';

export const QRInputForm: React.FC<Props> = ({ data, onChange, errors }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, text: e.target.value });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, url: e.target.value });

  const handleEmailChange = (field: string, value: string) =>
    onChange({ ...data, email: { ...data.email, [field]: value } as any });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, phone: e.target.value });

  const handleWifiChange = (field: string, value: any) =>
    onChange({ ...data, wifi: { ...data.wifi, [field]: value } as any });

  return (
    <div>
      {/* URL */}
      {data.type === 'url' && (
        <div className={groupCls}>
          <label className={labelCls}>Website URL</label>
          <input
            id="input-url"
            type="url"
            className={inputCls}
            placeholder="https://example.com"
            value={data.url || ''}
            onChange={handleUrlChange}
          />
          {errors.url && <span className={errorCls}>{errors.url}</span>}
        </div>
      )}

      {/* Text */}
      {data.type === 'text' && (
        <div className={groupCls}>
          <label className={labelCls}>Plain Text</label>
          <textarea
            id="input-text"
            className={inputCls}
            placeholder="Enter your message here..."
            value={data.text || ''}
            onChange={handleTextChange}
            rows={4}
          />
          {errors.text && <span className={errorCls}>{errors.text}</span>}
        </div>
      )}

      {/* Email */}
      {data.type === 'email' && (
        <>
          <div className={groupCls}>
            <label className={labelCls}>Email Address</label>
            <input
              id="input-email-address"
              type="email"
              className={inputCls}
              placeholder="user@example.com"
              value={data.email?.address || ''}
              onChange={(e) => handleEmailChange('address', e.target.value)}
            />
            {errors.email && <span className={errorCls}>{errors.email}</span>}
          </div>
          <div className={groupCls}>
            <label className={labelCls}>Subject <span className="text-neutral-600">(optional)</span></label>
            <input
              id="input-email-subject"
              type="text"
              className={inputCls}
              placeholder="Hello"
              value={data.email?.subject || ''}
              onChange={(e) => handleEmailChange('subject', e.target.value)}
            />
          </div>
          <div className={groupCls}>
            <label className={labelCls}>Message <span className="text-neutral-600">(optional)</span></label>
            <textarea
              id="input-email-body"
              className={inputCls}
              placeholder="Your message body..."
              value={data.email?.body || ''}
              onChange={(e) => handleEmailChange('body', e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}

      {/* Phone */}
      {data.type === 'phone' && (
        <div className={groupCls}>
          <label className={labelCls}>Phone Number</label>
          <input
            id="input-phone"
            type="tel"
            className={inputCls}
            placeholder="+1234567890"
            value={data.phone || ''}
            onChange={handlePhoneChange}
          />
          {errors.phone && <span className={errorCls}>{errors.phone}</span>}
        </div>
      )}

      {/* Wi-Fi */}
      {data.type === 'wifi' && (
        <>
          <div className={groupCls}>
            <label className={labelCls}>Network Name (SSID)</label>
            <input
              id="input-wifi-ssid"
              type="text"
              className={inputCls}
              placeholder="My WiFi Network"
              value={data.wifi?.ssid || ''}
              onChange={(e) => handleWifiChange('ssid', e.target.value)}
            />
            {errors.ssid && <span className={errorCls}>{errors.ssid}</span>}
          </div>
          <div className={groupCls}>
            <label className={labelCls}>Security</label>
            <select
              id="input-wifi-encryption"
              className={inputCls}
              value={data.wifi?.encryption || 'WPA'}
              onChange={(e) => handleWifiChange('encryption', e.target.value)}
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open)</option>
            </select>
          </div>
          {data.wifi?.encryption !== 'nopass' && (
            <div className={groupCls}>
              <label className={labelCls}>Password</label>
              <input
                id="input-wifi-password"
                type="password"
                className={inputCls}
                placeholder="Network password"
                value={data.wifi?.password || ''}
                onChange={(e) => handleWifiChange('password', e.target.value)}
              />
              {errors.password && <span className={errorCls}>{errors.password}</span>}
            </div>
          )}
          <div className="flex items-center gap-2.5 mt-1">
            <input
              type="checkbox"
              id="hidden-wifi"
              checked={data.wifi?.hidden || false}
              onChange={(e) => handleWifiChange('hidden', e.target.checked)}
            />
            <label htmlFor="hidden-wifi" className="text-xs text-neutral-400 cursor-pointer select-none">
              Hidden network
            </label>
          </div>
        </>
      )}
    </div>
  );
};
