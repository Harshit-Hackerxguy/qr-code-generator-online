import { useState, useEffect } from 'react';
import { QRTypeSelector } from './components/QRTypeSelector';
import { QRInputForm } from './components/QRInputForm';
import { CustomizationPanel } from './components/CustomizationPanel';
import { QRPreview } from './components/QRPreview';
import { RecentQRCodes } from './components/RecentQRCodes';
import type { QRCodeData, QRCodeSettings, QRType, QRHistoryEntry, QRPreset } from './types';
import { presets } from './utils/presets';
import { validateData } from './utils/validation';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from './utils/localStorage';
import { downloadQRCode } from './utils/download';
import { Download, QrCode } from 'lucide-react';

const defaultSettings = presets[0].settings;

function App() {
  const [data, setData] = useState<QRCodeData>({ type: 'url', url: 'https://example.com' });
  const [settings, setSettings] = useState<QRCodeSettings>(defaultSettings);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [history, setHistory] = useState<QRHistoryEntry[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Validate on data change
  useEffect(() => {
    setErrors(validateData(data));
  }, [data]);

  const handleTypeSelect = (type: QRType) => {
    setData((prev) => ({ ...prev, type }));
  };

  const handleDownload = () => {
    if (downloadUrl && Object.keys(errors).length === 0) {
      downloadQRCode(downloadUrl, `qr-${data.type}-${Date.now()}.png`);
      const newHistory = saveToHistory(data, settings);
      setHistory(newHistory);
    }
  };

  const handleReuseHistory = (entry: QRHistoryEntry) => {
    setData(entry.data);
    setSettings(entry.settings);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    const newHistory = deleteFromHistory(id);
    setHistory(newHistory);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your QR history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <QrCode size={40} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
          QR Studio
        </h1>
        <p>A completely private, real-time QR code generator that works offline.</p>
      </header>

      <div className="main-content">
        <div className="left-column">
          <div className="card">
            <h2>1. Select Data Type</h2>
            <QRTypeSelector selectedType={data.type} onSelect={handleTypeSelect} />
            <QRInputForm data={data} onChange={setData} errors={errors} />
          </div>

          <div className="card">
            <h2>2. Customize</h2>
            <CustomizationPanel
              settings={settings}
              onChange={setSettings}
              onPresetSelect={(preset: QRPreset) => setSettings(preset.settings)}
            />
          </div>
        </div>

        <div className="right-column">
          <div className="card" style={{ position: 'sticky', top: '2rem' }}>
            <h2>3. Preview & Download</h2>
            <QRPreview
              data={data}
              settings={settings}
              onDownloadReady={setDownloadUrl}
              onGenerateSuccess={() => {}}
            />
            
            <button
              className="btn btn-primary btn-full"
              onClick={handleDownload}
              disabled={!downloadUrl || Object.keys(errors).length > 0}
              style={{ fontSize: '1.1rem', padding: '1rem' }}
            >
              <Download size={20} />
              Download PNG
            </button>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <RecentQRCodes
              history={history}
              onReuse={handleReuseHistory}
              onDelete={handleDeleteHistory}
              onClear={handleClearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
