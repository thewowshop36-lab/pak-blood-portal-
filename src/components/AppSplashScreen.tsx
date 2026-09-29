import React, { useEffect, useState } from 'react';

interface SplashProps {
  onFinish: () => void;
  lang: 'ur' | 'en';
}

export const AppSplashScreen: React.FC<SplashProps> = ({ onFinish, lang }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 2.2 سیکنڈ بعد سموتھ فیڈ آؤٹ
    const timer1 = setTimeout(() => {
      setFade(true);
    }, 2200);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 bg-gradient-to-b from-slate-950 via-rose-950 to-slate-950 text-white transition-opacity duration-500 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1.04); }
          42% { transform: scale(1.22); }
          70% { transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.15); filter: drop-shadow(0 0 25px #e11d48); }
        }
        @keyframes flowWave {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .anim-heart {
          transform-origin: center;
          animation: heartbeat 1.4s ease-in-out infinite;
        }
        .anim-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .anim-wave {
          stroke-dasharray: 20 10;
          animation: flowWave 2s linear infinite;
        }
      `}</style>

      {/* اوپر والی ہیڈر لائٹ */}
      <div className="pt-6 flex flex-col items-center">
        <span className="px-3.5 py-1 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 tracking-wider">
          🇵🇰 PAKISTAN LIVE BLOOD NETWORK
        </span>
      </div>

      {/* درمیان میں متحرک ایموشنل اینیمیشن */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          {/* گلوز اور ہیلو */}
          <div className="absolute inset-0 bg-rose-600/30 rounded-full blur-2xl anim-glow"></div>

          {/* بڑا سرخ خون کا قطرہ اور دل */}
          <svg className="w-28 h-28 anim-heart relative z-10" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4b72" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
            </defs>
            {/* خون کا قطرہ */}
            <path
              d="M 100,20 C 100,20 35,100 35,140 C 35,175 64,195 100,195 C 136,195 165,175 165,140 C 165,100 100,20 100,20 Z"
              fill="url(#dropGrad)"
              filter="drop-shadow(0 10px 15px rgba(225,29,72,0.5))"
            />
            {/* اندر سفید میڈیکل پلس نشان */}
            <rect x="92" y="115" width="16" height="42" rx="4" fill="#ffffff" opacity="0.95" />
            <rect x="79" y="128" width="42" height="16" rx="4" fill="#ffffff" opacity="0.95" />
          </svg>
        </div>

        {/* لائیو ای سی جی لائف لائن */}
        <div className="w-48 h-8 mb-4">
          <svg className="w-full h-full" viewBox="0 0 160 30">
            <path
              d="M 0,15 L 40,15 L 50,5 L 60,25 L 75,0 L 90,28 L 100,15 L 160,15"
              fill="none"
              stroke="#fb7185"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="anim-wave"
            />
          </svg>
        </div>

        {/* عنوان اور قرآن پاک کی آیت */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          {lang === 'ur' ? 'پاکستان بلڈ نیٹ ورک' : 'Pakistan Blood Network'}
        </h1>
        <p className="text-amber-400 font-bold text-sm sm:text-base mb-2 font-serif">
          "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"
        </p>
        <p className="text-xs sm:text-sm text-rose-200/90 max-w-xs leading-relaxed font-medium">
          {lang === 'ur'
            ? 'ایک بوتل خون، کسی کے گھر کا بجھتا ہوا چراغ جلا سکتی ہے'
            : 'One donation of blood can save three lives and light up a dying home.'}
        </p>
      </div>

      {/* نیچے لوڈر اور مشن */}
      <div className="pb-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>
            {lang === 'ur'
              ? 'مفت اور فی سبیل اللہ انسانیت کی خدمت...'
              : '100% Free Humanitarian Blood Service...'}
          </span>
        </div>
      </div>
    </div>
  );
};
