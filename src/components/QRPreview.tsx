import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import type { QRCodeSettings, QRCodeData } from '../types';
import { generatePayload } from '../utils/qrPayload';
import { validateData } from '../utils/validation';
import { checkReliability } from '../utils/contrast';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

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
        setError('Please fix the input errors to generate the QR code.');
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
            color: {
              dark: settings.fgColor,
              light: settings.bgColor,
            },
            errorCorrectionLevel: settings.level,
          });
          
          const dataUrl = canvasRef.current.toDataURL('image/png');
          onDownloadReady(dataUrl);
          onGenerateSuccess();
        } catch (err) {
          console.error(err);
          setError('Failed to generate QR Code. Data may be too large for this error correction level.');
        }
      }
    };

    renderQR();
  }, [data, settings, onDownloadReady, onGenerateSuccess]);

  return (
    <div className="preview-container">
      {error ? (
        <div className="empty-state">
          <Info size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="qr-canvas-wrapper">
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }}></canvas>
          </div>
          
          <div style={{ marginTop: '1.5rem', width: '100%' }}>
            {warnings.length === 0 ? (
              <div className="success-alert">
                <CheckCircle size={20} />
                <span>High Scan Reliability. This QR code is recommended.</span>
              </div>
            ) : (
              warnings.map((w, i) => (
                <div key={i} className="warning-alert">
                  <AlertTriangle size={20} />
                  <span>{w.message}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
