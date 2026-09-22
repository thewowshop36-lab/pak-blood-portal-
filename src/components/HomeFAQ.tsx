import React, { useState } from 'react';

interface FAQItem {
  id: number;
  questionUrdu: string;
  questionEn: string;
  answerUrdu: string;
  answerEn: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    questionUrdu: 'ایک صحت مند انسان کتنے عرصے بعد دوبارہ خون دے سکتا ہے؟',
    questionEn: 'How often can a healthy person donate blood?',
    answerUrdu: 'ایک صحت مند مرد ہر ۹۰ دن (۳ ماہ) بعد اور خاتون ہر ۱۲۰ دن (۴ ماہ) بعد مکمل خون کا عطیہ دے سکتی ہیں۔ پلیٹلیٹس (Apheresis) کا عطیہ ہر ۱۵ دن بعد بھی دیا جا سکتا ہے۔',
    answerEn: 'A healthy male can donate every 90 days (3 months) and female every 120 days (4 months). Platelets can be donated every 15 days.',
  },
  {
    id: 2,
    questionUrdu: 'کیا پاکستان بلڈ پورٹل پر رجسٹریشن یا رابطہ کرنے کی کوئی فیس ہے؟',
    questionEn: 'Is there any fee or commission on Pakistan Blood Portal?',
    answerUrdu: 'بالکل نہیں! یہ پورٹل ۱۰۰٪ بلا معاوضہ، خالص اللہ کی رضا اور انسانیت کی فلاح کے لیے بنایا گیا ہے۔ خون کا لین دین قانونی اور اخلاقی طور پر بالکل مفت ہے۔',
    answerEn: 'Absolutely zero fee! 100% free community platform dedicated to saving human lives without any charges.',
  },
  {
    id: 3,
    questionUrdu: 'جمع شدہ خون بلڈ بینک میں کتنے دن تک محفوظ رہ سکتا ہے؟',
    questionEn: 'How long can donated blood be stored in blood banks?',
    answerUrdu: 'مخصوص محفوظ درجہ حرارت (2°C سے 6°C) پر پورا خون یا ریڈ سیلز ۳۵ سے ۴۲ دن تک محفوظ رہ سکتے ہیں۔ جبکہ پلیٹلیٹس صرف ۵ دن اور منجمد پلازما ۱ سال تک محفوظ رہ سکتا ہے۔',
    answerEn: 'Whole blood/red cells can be stored for 35 to 42 days at 2-6°C. Platelets last only 5 days, and frozen plasma lasts up to 1 year.',
  },
  {
    id: 4,
    questionUrdu: 'کیا انسانی بلڈ گروپ زندگی میں کبھی تبدیل ہو سکتا ہے؟',
    questionEn: 'Can a person’s blood group ever change over time?',
    answerUrdu: 'نہیں! بلڈ گروپ انسان کے جینیاتی ڈی این اے کا حصہ ہوتا ہے اور پوری زندگی کبھی نہیں بدلتا۔ (سوائے بون میرو ٹرانسپلانٹ جیسے غیر معمولی کیسز کے)۔',
    answerEn: 'No! Blood group is determined genetically and remains permanent throughout life (except in rare bone marrow transplants).',
  },
  {
    id: 5,
    questionUrdu: 'ایمرجنسی میں خون درکار ہو تو کیا طریقہ کار اختیار کریں؟',
    questionEn: 'What is the fastest way to get blood in an emergency?',
    answerUrdu: 'سب سے پہلے پورٹل کے "خون چاہیے" بٹن سے ایمرجنسی درخواست درج کریں، اور ساتھ ہی "ڈونرز لسٹ" میں اپنے شہر اور بلڈ گروپ کو فلٹر کر کے قریبی ڈونرز سے واٹس ایپ یا براہ راست کال پر رابطہ کریں۔',
    answerEn: 'Post an urgent request using "Need Blood", and simultaneously filter the "Donors" tab by your city and group to call available donors directly.',
  },
];

interface HomeFAQProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const HomeFAQ: React.FC<HomeFAQProps> = ({ lang, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/15 text-purple-600 flex items-center justify-center text-xl shrink-0">
            ❓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'اکثر پوچھے جانے والے ضروری سوالات' : 'Frequently Asked Questions (FAQ)'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-600 text-white">
                {lang === 'ur' ? 'رہنمائی' : 'Guidance'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'عطیہ خون، بلڈ بینکنگ اور ہنگامی طریقہ کار کے جوابات' : 'Answers regarding donation rules, blood banking, and emergency protocols'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? isDark ? 'bg-slate-900 border-purple-500/40 shadow-xs' : 'bg-white border-purple-300 shadow-xs'
                  : isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 flex items-center justify-between gap-3 text-start cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-purple-600/10 text-purple-600 flex items-center justify-center text-xs font-black shrink-0">
                    Q
                  </span>
                  <h4 className={`text-xs sm:text-sm font-black leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? faq.questionUrdu : faq.questionEn}
                  </h4>
                </div>
                <span className={`text-base font-bold transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-600' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t border-dashed ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
                }`}>
                  <p className="pe-2">
                    {lang === 'ur' ? faq.answerUrdu : faq.answerEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
