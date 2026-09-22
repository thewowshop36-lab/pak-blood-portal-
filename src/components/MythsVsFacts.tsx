import React, { useState } from 'react';

interface MythFactItem {
  id: number;
  mythUrdu: string;
  mythEn: string;
  factUrdu: string;
  factEn: string;
  icon: string;
}

const MYTHS_FACTS: MythFactItem[] = [
  {
    id: 1,
    icon: '💪',
    mythUrdu: 'غلط فہمی: خون دینے سے انسان مستقل طور پر کمزور اور لاغر ہو جاتا ہے۔',
    mythEn: 'Myth: Donating blood causes permanent weakness and fatigue.',
    factUrdu: 'حقیقت: بالکل نہیں! جسم کا مائع (پلازما) اگلے ۲۴ گھنٹوں میں اور ریڈ سیلز چند ہفتوں میں بن جاتے ہیں۔ ہڈیوں کا گودا چست ہو کر نیا تروتازہ خون بناتا ہے جو انسان کو چست کرتا ہے۔',
    factEn: 'Fact: Blood volume replenishes within 24-48 hours. Bone marrow produces fresh, energized red cells.',
  },
  {
    id: 2,
    icon: '💉',
    mythUrdu: 'غلط فہمی: خون دینے سے ہیپاٹائٹس یا ایڈز جیسی متعدی بیماریاں لگ سکتی ہیں۔',
    mythEn: 'Myth: You can contract infections or diseases while donating blood.',
    factUrdu: 'حقیقت: ہرگز نہیں! ہر عطیہ دہندہ کے لیے ۱۰۰٪ نئی، جراثیم سے پاک اور ڈسپوزایبل سوئی و کٹ استعمال کی جاتی ہے جو آپ کے سامنے کھولی اور بعد میں فوراً تلف کی جاتی ہے۔',
    factEn: 'Fact: Strictly 100% single-use, sterile, disposable needles are used. No chance of contamination.',
  },
  {
    id: 3,
    icon: '👩',
    mythUrdu: 'غلط فہمی: خواتین خون کا عطیہ نہیں دے سکتیں، یہ صرف مردوں کے لیے ہے۔',
    mythEn: 'Myth: Women cannot donate blood.',
    factUrdu: 'حقیقت: غلط! اگر خاتون کا وزن ۵۰ کلو اور ہیموگلوبن ۱۲.۵ گرام یا اس سے زائد ہو تو وہ ہر ۴ ماہ بعد باآسانی اور محفوظ طریقے سے خون عطیہ کر سکتی ہیں۔',
    factEn: 'Fact: Healthy women meeting weight and hemoglobin criteria can donate safely every 4 months.',
  },
  {
    id: 4,
    icon: '⚡',
    mythUrdu: 'غلط فہمی: خون دینے کا عمل شدید تکلیف دہ اور لمبا ہوتا ہے۔',
    mythEn: 'Myth: The blood donation procedure is very painful and slow.',
    factUrdu: 'حقیقت: سرنج لگتے وقت صرف چیونٹی کے کاٹنے جتنا ہلکا سا احساس ہوتا ہے۔ اصل خون نکلنے میں محض ۸ سے ۱۰ منٹ لگتے ہیں اور اس دوران کوئی درد نہیں ہوتا۔',
    factEn: 'Fact: Only a slight pin-prick sensation for a split second. The collection takes only 8-10 minutes.',
  },
  {
    id: 5,
    icon: '💊',
    mythUrdu: 'غلط فہمی: بلڈ پریشر یا شوگر کی دوائی لینے والے کبھی خون نہیں دے سکتے۔',
    mythEn: 'Myth: People on BP or diabetes tablets cannot ever donate.',
    factUrdu: 'حقیقت: اگر آپ کا بلڈ پریشر یا شوگر دوائی کے استعمال سے معمول کے مطابق اور قابو میں ہو، تو آپ ڈاکٹر کے مفت چیک اپ کے بعد محفوظ طور پر خون دے سکتے ہیں۔',
    factEn: 'Fact: Controlled BP and diabetes on oral medications are often eligible after on-site physician screening.',
  },
  {
    id: 6,
    icon: '🚶',
    mythUrdu: 'غلط فہمی: خون دینے کے بعد کئی دن بستر پر آرام کرنا پڑتا ہے۔',
    mythEn: 'Myth: Donors must take days of bed rest after donating.',
    factUrdu: 'حقیقت: عطیہ کے بعد صرف ۱۰ منٹ کا آرام اور ایک گلاس جوس کافی ہوتا ہے۔ آپ اسی دن اپنی دفتری یا گھریلو روٹین معمول کے مطابق انجام دے سکتے ہیں۔',
    factEn: 'Fact: A 10-minute rest and fruit juice are sufficient. You can resume regular daily tasks immediately.',
  },
];

interface MythsVsFactsProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const MythsVsFacts: React.FC<MythsVsFactsProps> = ({
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-600/15 text-amber-600 flex items-center justify-center text-xl shrink-0">
            ⚖️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'غلط فہمیاں بمقابلہ سائنسی حقائق' : 'Myths vs Scientific Facts'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-600 text-white">
                {lang === 'ur' ? 'آگاہی و سچائی' : 'Awareness & Truth'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'خون کے عطیہ سے متعلق معاشرتی خوف اور غلط فہمیوں کی سائنسی حقیقت جانیں' : 'Debunking common misconceptions about blood donation'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {MYTHS_FACTS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between ${
                isExpanded
                  ? isDark ? 'bg-slate-900 border-amber-500/40 shadow-md' : 'bg-white border-amber-400 shadow-md'
                  : isDark ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500/10 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-md border border-red-500/20">
                      ❌ {lang === 'ur' ? 'غلط فہمی' : 'Myth'}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-black leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? item.mythUrdu : item.mythEn}
                  </h4>
                </div>
              </div>

              <div className={`mt-3 pt-3 border-t border-dashed ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-500/20">
                    ✅ {lang === 'ur' ? 'سائنسی حقیقت' : 'Scientific Fact'}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {lang === 'ur' ? item.factUrdu : item.factEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
