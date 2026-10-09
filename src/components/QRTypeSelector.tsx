import React from 'react';
import type { QRType } from '../types';
import { Link, AlignLeft, Mail, Phone, Wifi } from 'lucide-react';

interface Props {
  selectedType: QRType;
  onSelect: (type: QRType) => void;
}

const types: { id: QRType; label: string; icon: React.ReactNode }[] = [
  { id: 'url',   label: 'URL',   icon: <Link size={14} /> },
  { id: 'text',  label: 'Text',  icon: <AlignLeft size={14} /> },
  { id: 'email', label: 'Email', icon: <Mail size={14} /> },
  { id: 'phone', label: 'Phone', icon: <Phone size={14} /> },
  { id: 'wifi',  label: 'Wi-Fi', icon: <Wifi size={14} /> },
];

export const QRTypeSelector: React.FC<Props> = ({ selectedType, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {types.map((t) => {
        const isActive = selectedType === t.id;
        return (
          <button
            key={t.id}
            type="button"
            id={`type-btn-${t.id}`}
            onClick={() => onSelect(t.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md
              text-xs font-medium tracking-wide border
              transition-colors duration-150 cursor-pointer
              ${isActive
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/25 hover:text-white'
              }
            `}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
};
