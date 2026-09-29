import React, { useState, useEffect } from 'react';

interface InstallBannerProps {
  lang: 'ur' | 'en';
}

export const InstallAppBanner: React.FC<InstallBannerProps> = ({ lang }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-12 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 animate-bounce">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-2xl border border-rose-400 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center text-xl font-black shadow-md">
            🩸
          </div>
          <div>
            <h4 className="text-xs font-black">
              {lang === 'ur' ? 'پاکستان بلڈ پورٹل ایپ' : 'Pakistan Blood Portal App'}
            </h4>
            <p className="text-[11px] text-rose-100">
              {lang === 'ur' ? 'اپنے موبائل میں انسٹال کریں' : 'Install on your mobile phone'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-white text-rose-600 text-xs font-black shadow hover:bg-rose-50 transition-all"
          >
            {lang === 'ur' ? 'انسٹال کریں 📲' : 'Install 📲'}
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 text-rose-200 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
