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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-[#09090b] font-sans">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5">
              <QrCode size={20} className="text-white" />
            </div>
            <span className="text-white font-medium tracking-tight text-base">QR Studio</span>
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
            Private · Offline · Real-time
          </span>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-3">
          QR Code Generator
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-white leading-tight max-w-lg">
          Generate QR codes instantly,<br />
          <span className="text-neutral-400">right in your browser.</span>
        </h1>
      </div>

      {/* ── Bento Grid ──────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]">

          {/* LEFT COLUMN */}
          <div className="bg-[#09090b] flex flex-col divide-y divide-white/[0.06]">

            {/* Section 1 — Data Type */}
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 mb-4">
                01 — Data type
              </p>
              <QRTypeSelector selectedType={data.type} onSelect={handleTypeSelect} />
              <QRInputForm data={data} onChange={setData} errors={errors} />
            </div>

            {/* Section 2 — Customize */}
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500 mb-4">
                02 — Customize
              </p>
              <CustomizationPanel
                settings={settings}
                onChange={setSettings}
                onPresetSelect={(preset: QRPreset) => setSettings(preset.settings)}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-[#09090b] flex flex-col divide-y divide-white/[0.06] lg:border-l border-white/[0.06]">

            {/* Section 3 — Preview */}
            <div className="p-6 flex flex-col items-stretch gap-5 flex-1">
              <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
                03 — Preview
              </p>

              <QRPreview
                data={data}
                settings={settings}
                onDownloadReady={setDownloadUrl}
                onGenerateSuccess={() => {}}
              />

              <button
                id="download-btn"
                onClick={handleDownload}
                disabled={!downloadUrl || hasErrors}
                className="
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg text-sm font-medium
                  bg-white text-black
                  hover:bg-neutral-200
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-colors duration-150
                "
              >
                <Download size={15} />
                Download PNG
              </button>
            </div>

            {/* Section 4 — History */}
            {history.length > 0 && (
              <div className="p-6">
                <RecentQRCodes
                  history={history}
                  onReuse={handleReuseHistory}
                  onDelete={handleDeleteHistory}
                  onClear={handleClearHistory}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
