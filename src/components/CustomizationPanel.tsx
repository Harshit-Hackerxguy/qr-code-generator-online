import React from 'react';
import type { QRCodeSettings, ErrorCorrectionLevel, QRPreset } from '../types';
import { presets } from '../utils/presets';

interface Props {
  settings: QRCodeSettings;
  onChange: (settings: QRCodeSettings) => void;
  onPresetSelect: (preset: QRPreset) => void;
}

export const CustomizationPanel: React.FC<Props> = ({ settings, onChange, onPresetSelect }) => {
  return (
    <div className="customization-panel">
      <div className="form-group">
        <label>Presets</label>
        <div className="presets-grid">
          {presets.map((preset) => (
            <button
              key={preset.id}
              className="preset-btn"
              onClick={() => onPresetSelect(preset)}
              type="button"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Size: {settings.size}px</label>
        <div className="slider-group">
          <input
            type="range"
            min="128"
            max="1024"
            step="8"
            value={settings.size}
            onChange={(e) => onChange({ ...settings, size: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div className="form-group">
          <label>Foreground Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={settings.fgColor}
              onChange={(e) => onChange({ ...settings, fgColor: e.target.value })}
            />
            <span>{settings.fgColor}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Background Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={settings.bgColor}
              onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
            />
            <span>{settings.bgColor}</span>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Error Correction Level</label>
        <select
          value={settings.level}
          onChange={(e) => onChange({ ...settings, level: e.target.value as ErrorCorrectionLevel })}
        >
          <option value="L">Low (~7% recovery)</option>
          <option value="M">Medium (~15% recovery)</option>
          <option value="Q">Quartile (~25% recovery)</option>
          <option value="H">High (~30% recovery)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quiet Zone (Margin): {settings.margin}</label>
        <div className="slider-group">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={settings.margin}
            onChange={(e) => onChange({ ...settings, margin: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
};
