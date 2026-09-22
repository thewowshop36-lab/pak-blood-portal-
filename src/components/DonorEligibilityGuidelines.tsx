import React, { useState } from 'react';

interface DonorEligibilityGuidelinesProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const DonorEligibilityGuidelines: React.FC<DonorEligibilityGuidelinesProps> = ({
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'eligible' | 'prep' | 'post' | 'deferral'>('eligible');

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-600/15 text-sky-600 flex items-center justify-center text-xl shrink-0">
            📋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'طبی شرائط، احتیاطی تدابیر اور مکمل رہنما اصول' : 'Donor Eligibility & Medical Guidelines'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-600 text-white">
                {lang === 'ur' ? 'عالمی ادارہ صحت (WHO) معیار' : 'WHO Standards'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'خون دینے سے پہلے ان اہم طبی ہدایات اور اصولوں کا مطالعہ فرمائیں' : 'Crucial health instructions before and after donating blood'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        <button
          onClick={() => setActiveTab('eligible')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 border ${
            activeTab === 'eligible'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : isDark ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>✅</span>
          <span>{lang === 'ur' ? 'کون خون دے سکتا ہے؟' : 'Who Can Donate?'}</span>
        </button>

        <button
          onClick={() => setActiveTab('prep')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 border ${
            activeTab === 'prep'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : isDark ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>🥣</span>
          <span>{lang === 'ur' ? 'عطیہ سے پہلے کی تیاری' : 'Pre-Donation Prep'}</span>
        </button>

        <button
          onClick={() => setActiveTab('post')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 border ${
            activeTab === 'post'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : isDark ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>🧃</span>
          <span>{lang === 'ur' ? 'عطیہ کے بعد احتیاطی تدابیر' : 'Post-Donation Care'}</span>
        </button>

        <button
          onClick={() => setActiveTab('deferral')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 border ${
            activeTab === 'deferral'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : isDark ? 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>⏳</span>
          <span>{lang === 'ur' ? 'کون عارضی انتظار کرے؟' : 'Temporary Waiting'}</span>
        </button>
      </div>

      <div className={`p-5 sm:p-6 rounded-3xl border shadow-xs transition-all ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {activeTab === 'eligible' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-200/60'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎂</span>
                <h4 className="text-sm font-black text-emerald-600">
                  {lang === 'ur' ? 'عمر کی حد (Age Limit)' : 'Age Requirement'}
                </h4>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? '۱۸ سال سے ۶۵ سال کی عمر کا کوئی بھی صحت مند مرد یا خاتون خون عطیہ کر سکتے ہیں۔' : 'Any healthy individual between 18 to 65 years of age can safely donate blood.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-200/60'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚖️</span>
                <h4 className="text-sm font-black text-emerald-600">
                  {lang === 'ur' ? 'کم از کم وزن (Minimum Weight)' : 'Weight Requirement'}
                </h4>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'ڈونر کا وزن کم از کم ۵۰ کلوگرام (110 lbs) ہونا ضروری ہے تاکہ بلڈ والیم محفوظ رہے۔' : 'Donor weight must be at least 50 kg (110 lbs) to ensure safe donation volume.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-200/60'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🩸</span>
                <h4 className="text-sm font-black text-emerald-600">
                  {lang === 'ur' ? 'ہیموگلوبن کی سطح (Hemoglobin Hb)' : 'Hemoglobin Level'}
                </h4>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'مردوں کے لیے ۱۳.۰ گرام اور خواتین کے لیے ۱۲.۵ گرام یا اس سے زائد ہیموگلوبن ہونا چاہیے۔' : 'Minimum 13.0 g/dL for males and 12.5 g/dL for females, tested free on-site.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-200/60'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🗓️</span>
                <h4 className="text-sm font-black text-emerald-600">
                  {lang === 'ur' ? 'درمیانی وقفہ (Donation Interval)' : 'Interval Period'}
                </h4>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'پچھلے خون کے عطیہ کو کم از کم ۹۰ دن (۳ ماہ) کا عرصہ گزر چکا ہو۔' : 'At least 90 days (3 months) must have passed since your previous whole blood donation.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'prep' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ۱
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'ناشتہ اور ہلکی متوازن غذا' : 'Healthy Breakfast & Light Meal'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'خالی پیٹ کبھی خون نہ دیں۔ عطیہ سے ۲ تا ۳ گھنٹے قبل روٹی، دلیہ، انڈہ یا پھل کھائیں۔' : 'Never donate on an empty stomach. Eat a balanced meal 2-3 hours prior.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ۲
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'پانی اور سیال مشروبات کی وافر مقدار' : 'Hydration with Plenty of Water'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'خون دینے کے دن کم از کم ۳ سے ۴ گلاس اضافی پانی پئیں تاکہ خون کی روانگی آسان رہے۔' : 'Drink 3-4 extra glasses of water or fresh juice on donation day.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ۳
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'پرسکون رات کی نیند' : 'Sound Sleep'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'عطیہ دینے سے پہلے رات کو کم از کم ۷ سے ۸ گھنٹے کی مکمل اور پرسکون نیند لیں۔' : 'Ensure 7-8 hours of sound sleep before donation.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ۴
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'تمباکو نوشی سے مکمل پرہیز' : 'Avoid Smoking & Caffeine'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'خون دینے سے کم از کم ۲ گھنٹے قبل اور بعد سگریٹ نوشی سے مکمل پرہیز کریں۔' : 'Refrain from smoking or high caffeine drinks at least 2 hours before donation.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? '۱۰ منٹ کا پرسکون آرام' : 'Relax for 10 Minutes'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'خون دینے کے بعد صوفے یا بیڈ پر آرام سے لیٹے رہیں اور جھٹکے سے نہ اٹھیں۔' : 'Stay on the donation couch for 5-10 minutes and avoid sudden standing.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'تازہ جوس اور توانائی کی بحالی' : 'Fresh Juice & Fluids'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'پیش کیا گیا جوس اور بسکٹ ضرور کھائیں تاکہ بلڈ شوگر نارمل سطح پر برقرار رہے۔' : 'Drink the complimentary juice and eat biscuits to stabilize blood glucose.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'بھاری وزن اور سخت ورزش سے اجتناب' : 'No Heavy Lifting for 5 Hours'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'جس بازو سے خون دیا ہو اس سے اگلے ۵ گھنٹوں تک بھاری بوجھ نہ اٹھائیں اور جم نہ جائیں۔' : 'Avoid rigorous exercise or lifting heavy weights with the donation arm for 5 hours.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h5 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'پٹی اور بینڈیج کی دیکھ بھال' : 'Bandage Care'}
                </h5>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'سرنج کے مقام پر لگی پٹی کو کم از کم ۴ گھنٹے بعد اتاریں اور صاف ستھرا رکھیں۔' : 'Keep the bandage clean and dry; remove after 4-6 hours.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deferral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
              <h5 className="text-xs font-black text-amber-600 mb-1 flex items-center gap-1.5">
                <span>💊</span>
                <span>{lang === 'ur' ? 'اینٹی بائیوٹکس یا تیز بخار' : 'Antibiotics or Fever'}</span>
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'اینٹی بائیوٹک کا کورس مکمل ہونے اور بخار ختم ہونے کے ۴۸ گھنٹے بعد خون دے سکتے ہیں۔' : 'Wait 48 hours after completing an antibiotic course and recovery from fever.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
              <h5 className="text-xs font-black text-amber-600 mb-1 flex items-center gap-1.5">
                <span>🦷</span>
                <span>{lang === 'ur' ? 'دانت کا آپریشن یا معمولی سرجری' : 'Dental Surgery'}</span>
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'دانت نکالنے یا معمولی سرجری کے کم از کم ۷ دن بعد خون دینا محفوظ ہے۔' : 'Wait at least 7 days after tooth extraction or minor dental surgery.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
              <h5 className="text-xs font-black text-amber-600 mb-1 flex items-center gap-1.5">
                <span>💉</span>
                <span>{lang === 'ur' ? 'ٹیٹو، حجامہ یا کان چھدوانا' : 'Tattoo or Cupping (Hijama)'}</span>
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'حالیہ ٹیٹو، حجامہ یا چھدوائی کے بعد ۶ ماہ تک انتظار کرنا ضروری ہے۔' : 'Wait 6 months after receiving a tattoo, piercing, or Hijama cupping.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
              <h5 className="text-xs font-black text-amber-600 mb-1 flex items-center gap-1.5">
                <span>🤱</span>
                <span>{lang === 'ur' ? 'حمل اور دودھ پلانے والی مائیں' : 'Pregnancy & Lactation'}</span>
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'حاملہ خواتین اور نومولود کو دودھ پلانے والی مائیں بچے کی پیدائش کے ۶ ماہ بعد خون دیں۔' : 'Wait 6 months after childbirth or until breastfeeding is completed.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
