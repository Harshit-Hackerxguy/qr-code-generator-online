import React from 'react';
import type { QRCodeSettings, ErrorCorrectionLevel, QRPreset } from '../types';
import { presets } from '../utils/presets';

interface Props {
  settings: QRCodeSettings;
  onChange: (settings: QRCodeSettings) => void;
  onPresetSelect: (preset: QRPreset) => void;
}

const labelCls = 'block text-xs font-medium text-neutral-400 mb-2 tracking-wide';
const groupCls = 'mb-5';
const selectCls = `
  w-full px-3 py-2 rounded-lg text-sm text-white
  bg-white/[0.04] border border-white/10
  focus:outline-none focus:border-white/30
  transition-colors duration-150 cursor-pointer
`;
const valueCls = 'text-white font-medium tabular-nums';

export const CustomizationPanel: React.FC<Props> = ({ settings, onChange, onPresetSelect }) => {
  return (
    <div>
      {/* Presets */}
      <div className={groupCls}>
        <p className={labelCls}>Presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              id={`preset-btn-${preset.id}`}
              onClick={() => onPresetSelect(preset)}
              className="
                px-3 py-1.5 rounded-md text-xs font-medium
                border border-white/10 text-neutral-400
                hover:border-white/25 hover:text-white
                transition-colors duration-150 cursor-pointer
              "
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className={groupCls}>
        <label className={labelCls}>
          Size — <span className={valueCls}>{settings.size}px</span>
        </label>
        <input
          id="setting-size"
          type="range"
          min="128"
          max="1024"
          step="8"
          value={settings.size}
          className="w-full"
          onChange={(e) => onChange({ ...settings, size: parseInt(e.target.value) })}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-neutral-600">128px</span>
          <span className="text-[10px] text-neutral-600">1024px</span>
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className={labelCls}>Foreground</p>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/10 bg-white/[0.04]">
            <input
              id="setting-fg-color"
              type="color"
              value={settings.fgColor}
              onChange={(e) => onChange({ ...settings, fgColor: e.target.value })}
            />
            <span className="text-xs text-neutral-400 font-mono tracking-wide">{settings.fgColor}</span>
          </div>
        </div>
        <div>
          <p className={labelCls}>Background</p>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/10 bg-white/[0.04]">
            <input
              id="setting-bg-color"
              type="color"
              value={settings.bgColor}
              onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
            />
            <span className="text-xs text-neutral-400 font-mono tracking-wide">{settings.bgColor}</span>
          </div>
        </div>
      </div>

      {/* Error Correction */}
      <div className={groupCls}>
        <label htmlFor="setting-ecl" className={labelCls}>Error Correction</label>
        <select
          id="setting-ecl"
          className={selectCls}
          value={settings.level}
          onChange={(e) => onChange({ ...settings, level: e.target.value as ErrorCorrectionLevel })}
        >
          <option value="L">Low — ~7% recovery</option>
          <option value="M">Medium — ~15% recovery</option>
          <option value="Q">Quartile — ~25% recovery</option>
          <option value="H">High — ~30% recovery</option>
        </select>
      </div>

      {/* Quiet Zone */}
      <div className={groupCls}>
        <label className={labelCls}>
          Quiet Zone — <span className={valueCls}>{settings.margin}</span>
        </label>
        <input
          id="setting-margin"
          type="range"
          min="0"
          max="10"
          step="1"
          value={settings.margin}
          className="w-full"
          onChange={(e) => onChange({ ...settings, margin: parseInt(e.target.value) })}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-neutral-600">0</span>
          <span className="text-[10px] text-neutral-600">10</span>
        </div>
      </div>
    </div>
  );
};
