import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import type { QRCodeSettings, QRCodeData } from '../types';
import { generatePayload } from '../utils/qrPayload';
import { validateData } from '../utils/validation';
import { checkReliability } from '../utils/contrast';
import { AlertTriangle, CheckCircle, ScanLine } from 'lucide-react';

interface Props {
  data: QRCodeData;
  settings: QRCodeSettings;
  onDownloadReady: (dataUrl: string) => void;
  onGenerateSuccess: () => void;
}

export const QRPreview: React.FC<Props> = ({ data, settings, onDownloadReady, onGenerateSuccess }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<any[]>([]);

  useEffect(() => {
    const renderQR = async () => {
      const validationErrors = validateData(data);
      if (Object.keys(validationErrors).length > 0) {
        setError('Fix the input errors above to generate the QR code.');
        return;
      }

      const payload = generatePayload(data);
      if (!payload) {
        setError('Invalid or empty data for QR code.');
        return;
      }

      setError(null);
      setWarnings(checkReliability(settings));

      if (canvasRef.current) {
        try {
          await QRCode.toCanvas(canvasRef.current, payload, {
            width: settings.size,
            margin: settings.margin,
            color: { dark: settings.fgColor, light: settings.bgColor },
            errorCorrectionLevel: settings.level,
          });
          const dataUrl = canvasRef.current.toDataURL('image/png');
          onDownloadReady(dataUrl);
          onGenerateSuccess();
        } catch (err) {
          console.error(err);
          setError('Failed to generate QR Code. Data may be too large for this correction level.');
        }
      }
    };

    renderQR();
  }, [data, settings, onDownloadReady, onGenerateSuccess]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas area */}
      <div className="
        w-full flex items-center justify-center
        rounded-xl border border-white/10 bg-white/[0.03]
        p-6 min-h-[220px]
      ">
        {error ? (
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <ScanLine size={32} className="text-neutral-600" />
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[200px]">{error}</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden" style={{ lineHeight: 0 }}>
            <canvas
              ref={canvasRef}
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
      </div>

      {/* Reliability feedback */}
      {!error && (
        <div className="w-full">
          {warnings.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05]">
              <CheckCircle size={13} className="text-emerald-500 shrink-0" />
              <span className="text-[11px] text-emerald-400 leading-relaxed">High scan reliability</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.05]">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-amber-400 leading-relaxed">{w.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
