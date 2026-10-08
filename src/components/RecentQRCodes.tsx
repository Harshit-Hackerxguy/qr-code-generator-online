import React from 'react';
import type { QRHistoryEntry } from '../types';
import { History, Trash2, CopyPlus } from 'lucide-react';

interface Props {
  history: QRHistoryEntry[];
  onReuse: (entry: QRHistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export const RecentQRCodes: React.FC<Props> = ({ history, onReuse, onDelete, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={20} /> Recent QR Codes
        </h2>
        <button className="btn btn-danger" style={{ padding: '0.5rem', fontSize: '0.875rem' }} onClick={onClear}>
          Clear History
        </button>
      </div>

      <div className="history-list">
        {history.map((entry) => (
          <div key={entry.id} className="history-card">
            <div className="history-info">
              <span className="history-type">{entry.data.type}</span>
              <span className="history-date">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="history-actions">
              <button
                className="btn btn-outline"
                style={{ padding: '0.5rem' }}
                title="Use Again"
                onClick={() => onReuse(entry)}
              >
                <CopyPlus size={16} />
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: '0.5rem', color: 'var(--danger)' }}
                title="Delete"
                onClick={() => onDelete(entry.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
