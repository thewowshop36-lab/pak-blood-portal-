import React from 'react';

interface BloodDonationStepsProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
  onRegisterClick: () => void;
}

const STEPS = [
  {
    step: 1,
    icon: '📋',
    titleUrdu: '۱. رجسٹریشن اور مفت طبی معائنہ',
    titleEn: '1. Registration & Mini Checkup',
    descUrdu: 'بلڈ بینک یا کیمپ پر آپ کا وزن، بلڈ پریشر اور ہیموگلوبن (Hb) ٹیسٹ بالکل مفت کیا جاتا ہے تاکہ آپ کی صحت یقینی ہو۔',
    descEn: 'Free vital check of your weight, BP, and hemoglobin level to confirm you are 100% fit to donate.',
    timeUrdu: '۵ تا ۷ منٹ',
    timeEn: '5-7 Mins',
    color: 'border-rose-500 bg-rose-500/10 text-rose-600',
  },
  {
    step: 2,
    icon: '🩸',
    titleUrdu: '۲. آرام دہ اور محفوظ خون کی منتقلی',
    titleEn: '2. Comfortable & Safe Donation',
    descUrdu: '۱۰۰٪ نئی ڈسپوزایبل سرنج اور طبی کٹ کے ذریعے آرام دہ صوفے پر محض ۳۵۰ سے ۴۵۰ ملی لیٹر خون لیا جاتا ہے۔ کوئی تکلیف نہیں ہوتی۔',
    descEn: 'Using 100% sterile disposable kits on a comfy donor couch. Painless and strictly regulated.',
    timeUrdu: '۸ تا ۱۰ منٹ',
    timeEn: '8-10 Mins',
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600',
  },
  {
    step: 3,
    icon: '🧃',
    titleUrdu: '۳. تازہ جوس اور فوری ریفریشمنٹ',
    titleEn: '3. Refreshment & Rest',
    descUrdu: 'خون دینے کے فوراً بعد آپ کو تازہ جوس، پانی اور بسکٹ پیش کیے جاتے ہیں اور ۵ منٹ آرام کرایا جاتا ہے تاکہ فوری توانائی بحال ہو۔',
    descEn: 'Enjoy chilled fruit juice, water and snacks for 5-10 minutes to instantly restore hydration.',
    timeUrdu: '۵ تا ۱۰ منٹ',
    timeEn: '5-10 Mins',
    color: 'border-amber-500 bg-amber-500/10 text-amber-600',
  },
  {
    step: 4,
    icon: '🏆',
    titleUrdu: '۴. ۳ انسانوں کی زندگی بچانے کا فخر',
    titleEn: '4. The Pride of Saving 3 Lives',
    descUrdu: 'آپ کا ایک یونٹ خون ۳ الگ اجزاء (ریڈ سیلز، پلازما، پلیٹلیٹس) میں تقسیم ہو کر ۳ مختلف مریضوں کی جان بچاتا ہے۔',
    descEn: 'Your single blood bag is separated into 3 lifelines: red cells, plasma & platelets for 3 patients.',
    timeUrdu: 'زندگی بھر کا ثواب',
    timeEn: 'Lifelong Reward',
    color: 'border-sky-500 bg-sky-500/10 text-sky-600',
  },
];

export const BloodDonationSteps: React.FC<BloodDonationStepsProps> = ({
  lang,
  theme = 'light',
  onRegisterClick,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-600/15 text-rose-600 flex items-center justify-center text-xl shrink-0">
            🪜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'خون کا عطیہ دینے کے ۴ آسان اور محفوظ مراحل' : '4 Easy Steps of Blood Donation'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white">
                {lang === 'ur' ? 'کل ۱۵ منٹ' : 'Only 15 Mins'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'خون دینے کا پورا عمل انتہائی سادہ، بے درد اور بین الاقوامی معیار کے مطابق ہے' : 'Simple, painless, and medically supervised process from start to finish'}
            </p>
          </div>
        </div>

        <button
          onClick={onRegisterClick}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md transition self-start sm:self-auto cursor-pointer"
        >
          {lang === 'ur' ? 'ابھی ڈونر بنیں ➕' : 'Register as Donor ➕'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s) => (
          <div
            key={s.step}
            className={`relative p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shadow-xs ${s.color}`}>
                {s.icon}
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl">
                ⏱️ {lang === 'ur' ? s.timeUrdu : s.timeEn}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className={`text-sm sm:text-base font-black leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? s.titleUrdu : s.titleEn}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'ur' ? s.descUrdu : s.descEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>{lang === 'ur' ? `مرحلہ نمبر ${s.step}` : `Step ${s.step} of 4`}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
