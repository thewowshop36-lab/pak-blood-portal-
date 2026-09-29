import React, { useState } from 'react';

interface VisualGuideProps {
  lang: 'ur' | 'en';
  theme: 'light' | 'dark';
}

export const BloodDonationVisualGuide: React.FC<VisualGuideProps> = ({ lang, theme }) => {
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      badge: lang === 'ur' ? 'مرحلہ ۱: صرف ۵ منٹ' : 'Step 1: Just 5 Mins',
      titleUr: 'بنیادی طبی معائنہ اور چیک اپ 🩺',
      titleEn: 'Basic Health Screening & Quick Check 🩺',
      descUr: 'ڈاکٹر آپ کا بلڈ پریشر، وزن اور ایک قطرہ خون سے ہیموگلوبن (Hb) مفت چیک کرتا ہے۔ یہ آپ کی اپنی صحت کا بھی زبردست فری ٹیسٹ ہے!',
      descEn: 'Doctor checks your BP, weight, and a tiny prick tests hemoglobin. A great free health snapshot for yourself!',
      iconSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-rose-500 animate-pulse">
          <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
          <path d="M30 50h12l5-15 8 30 7-20 5 8h13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      tipUr: '💡 تسلی: اگر ہیموگلوبن پورا نہ ہو تو خون نہیں لیا جاتا، آپ کی حفاظت 100٪ اولین ترجیح ہے۔',
      tipEn: '💡 Safety First: Donation is only cleared if your Hb levels are completely healthy.'
    },
    {
      num: 2,
      badge: lang === 'ur' ? 'مرحلہ ۲: صرف چند سیکنڈ' : 'Step 2: A Few Seconds',
      titleUr: 'پرسکون نشست اور محفوظ کینولا 💉',
      titleEn: 'Comfortable Recline & Sterile Needle 💉',
      descUr: 'آپ ایک آرام دہ صوفے پر لیٹتے ہیں۔ عملہ بالکل نیا، سیل بند، ون ٹائم یوز کینولا لگاتا ہے۔ درد صرف ہلکی سی چیونٹی کے کاٹنے جتنا ہوتا ہے!',
      descEn: 'Relax on a cushioned recliner. A sterile single-use needle is gently placed. Sensation is no more than a tiny ant bite!',
      iconSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-blue-500">
          <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
          <rect x="25" y="42" width="40" height="16" rx="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="3" />
          <line x1="65" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="25" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      tipUr: '🛡️ گارنٹی: کوئی سوئی دوبارہ استعمال نہیں ہوتی، کسی بھی بیماری لگنے کا 0% چانس ہے۔',
      tipEn: '🛡️ 100% Sterile: Disposable kit eliminates any risk of contamination or infection.'
    },
    {
      num: 3,
      badge: lang === 'ur' ? 'مرحلہ ۳: صرف ۸ سے ۱۰ منٹ' : 'Step 3: 8-10 Minutes',
      titleUr: 'خون کا قدرتی بہاؤ اور بوتل بھرنا 🩸',
      titleEn: 'Natural Flow & Blood Bag Filling 🩸',
      descUr: 'آپ صوفے پر لیٹے فون چلاتے ہیں یا پرسکون رہتے ہیں۔ خودکار مشین صرف ایک پنٹ (450 ملی لیٹر) خون محفوظ کر لیتی ہے۔ آپ کو بالکل پتہ بھی نہیں چلتا!',
      descEn: 'Relax, read, or browse your phone. The automated rocker gently gathers 450ml of lifesaving liquid in under 10 minutes.',
      iconSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-rose-600">
          <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
          <rect x="32" y="25" width="36" height="50" rx="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3" />
          <path d="M35 55 Q 50 50 65 55 L 65 70 Q 65 74 61 74 L 39 74 Q 35 74 35 70 Z" fill="currentColor" className="animate-pulse" />
          <circle cx="50" cy="38" r="3" fill="currentColor" className="animate-ping" />
        </svg>
      ),
      tipUr: '✨ حقیقت: انسانی جسم میں 5 لیٹر خون ہوتا ہے، صرف 10واں حصہ لیا جاتا ہے جو جسم کے لیے فائدہ مند ہے۔',
      tipEn: '✨ Fact: Your body carries ~5L of blood; donating 450ml actually stimulates healthy new cell production!'
    },
    {
      num: 4,
      badge: lang === 'ur' ? 'مرحلہ ۴: فوری انرجی' : 'Step 4: Sweet Refreshment',
      titleUr: 'تازہ جوس، بسکٹ اور آرام 🧃🍪',
      titleEn: 'Fresh Juice, Cookies & 10 Min Rest 🧃🍪',
      descUr: 'خون دینے کے فوراً بعد آپ کو میٹھا جوس اور بسکٹ دیے جاتے ہیں۔ 10 منٹ بیٹھنے سے خون کا پریشر معمول پر آ جاتا ہے اور چہرے پر اطمینان کی مسکراہٹ ہوتی ہے!',
      descEn: 'Enjoy chilled fruit juice and snacks. Resting for 10 minutes restores natural hydration and leaves you feeling revitalized.',
      iconSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-500">
          <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
          <rect x="35" y="32" width="28" height="42" rx="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="3" />
          <line x1="48" y1="20" x2="48" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="54" r="5" fill="currentColor" />
        </svg>
      ),
      tipUr: '💪 پرو ٹِپ: جوس پینے کے بعد زیادہ سے زیادہ پانی پییں تاکہ والیم فوری پورا ہو جائے۔',
      tipEn: '💪 Pro-Tip: Hydrate with plenty of water over the next 24 hours to feel fully energetic.'
    },
    {
      num: 5,
      badge: lang === 'ur' ? 'مرحلہ ۵: اگلے ۲۴ سے ۴۸ گھنٹے' : 'Step 5: 24-48 Hours',
      titleUr: 'جسم میں نیا تازہ خون اور ایک نئی زندگی! ❤️🦸',
      titleEn: 'Fresh New Blood & A Heroic Saved Life! ❤️🦸',
      descUr: 'بون میرو فوراً تازہ اور صحت مند سرخ خلیے پیدا کرنا شروع کر دیتا ہے۔ دل کے دورے اور کینسر کا خطرہ کم ہوتا ہے اور آپ کا دیا ہوا خون کسی معصوم کی جان بچا چکا ہوتا ہے!',
      descEn: 'Your bone marrow actively creates new, youthful cells. Blood pressure normalizes while your 1 bottle rescues an emergency patient or thalassemia child!',
      iconSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500 animate-bounce">
          <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 35 C50 25 35 15 25 25 C15 35 25 55 50 72 C75 55 85 35 75 25 C65 15 50 25 50 35 Z" fill="currentColor" />
        </svg>
      ),
      tipUr: '🌟 ثواب و برکت: "جس نے ایک انسان کی جان بچائی، گویا اس نے پوری انسانیت کو بچا لیا۔" (القرآن)',
      tipEn: '🌟 Miracle: A single donation can be split into RBCs, platelets & plasma to save up to 3 lives!'
    }
  ];

  return (
    <div className={`mt-10 p-5 sm:p-8 rounded-3xl border transition-all ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 border-rose-100 shadow-xl'
    }`}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600/10 text-rose-600 border border-rose-600/20 mb-3">
          <span>🎬</span>
          <span>{lang === 'ur' ? 'تصویری اور اینیمیٹڈ گائیڈ' : 'Interactive Visual Journey'}</span>
        </span>
        <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'ur' ? 'خون دینے کا مکمل عمل کیسا ہوتا ہے؟' : 'What Happens During Blood Donation?'}
        </h3>
        <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {lang === 'ur' 
            ? 'پہلی بار خون دے رہے ہیں؟ یہ ۵ آسان مراحل دیکھیں اور جانیں کہ یہ کتنا آسان، بے درد اور محفوظ ہے!' 
            : 'First time donor? Walk through these 5 easy steps to see how safe, quick, and painless it truly is!'}
        </p>
      </div>

      {/* Vertical Animated Timeline Flow */}
      <div className="relative max-w-3xl mx-auto">
        {/* Animated Blood Stream Line Running Through Center */}
        <div className="absolute top-8 bottom-8 left-6 sm:left-1/2 -translate-x-1/2 w-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-rose-500 via-rose-600 to-rose-500 rounded-full animate-pulse opacity-80" />
        </div>

        {/* Steps Stack */}
        <div className="space-y-8 sm:space-y-12">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const isCurrent = activeStep === step.num;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 cursor-pointer transition-all duration-300 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Step Content Card */}
                <div className={`w-full sm:w-[calc(50%-2rem)] p-5 rounded-2xl border transition-all duration-300 ${
                  isCurrent
                    ? isDark 
                      ? 'bg-slate-800 border-rose-500/60 shadow-lg shadow-rose-950/30 scale-[1.02]' 
                      : 'bg-white border-rose-400 shadow-xl shadow-rose-500/10 scale-[1.02]'
                    : isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-white/70 border-slate-200/80 hover:border-rose-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                      {step.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      #{step.num}
                    </span>
                  </div>

                  <h4 className={`text-base font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? step.titleUr : step.titleEn}
                  </h4>

                  <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {lang === 'ur' ? step.descUr : step.descEn}
                  </p>

                  <div className={`p-2.5 rounded-xl text-[11px] font-semibold leading-relaxed ${
                    isDark ? 'bg-slate-950/60 text-amber-300/90' : 'bg-amber-50 text-amber-900'
                  }`}>
                    {lang === 'ur' ? step.tipUr : step.tipEn}
                  </div>
                </div>

                {/* Center Node Icon */}
                <div className={`relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-rose-600 text-white border-white dark:border-slate-900 shadow-lg shadow-rose-600/40 scale-110'
                    : isDark
                      ? 'bg-slate-800 text-slate-400 border-slate-700'
                      : 'bg-white text-slate-600 border-slate-200 shadow-sm'
                }`}>
                  <span className="font-black text-sm">{step.num}</span>
                </div>

                {/* Illustration Preview on Alternate Side */}
                <div className={`hidden sm:flex w-[calc(50%-2rem)] items-center justify-center p-4 ${
                  isEven ? 'justify-end' : 'justify-start'
                }`}>
                  <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 transition-transform duration-300 hover:scale-110">
                    {step.iconSvg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Final Call to Action */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-rose-600 text-white font-black text-xs shadow-lg shadow-rose-600/30">
          <span className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center text-sm">
            🩸
          </span>
          <span>
            {lang === 'ur' 
              ? 'صرف ۱۵ منٹ نکالیں اور کسی کے گھر کا چراغ بجھنے سے بچائیں!' 
              : 'Spare 15 minutes today — save someone’s mother, child, or brother!'}
          </span>
        </div>
      </div>
    </div>
  );
};
