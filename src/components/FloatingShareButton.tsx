import React, { useState, useRef } from 'react';

interface Props {
  lang: 'ur' | 'en';
}

export const FloatingShareButton: React.FC<Props> = ({ lang }) => {
  const [position, setPosition] = useState({ x: 20, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const dragStartPos = useRef({ x: 0, y: 0, startPosX: 0, startPosY: 0 });
  const hasMoved = useRef(false);

  const shareText =
    lang === 'ur'
      ? '🩸 پاکستان بلڈ نیٹ ورک — فی سبیل اللہ خدمتِ انسانیت!\n\nایمرجنسی میں فوری بلڈ ڈونرز تلاش کریں یا بطور ڈونر اپنا نام درج کر کے کسی کی زندگی بچائیں۔\n\n"وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"\n\nابھی وزٹ کریں یا ایپ انسٹال کریں:\n'
      : '🩸 Pakistan Blood Network — Free Humanitarian Service!\n\nFind emergency blood donors or register to save precious lives.\n\nVisit or install app now:\n';

  const shareUrl = window.location.origin;
  const fullText = `${shareText} ${shareUrl}`;

  // ٹچ ڈریگ ہینڈلرز
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartPos.current = {
      x: touch.clientX,
      y: touch.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
    hasMoved.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartPos.current.x;
    const dy = touch.clientY - dragStartPos.current.y;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      hasMoved.current = true;
    }

    const newX = Math.max(10, Math.min(window.innerWidth - 65, dragStartPos.current.startPosX + dx));
    const newY = Math.max(60, Math.min(window.innerHeight - 100, dragStartPos.current.startPosY + dy));

    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleOpenShare = () => {
    if (hasMoved.current) return;
    setShowModal(true);
  };

  // لنکس
  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareToInstagram = async () => {
    // انسٹاگرام ویب ڈائریکٹ شیئرنگ ٹیکسٹ نہیں لیتا، اس لیے کلپ بورڈ کاپی کر کے انسٹاگرام ایپ کھول دیتے ہیں
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      window.open('https://instagram.com', '_blank');
    } catch {
      window.open('https://instagram.com', '_blank');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareMore = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pakistan Blood Network',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {}
    } else {
      copyToClipboard();
    }
  };

  return (
    <>
      {/* ۱) اسکرین پر تیرتا ہوا چھوٹا شیئر ببل */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleOpenShare}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none',
          zIndex: 9998,
        }}
        className="group cursor-grab active:cursor-grabbing select-none flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white shadow-[0_8px_25px_rgba(16,185,129,0.5)] border-2 border-white/90 active:scale-95 transition-transform duration-75"
        title={lang === 'ur' ? 'گھسیٹیں یا کلک کر کے شیئر کریں' : 'Drag or Tap to Share'}
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none"></span>

        <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
        </svg>

        <span className="absolute -bottom-1 -right-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow">
          SHARE
        </span>
      </div>

      {/* ۲) سوشل میڈیا شیئر پاپ اپ مینو */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 text-white shadow-2xl relative"
            dir={lang === 'ur' ? 'rtl' : 'ltr'}
          >
            {/* بند کرنے کا بٹن */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 sm:left-auto sm:right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 font-bold"
            >
              ✕
            </button>

            {/* ہیڈر */}
            <div className="text-center mb-5 mt-1">
              <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ur' ? 'صدقہ جاریہ میں حصہ لیں' : 'Share to Save Lives'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {lang === 'ur'
                  ? 'یہ ایپ اپنے دوستوں اور سوشل میڈیا پر ضرور شیئر کریں'
                  : 'Share this humanitarian app on your social circles'}
              </p>
            </div>

            {/* سوشل میڈیا گرڈ */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* واٹس ایپ */}
              <button
                onClick={shareToWhatsApp}
                className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm transition-transform active:scale-95"
              >
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  💬
                </span>
                <span>WhatsApp</span>
              </button>

              {/* فیس بک */}
              <button
                onClick={shareToFacebook}
                className="flex items-center gap-3 p-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-sm transition-transform active:scale-95"
              >
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  f
                </span>
                <span>Facebook</span>
              </button>

              {/* انسٹاگرام */}
              <button
                onClick={shareToInstagram}
                className="flex items-center gap-3 p-3 rounded-2xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 font-bold text-sm transition-transform active:scale-95"
              >
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                  📸
                </span>
                <span>Instagram</span>
              </button>

              {/* ٹیلیگرام */}
              <button
                onClick={shareToTelegram}
                className="flex items-center gap-3 p-3 rounded-2xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 font-bold text-sm transition-transform active:scale-95"
              >
                <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                  ✈️
                </span>
                <span>Telegram</span>
              </button>
            </div>

            {/* کاپی لنک اور مزید */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={copyToClipboard}
                className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    <span>{lang === 'ur' ? 'لنک کاپی ہو گیا!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>{lang === 'ur' ? 'لنک کاپی کریں' : 'Copy Direct Link'}</span>
                  </>
                )}
              </button>

              <button
                onClick={shareMore}
                className="w-full py-2 px-4 rounded-xl bg-transparent hover:bg-slate-800/60 text-slate-400 text-xs font-medium text-center"
              >
                {lang === 'ur' ? '📲 دیگر ایپس پر شیئر کریں (More)' : '📲 More Options'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
