import React, { useState } from 'react';

export interface VideoItem {
  id: string;
  titleUrdu: string;
  titleEn: string;
  descUrdu: string;
  descEn: string;
  duration: string;
  speakerUrdu: string;
  speakerEn: string;
  thumbnail: string;
  youtubeId: string;
  badgeUrdu: string;
  badgeEn: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    titleUrdu: 'خون کا عطیہ کیسے دیا جاتا ہے؟ (مکمل اور محفوظ طریقہ کار)',
    titleEn: 'How Blood Donation Works - Step by Step Walkthrough',
    descUrdu: 'دیکھیں کہ خون دینے کا عمل کتنا آسان، بے درد اور محفوظ ہے، جس میں صرف ۱۰ منٹ لگتے ہیں اور کوئی کمزوری نہیں ہوتی۔',
    descEn: 'Watch how simple, painless and safe donating blood is. Takes only 10 minutes.',
    duration: '04:15',
    speakerUrdu: 'ڈاکٹر طارق محمود (بلڈ ٹرانسفیوژن سپیشلسٹ)',
    speakerEn: 'Dr. Tariq Mehmood (Blood Transfusion Specialist)',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'p3B1wW8v1_4',
    badgeUrdu: 'طبی طریقہ کار',
    badgeEn: 'Medical Guide',
  },
  {
    id: 'v2',
    titleUrdu: 'تھیلیسیمیا کے معصوم بچوں کی پکار — ہر ۱۵ دن بعد خون کی ضرورت',
    titleEn: 'Thalassemia Warriors - The Lifeline of Regular Donations',
    descUrdu: 'پاکستان میں ہر سال ۵۰۰۰ سے زائد بچے تھیلیسیمیا کے ساتھ پیدا ہوتے ہیں۔ جانیے آپ کا ایک عطیہ ان کی زندگی کیسے بچاتا ہے۔',
    descEn: 'Over 5,000 children born each year in Pakistan need fresh blood every 15 days.',
    duration: '05:30',
    speakerUrdu: 'فاطمید فاؤنڈیشن و مریضوں کے والدین',
    speakerEn: 'Fatimid Foundation & Patient Parents',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'b_fLpP6q2Xg',
    badgeUrdu: 'انسانیت کی پکار',
    badgeEn: 'Humanitarian',
  },
  {
    id: 'v3',
    titleUrdu: 'خون دینے کے ۵ بڑے سائنسی اور طبی فوائد (ڈاکٹرز کی تصدیق)',
    titleEn: '5 Science-Backed Health Benefits for Blood Donors',
    descUrdu: 'تحقیق سے ثابت ہے کہ خون دینے سے دل کا دورہ پڑنے کا خطرہ ۸۸ فیصد کم ہو جاتا ہے اور جسم تروتازہ رہتا ہے۔',
    descEn: 'Research shows regular donation reduces heart attack risk by 88% and purifies iron stores.',
    duration: '03:45',
    speakerUrdu: 'پروفیسر ڈاکٹر عائشہ خان (ماہر امراضِ قلب)',
    speakerEn: 'Prof. Dr. Ayesha Khan (Cardiologist)',
    thumbnail: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'KjDqY8gV3j0',
    badgeUrdu: 'صحت و تندرستی',
    badgeEn: 'Health & Science',
  },
  {
    id: 'v4',
    titleUrdu: 'خون دینے سے پہلے اور بعد کی احتیاطی تدابیر اور متوازن خوراک',
    titleEn: 'Pre & Post Donation Nutrition and Essential Tips',
    descUrdu: 'خون دینے سے پہلے بھرپور پانی پئیں، ناشتہ کریں اور خون کے بعد تازہ پھلوں کا جوس اور آرام کریں۔',
    descEn: 'Drink plenty of fluids, have a wholesome breakfast, and relax with fresh juice after donation.',
    duration: '04:00',
    speakerUrdu: 'نیوٹریشن و ریڈ کریسنٹ میڈیکل ٹیم',
    speakerEn: 'Nutrition & Red Crescent Medical Team',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'Wk1p7E3kM90',
    badgeUrdu: 'رہنمائی و خوراک',
    badgeEn: 'Diet & Tips',
  },
];

interface BloodDonationVideosProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const BloodDonationVideos: React.FC<BloodDonationVideosProps> = ({
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-600/15 text-rose-600 flex items-center justify-center text-xl shrink-0">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'ویڈیو آگاہی اور ڈاکٹرز کے معلوماتی کلپس' : 'Video Awareness & Doctor Guidance'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white">
                {lang === 'ur' ? 'ویڈیو گائیڈ' : 'Video Guides'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'ماہرین کی رہنمائی، مریضوں کے تجربات اور طبی معلومات ویڈیو میں دیکھیں' : 'Watch medical experts, patient stories and practical guidelines'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEOS.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideo(item)}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
              <img
                src={item.thumbnail}
                alt={item.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-rose-600 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 group-hover:scale-110 transition-transform">
                  <span className="text-xl ml-0.5 rtl:mr-0.5">▶</span>
                </div>
              </div>

              <div className="absolute top-2.5 right-2.5">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20">
                  {lang === 'ur' ? item.badgeUrdu : item.badgeEn}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5">
                <span className="bg-black/75 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{item.duration}</span>
                </span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className={`text-xs sm:text-sm font-black line-clamp-2 leading-snug mb-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {lang === 'ur' ? item.titleUrdu : item.titleEn}
                </h4>
                <p className={`text-[11px] line-clamp-2 leading-relaxed mb-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {lang === 'ur' ? item.descUrdu : item.descEn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-rose-600">
                <span className="truncate max-w-[80%] text-slate-500 dark:text-slate-400">
                  {lang === 'ur' ? item.speakerUrdu : item.speakerEn}
                </span>
                <span className="shrink-0 flex items-center gap-1">
                  <span>چلائیں</span>
                  <span>▶</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="p-4 border-b flex items-center justify-between border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎬</span>
                <h4 className="text-sm sm:text-base font-black truncate max-w-md">
                  {lang === 'ur' ? activeVideo.titleUrdu : activeVideo.titleEn}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-600 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video bg-black flex flex-col items-center justify-center text-center p-6 text-white">
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-rose-950/80 rounded-2xl p-4 border border-rose-900/40">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-rose-600/50 mb-3 animate-pulse">
                  ▶
                </div>
                <h5 className="text-base sm:text-lg font-black max-w-md mb-2">
                  {lang === 'ur' ? activeVideo.titleUrdu : activeVideo.titleEn}
                </h5>
                <p className="text-xs text-slate-300 max-w-lg mb-4">
                  {lang === 'ur' ? activeVideo.descUrdu : activeVideo.descEn}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      activeVideo.titleUrdu + ' پاکستان بلڈ ڈونیشن'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <span>📺</span>
                    <span>{lang === 'ur' ? 'یوٹیوب پر مکمل ویڈیو دیکھیں' : 'Watch on YouTube'}</span>
                  </a>

                  <button
                    onClick={() => setActiveVideo(null)}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20 transition cursor-pointer"
                  >
                    {lang === 'ur' ? 'بند کریں' : 'Close'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">
                {lang === 'ur' ? `رہنمائی از: ${activeVideo.speakerUrdu}` : `Presented by: ${activeVideo.speakerEn}`}
              </span>
              <span className="text-rose-600 font-black">
                {lang === 'ur' ? 'پاکستان بلڈ پورٹل آگاہی ونگ' : 'Pakistan Blood Portal Awareness Wing'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
