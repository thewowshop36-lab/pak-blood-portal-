import React, { useState } from 'react';

interface VisualGuideProps {
  lang: 'ur' | 'en';
  theme: 'light' | 'dark';
}

export const BloodDonationVisualGuide: React.FC<VisualGuideProps> = ({ lang, theme }) => {
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className={`mt-10 p-4 sm:p-8 rounded-3xl border transition-all ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-gradient-to-b from-rose-50/60 via-white to-rose-50/40 border-rose-200/80 shadow-2xl'
    }`}>
      {/* ہیڈر */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md shadow-rose-600/30 mb-3 animate-pulse">
          <span>🎬</span>
          <span>{lang === 'ur' ? 'لائیو اینیمیٹڈ گائیڈ' : 'Live Animated Journey'}</span>
        </span>
        <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'ur' ? 'خون دینے کا اصل عمل کیسا ہوتا ہے؟' : 'What Really Happens When You Donate?'}
        </h3>
        <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {lang === 'ur' 
            ? 'خوف بالکل ختم! یہ ۵ اینیمیٹڈ مراحل دیکھیں اور جانیں کہ یہ کتنا آسان اور محفوظ ہے۔' 
            : 'Zero fear! Watch these 5 animated steps to see how safe and painless it is.'}
        </p>
      </div>

      <style>{`
        @keyframes flowLine {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.2); }
          30% { transform: scale(1.05); }
          45% { transform: scale(1.25); }
        }
        @keyframes bloodDrop {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          80% { transform: translateY(28px); opacity: 1; }
          100% { transform: translateY(35px); opacity: 0; }
        }
        @keyframes needleGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; filter: drop-shadow(0 0 6px #38bdf8); }
        }
        @keyframes juiceSip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .anim-flow {
          stroke-dasharray: 12 8;
          animation: flowLine 2s linear infinite;
        }
        .anim-heart-beat {
          transform-origin: center;
          animation: pulseHeart 1.3s ease-in-out infinite;
        }
        .anim-drop {
          animation: bloodDrop 1.5s ease-in infinite;
        }
        .anim-needle {
          animation: needleGlow 2s ease-in-out infinite;
        }
        .anim-juice {
          animation: juiceSip 2s ease-in-out infinite;
        }
      `}</style>

      {/* تمام 5 اینیمیٹڈ مراحل */}
      <div className="space-y-6">

        {/* مرحلہ 1: طبی معائنہ */}
        <div 
          onClick={() => setActiveStep(1)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStep === 1 
              ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
              : isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white">
              {lang === 'ur' ? 'مرحلہ ۱: صرف ۵ منٹ' : 'Step 1: 5 Mins'}
            </span>
            <span className="text-xs font-bold text-slate-400">#1</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* لائیو گرافک اینیمیشن */}
            <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 160 80">
                {/* ای سی جی مانیٹر اسکرین */}
                <path d="M 10,40 L 40,40 L 50,20 L 60,60 L 75,10 L 90,65 L 100,40 L 150,40" 
                      fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" className="anim-flow" />
                <circle cx="95" cy="40" r="4" fill="#22c55e" className="animate-ping" />
                <text x="15" y="70" fill="#22c55e" fontSize="9" fontWeight="bold">BP: 120/80 OK • Hb: 14.5</text>
              </svg>
            </div>

            <div className="flex-1 text-right sm:text-right">
              <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'بنیادی طبی معائنہ اور چیک اپ 🩺' : 'Basic Health Checkup 🩺'}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' 
                  ? 'ڈاکٹر آپ کا بی پی، وزن اور انگلی پر ہلکی سی پن سے ہیموگلوبن مفت چیک کرتا ہے۔ یہ آپ کا فری ہیلتھ ٹیسٹ بھی ہے!' 
                  : 'Free quick check of Blood Pressure, weight, and hemoglobin. 100% safe and verified!'}
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                🛡️ {lang === 'ur' ? 'تسلی: خون صرف اس صورت لیا جاتا ہے جب آپ مکمل طور پر تندرست ہوں۔' : 'Blood is only drawn if you are 100% fit.'}
              </div>
            </div>
          </div>
        </div>

        {/* مرحلہ 2: پرسکون صوفہ اور کینولا */}
        <div 
          onClick={() => setActiveStep(2)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStep === 2 
              ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
              : isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
              {lang === 'ur' ? 'مرحلہ ۲: صرف چند سیکنڈ' : 'Step 2: A Few Seconds'}
            </span>
            <span className="text-xs font-bold text-slate-400">#2</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* لائیو گرافک اینیمیشن */}
            <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 160 80">
                {/* ڈونر کا بازو اور سیل بند نیڈل */}
                <rect x="20" y="30" width="80" height="20" rx="10" fill="#475569" opacity="0.4" />
                <path d="M 120,40 L 80,40" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" className="anim-needle" />
                <circle cx="80" cy="40" r="5" fill="#e11d48" />
                <circle cx="80" cy="40" r="8" stroke="#38bdf8" strokeWidth="1.5" fill="none" className="animate-ping" />
                <text x="35" y="70" fill="#38bdf8" fontSize="9" fontWeight="bold">100% Sterile Needle (نیا کینولا)</text>
              </svg>
            </div>

            <div className="flex-1 text-right">
              <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'آرام دہ نشست اور محفوظ کینولا 💉' : 'Comfortable Recline & Needle 💉'}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' 
                  ? 'آپ ایک پرسکون صوفے پر لیٹتے ہیں۔ عملہ آپ کے سامنے نیا سیل بند کینولا کھولتا ہے۔ درد صرف ہلکی سی چیونٹی کے کاٹنے جتنا ہوتا ہے!' 
                  : 'Relax on a soft recliner. Brand new disposable needle. Zero pain, feels like an ant bite!'}
              </p>
              <div className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✨ {lang === 'ur' ? 'گارنٹی: کوئی سوئی دوبارہ استعمال نہیں ہوتی، بیماری لگنے کا 0% چانس۔' : 'No reused needles. Completely sterile and safe.'}
              </div>
            </div>
          </div>
        </div>

        {/* مرحلہ 3: خون کی بوتل بھرنا */}
        <div 
          onClick={() => setActiveStep(3)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStep === 3 
              ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
              : isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white">
              {lang === 'ur' ? 'مرحلہ ۳: صرف ۸ سے ۱۰ منٹ' : 'Step 3: 8-10 Mins'}
            </span>
            <span className="text-xs font-bold text-slate-400">#3</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* لائیو گرافک اینیمیشن */}
            <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 160 80">
                {/* بلڈ ٹیوب */}
                <path d="M 10,25 C 50,25 60,15 80,15 L 80,30" fill="none" stroke="#e11d48" strokeWidth="3" className="anim-flow" />
                {/* بیگ */}
                <rect x="65" y="25" width="30" height="42" rx="6" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
                <rect x="67" y="45" width="26" height="20" rx="4" fill="#e11d48" />
                {/* ٹپکتا قطرہ */}
                <circle cx="80" cy="30" r="2.5" fill="#f43f5e" className="anim-drop" />
                <text x="74" y="58" fill="#ffffff" fontSize="8" fontWeight="bold">450ml</text>
                <text x="35" y="75" fill="#f43f5e" fontSize="9" fontWeight="bold">Filling Naturally (خون کا بہاؤ)</text>
              </svg>
            </div>

            <div className="flex-1 text-right">
              <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'خون کا قدرتی بہاؤ اور بوتل بھرنا 🩸' : 'Natural Flow & Bottle Filling 🩸'}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' 
                  ? 'آپ صوفے پر لیٹے فون چلاتے ہیں یا پرسکون رہتے ہیں۔ مشین صرف ایک بوتل (450 ملی لیٹر) خون لے لیتی ہے جو جسم کا صرف 10واں حصہ ہوتا ہے۔' 
                  : 'Rest on recliner, use your phone. Only 450ml is collected in under 10 minutes.'}
              </p>
              <div className="mt-2 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                🩸 {lang === 'ur' ? 'حقیقت: آپ کو کمزوری نہیں ہوتی بلکہ جسم نیا تازہ خون بنانا شروع کر دیتا ہے۔' : 'Your body immediately starts producing healthy fresh blood.'}
              </div>
            </div>
          </div>
        </div>

        {/* مرحلہ 4: میٹھا جوس اور آرام */}
        <div 
          onClick={() => setActiveStep(4)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStep === 4 
              ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
              : isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white">
              {lang === 'ur' ? 'مرحلہ ۴: فوری انرجی' : 'Step 4: Energy Boost'}
            </span>
            <span className="text-xs font-bold text-slate-400">#4</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* لائیو گرافک اینیمیشن */}
            <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0 shadow-inner">
              <svg className="w-full h-full anim-juice" viewBox="0 0 160 80">
                {/* جوس باکس اور اسٹرا */}
                <rect x="55" y="25" width="25" height="38" rx="4" fill="#f59e0b" />
                <path d="M 68,10 L 68,25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                {/* بسکٹ */}
                <circle cx="95" cy="45" r="14" fill="#d97706" />
                <circle cx="91" cy="40" r="1.5" fill="#78350f" />
                <circle cx="98" cy="43" r="1.5" fill="#78350f" />
                <circle cx="94" cy="50" r="1.5" fill="#78350f" />
                <text x="35" y="74" fill="#f59e0b" fontSize="9" fontWeight="bold">Juice & Biscuits (تازہ انرجی)</text>
              </svg>
            </div>

            <div className="flex-1 text-right">
              <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'تازہ جوس، بسکٹ اور ریفریشمنٹ 🧃🍪' : 'Juice, Cookies & 10 Min Rest 🧃🍪'}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' 
                  ? 'خون دینے کے فوراً بعد میٹھا جوس اور بسکٹ دیے جاتے ہیں۔ 10 منٹ بیٹھنے سے خون کی مقدار اور طاقت فوراً بحال ہو جاتی ہے!' 
                  : 'Enjoy sweet fruit juice and snacks. 10 minutes of relaxation completely restores your body!'}
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                💪 {lang === 'ur' ? 'پرو ٹِپ: اس دن زیادہ پانی پییں، آپ بالکل ہشاش بشاش رہیں گے۔' : 'Drink plenty of water today and you will feel energetic.'}
              </div>
            </div>
          </div>
        </div>

        {/* مرحلہ 5: نئی زندگی اور ثواب */}
        <div 
          onClick={() => setActiveStep(5)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeStep === 5 
              ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
              : isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
              {lang === 'ur' ? 'مرحلہ ۵: اگلے ۲۴ گھنٹے' : 'Step 5: 24 Hours'}
            </span>
            <span className="text-xs font-bold text-slate-400">#5</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* لائیو گرافک اینیمیشن */}
            <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 160 80">
                {/* دھڑکتا ہوا سرخ دل */}
                <g className="anim-heart-beat">
                  <path d="M 80,35 C 80,23 68,14 56,23 C 44,32 44,45 80,68 C 116,45 116,32 104,23 C 92,14 80,23 80,35 Z" fill="#e11d48" />
                </g>
                <text x="32" y="75" fill="#22c55e" fontSize="9" fontWeight="bold">Life Saved! (کسی کی جان بچ گئی)</text>
              </svg>
            </div>

            <div className="flex-1 text-right">
              <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'نیا خون، صحت اور کسی کی جان بچ گئی! ❤️🦸' : 'New Blood & A Saved Life! ❤️🦸'}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' 
                  ? 'آپ کے جسم میں نیا سرخ خون پیدا ہونا شروع ہو جاتا ہے جس سے دل کی بیماریوں کا خطرہ کم ہوتا ہے اور آپ کا دیا گیا خون کسی ایمرجنسی مریض یا تھیلیسیمیا کے بچے کو نئی زندگی دے چکا ہوتا ہے!' 
                  : 'Your body rejuvenates with fresh cells while your blood saves an emergency patient!'}
              </p>
              <div className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                🌟 {lang === 'ur' ? 'قرآن پاک: "جس نے ایک انسان کی جان بچائی، گویا اس نے پوری انسانیت کو بچا لیا۔"' : 'Saving one life is like saving all of humanity.'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* نیچے والی پٹی */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-black shadow-lg shadow-rose-600/30">
          <span>🩸</span>
          <span>{lang === 'ur' ? 'دیکھا کتنا آسان تھا؟ آج ہی ڈونر بنیں اور ہیرو کہلائیں!' : 'See how easy that was? Register as a donor today!'}</span>
        </div>
      </div>
    </div>
  );
};
