import React from 'react';
import type { QRType } from '../types';
import { Link, AlignLeft, Mail, Phone, Wifi } from 'lucide-react';

interface Props {
  selectedType: QRType;
  onSelect: (type: QRType) => void;
}

export const QRTypeSelector: React.FC<Props> = ({ selectedType, onSelect }) => {
  const types: { id: QRType; label: string; icon: React.ReactNode }[] = [
    { id: 'url', label: 'URL', icon: <Link size={20} /> },
    { id: 'text', label: 'Text', icon: <AlignLeft size={20} /> },
    { id: 'email', label: 'Email', icon: <Mail size={20} /> },
    { id: 'phone', label: 'Phone', icon: <Phone size={20} /> },
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={20} /> },
  ];

  return (
    <div className="type-selector">
      {types.map((t) => (
        <button
          key={t.id}
          className={`type-btn ${selectedType === t.id ? 'active' : ''}`}
          onClick={() => onSelect(t.id)}
          type="button"
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};
