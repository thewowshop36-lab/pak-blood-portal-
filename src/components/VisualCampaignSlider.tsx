import React, { useState } from 'react';

export interface Campaign {
  id: number;
  tagUrdu: string;
  tagEn: string;
  titleUrdu: string;
  titleEn: string;
  shortDescUrdu: string;
  fullDescUrdu: string;
  highlightsUrdu: string[];
  image: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
}

export const CAMPAIGNS_DATA: Campaign[] = [
  {
    id: 1,
    tagUrdu: "زندگی کا تحفہ",
    tagEn: "Gift of Life",
    titleUrdu: "تھیلیسیمیا کے معصوم بچوں کی جان بچائیں",
    titleEn: "Save Innocent Thalassemia Children",
    shortDescUrdu: "پاکستان میں ہر سال ۵ ہزار سے زائد بچے تھیلیسیمیا کے ساتھ پیدا ہوتے ہیں جنہیں ہر ۱۵ دن بعد خون کی اشد ضرورت ہوتی ہے۔",
    fullDescUrdu: "تھیلیسیمیا میجر کے شکار بچوں کا جسم قدرتی طور پر خون نہیں بنا سکتا۔ ان پھول جیسے معصوم بچوں کو زندہ رہنے کے لیے باقاعدگی سے تازہ اور محفوظ خون کی منتقلی درکار ہوتی ہے۔ آپ کا ایک عطیہ ان کے ننھے لبوں پر مسکراہٹ اور ان کے والدین کو جینے کی امید عطا کرتا ہے۔",
    highlightsUrdu: [
      "پاکستان میں ۱ لاکھ سے زائد رجسٹرڈ تھیلیسیمیا مریض بچے",
      "ہر بچے کو ماہانہ ۲ بوتلیں تازہ خون درکار",
      "آپ کا عطیہ ۱۰۰٪ مفت ان معصوم مریضوں تک پہنچتا ہے"
    ],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    badgeBg: "bg-rose-600",
    badgeText: "text-white",
    icon: "🩸"
  },
  {
    id: 2,
    tagUrdu: "صدقہ جاریہ",
    tagEn: "Sadqah Jariyah",
    titleUrdu: "ایک بوتل خون، تین زندگیوں کی حفاظت",
    titleEn: "One Blood Bag Saves 3 Human Lives",
    shortDescUrdu: "جدید ٹیکنالوجی کے ذریعے ایک بوتل خون سے ریڈ سیلز، پلازما اور پلیٹلیٹس الگ کر کے ۳ مختلف مریضوں کی جان بچائی جاتی ہے۔",
    fullDescUrdu: "قرآن پاک میں ارشاد باری تعالیٰ ہے: 'اور جس نے کسی ایک انسان کی جان بچائی گویا اس نے تمام انسانیت کو زندگی بخشی'۔ خون کا عطیہ ایسا صدقہ جاریہ ہے جو آپ کے نہ ہونے کے بعد بھی آپ کے نامہ اعمال میں نیکیوں کا اضافہ کرتا رہتا ہے۔",
    highlightsUrdu: [
      "۱ یونٹ خون سے ۳ مریضوں (ایکسیڈنٹ، کینسر، زچہ و بچہ) کا علاج",
      "اللہ تعالیٰ کی رضا اور بہترین ثوابِ جاریہ",
      "محض ۱۵ منٹ میں عظیم نیکی مکمل"
    ],
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    badgeBg: "bg-emerald-600",
    badgeText: "text-white",
    icon: "🤲"
  },
  {
    id: 3,
    tagUrdu: "طبی فوائد",
    tagEn: "Health Benefits",
    titleUrdu: "خون کا عطیہ آپ کے اپنے دل اور صحت کے لیے تحفہ",
    titleEn: "Medical & Health Benefits for Donor",
    shortDescUrdu: "طبی تحقیق کے مطابق خون دینے سے دل کے امراض کا خطرہ ۸۸٪ کم ہوتا ہے اور جسم میں نیا تروتازہ خون بنتا ہے۔",
    fullDescUrdu: "خون کا عطیہ نہ صرف لینے والے کے لیے زندگی ہے بلکہ دینے والے کی اپنی صحت کے لیے ایک قدرتی دوا ہے۔ خون دینے کے بعد ہڈیوں کا گودا متحرک ہو کر نئے سرخ خلیات تیار کرتا ہے، خون کی روانگی بہتر ہوتی ہے اور جسم میں زائد نقصان دہ آئرن کی مقدار کنٹرول رہتی ہے۔",
    highlightsUrdu: [
      "دل کے دورے (Heart Attack) کے خطرے میں ۸۸ فیصد کمی",
      "جسم میں نیا، تروتازہ اور طاقتور خون بننے کا قدرتی عمل",
      "مفت ہیپاٹائٹس، ایڈز، اور بلڈ ٹیسٹنگ اسکریننگ"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    badgeBg: "bg-sky-600",
    badgeText: "text-white",
    icon: "🩺"
  },
  {
    id: 4,
    tagUrdu: "ہنگامی خدمت",
    tagEn: "Emergency Relief",
    titleUrdu: "روڈ حادثات اور ایمرجنسی آپریشنز میں فوری مدد",
    titleEn: "Emergency Trauma & Accident Relief",
    shortDescUrdu: "سڑک حادثات میں پہلے ۶۰ منٹ (Golden Hour) فیصلہ کن ہوتے ہیں جہاں فوری خون انسانی جان بچاتا ہے۔",
    fullDescUrdu: "ہنگامی حادثات اور بڑے آپریشنز کے دوران مریض کا بہت زیادہ خون بہہ جاتا ہے۔ ایسے وقت میں خون تلاش کرنے کے لیے وقت نہیں ہوتا۔ پاکستان بلڈ پورٹل پر آپ کی رجسٹریشن ایمرجنسی مریضوں کے لیے فرشتہ بن کر سامنے آتی ہے۔",
    highlightsUrdu: [
      "حادثات کے سنہری گھنٹے (Golden Hour) میں فوری خون کی دستیابی",
      "مریض کے لواحقین کو ہسپتالوں کے دھکوں سے نجات",
      "۱ کلک پر قریبی تصدیق شدہ ڈونرز سے فوری رابطہ"
    ],
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80",
    badgeBg: "bg-amber-600",
    badgeText: "text-white",
    icon: "🚑"
  }
];

interface VisualCampaignSliderProps {
  lang: 'ur' | 'en';
  onPledgeClick: () => void;
  theme?: 'light' | 'dark';
}

export const VisualCampaignSlider: React.FC<VisualCampaignSliderProps> = ({
  lang,
  onPledgeClick,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">📸</span>
          <div>
            <h3 className={`text-sm sm:text-base md:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ur' ? 'آگاہی مہمات اور تصویری پاپ اپس' : 'Awareness Campaigns & Visual Stories'}
            </h3>
            <p className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'کسی بھی کارڈ پر کلک کر کے مکمل معلومات اور تصویری تفصیل دیکھیں' : 'Tap any card below to view detailed photo & facts'}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-500/10 text-rose-600 border border-rose-500/20">
          {lang === 'ur' ? '۴ اہم مہمات' : '4 Core Causes'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
        {CAMPAIGNS_DATA.map((camp) => (
          <div
            key={camp.id}
            onClick={() => setSelectedCampaign(camp)}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 transform active:scale-98 flex flex-col justify-between shadow-xs ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-rose-950/20'
                : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-md'
            }`}
          >
            <div className="relative h-28 sm:h-36 overflow-hidden">
              <img
                src={camp.image}
                alt={camp.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-2 right-2 z-10">
                <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full shadow-md ${camp.badgeBg} ${camp.badgeText}`}>
                  <span>{camp.icon}</span>
                  <span>{lang === 'ur' ? camp.tagUrdu : camp.tagEn}</span>
                </span>
              </div>

              <div className="absolute bottom-1.5 left-2 right-2 text-left rtl:text-right">
                <span className="text-[10px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md inline-block">
                  {lang === 'ur' ? '🔍 تفصیل دیکھیں' : '🔍 View Details'}
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className={`text-xs sm:text-sm font-black line-clamp-2 leading-snug mb-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {lang === 'ur' ? camp.titleUrdu : camp.titleEn}
                </h4>
                <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {camp.shortDescUrdu}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-dashed flex items-center justify-between text-[11px] font-bold text-rose-600 border-slate-200 dark:border-slate-800">
                <span>{lang === 'ur' ? 'پاپ اپ کھولیں' : 'Open Popup'}</span>
                <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">←</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border transition-all max-h-[92vh] flex flex-col ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="relative h-44 sm:h-52 shrink-0">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <button
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center font-bold text-base cursor-pointer backdrop-blur-xs transition"
              >
                ✕
              </button>

              <div className="absolute bottom-3 inset-x-4 text-white">
                <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1.5 shadow-md ${selectedCampaign.badgeBg} ${selectedCampaign.badgeText}`}>
                  <span>{selectedCampaign.icon}</span>
                  <span>{lang === 'ur' ? selectedCampaign.tagUrdu : selectedCampaign.tagEn}</span>
                </span>
                <h3 className="text-base sm:text-xl font-black leading-tight text-white drop-shadow-sm">
                  {lang === 'ur' ? selectedCampaign.titleUrdu : selectedCampaign.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedCampaign.fullDescUrdu}
              </p>

              <div className={`p-3.5 sm:p-4 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-rose-50/70 border-rose-200/70'
              }`}>
                <h4 className="text-xs font-black text-rose-600 mb-2 flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>{lang === 'ur' ? 'اہم معلومات اور حقائق' : 'Key Facts & Information'}</span>
                </h4>
                <ul className="space-y-2">
                  {selectedCampaign.highlightsUrdu.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-medium">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-800'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    setSelectedCampaign(null);
                    onPledgeClick();
                  }}
                  className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg shadow-rose-600/30 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>❤️</span>
                  <span>{lang === 'ur' ? 'میں خون کا عطیہ دینے کا عہد کرتا ہوں' : 'Take Blood Donation Pledge'}</span>
                </button>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer border ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  {lang === 'ur' ? 'بند کریں' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
