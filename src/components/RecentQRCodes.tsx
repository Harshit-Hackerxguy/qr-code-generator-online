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
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History size={13} className="text-neutral-500" />
          <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
            Recent
          </p>
        </div>
        <button
          id="clear-history-btn"
          type="button"
          onClick={onClear}
          className="
            text-[11px] text-neutral-500 hover:text-red-400
            transition-colors duration-150 cursor-pointer
          "
        >
          Clear all
        </button>
      </div>

      {/* History list */}
      <div className="flex flex-col gap-2">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="
              flex items-center justify-between
              px-3 py-2.5 rounded-lg
              border border-white/[0.06] bg-white/[0.02]
              hover:bg-white/[0.04] transition-colors duration-150
            "
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="
                text-[10px] uppercase tracking-widest font-semibold text-neutral-400
              ">
                {entry.data.type}
              </span>
              <span className="text-[11px] text-neutral-600 tabular-nums">
                {new Date(entry.timestamp).toLocaleString(undefined, {
                  month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                title="Use Again"
                id={`reuse-btn-${entry.id}`}
                onClick={() => onReuse(entry)}
                className="
                  p-1.5 rounded-md text-neutral-500
                  hover:text-white hover:bg-white/10
                  transition-colors duration-150 cursor-pointer
                "
              >
                <CopyPlus size={13} />
              </button>
              <button
                type="button"
                title="Delete"
                id={`delete-btn-${entry.id}`}
                onClick={() => onDelete(entry.id)}
                className="
                  p-1.5 rounded-md text-neutral-500
                  hover:text-red-400 hover:bg-red-400/10
                  transition-colors duration-150 cursor-pointer
                "
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
