import React, { useState } from 'react';

export interface CampPhoto {
  id: string;
  titleUrdu: string;
  titleEn: string;
  cityUrdu: string;
  cityEn: string;
  dateUrdu: string;
  dateEn: string;
  units: number;
  imageUrl: string;
  category: 'camp' | 'mobile' | 'hospital' | 'award';
}

const CAMP_PHOTOS: CampPhoto[] = [
  {
    id: 'cp1',
    titleUrdu: 'پنجاب یونیورسٹی لاہور — سالانہ میگا بلڈ ڈرائیو کیمپ',
    titleEn: 'Punjab University Lahore Mega Blood Drive',
    cityUrdu: 'لاہور',
    cityEn: 'Lahore',
    dateUrdu: 'حال ہی میں منعقدہ',
    dateEn: 'Recent Camp',
    units: 245,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    category: 'camp',
  },
  {
    id: 'cp2',
    titleUrdu: 'موبائل بلڈ ڈونیشن وین — کلفٹن و صدر کراچی',
    titleEn: 'Mobile Blood Donation Van - Clifton Karachi',
    cityUrdu: 'کراچی',
    cityEn: 'Karachi',
    dateUrdu: 'ہفتہ وار کیمپ',
    dateEn: 'Weekly Drive',
    units: 180,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    category: 'mobile',
  },
  {
    id: 'cp3',
    titleUrdu: 'نمل یونیورسٹی اسلام آباد — طلبہ کا رضاکارانہ جذبہ',
    titleEn: 'NUML University Islamabad Youth Blood Camp',
    cityUrdu: 'اسلام آباد',
    cityEn: 'Islamabad',
    dateUrdu: 'یوتھ فیسٹیول کیمپ',
    dateEn: 'Youth Fest Drive',
    units: 310,
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    category: 'camp',
  },
  {
    id: 'cp4',
    titleUrdu: 'نشتر ہسپتال ملتان — تھیلیسیمیا وارڈ کے بچوں کے لیے ایمرجنسی کیمپ',
    titleEn: 'Nishtar Hospital Multan Thalassemia Drive',
    cityUrdu: 'ملتان',
    cityEn: 'Multan',
    dateUrdu: 'ایمرجنسی اپیل',
    dateEn: 'Emergency Appeal',
    units: 165,
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    category: 'hospital',
  },
  {
    id: 'cp5',
    titleUrdu: 'سول ہسپتال خانیوال — ضلعی سطح کا بلڈ ڈونیشن کیمپ',
    titleEn: 'District Blood Camp Khanewal',
    cityUrdu: 'خانیوال',
    cityEn: 'Khanewal',
    dateUrdu: 'ضلعی فلاحی مہم',
    dateEn: 'District Relief',
    units: 120,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    category: 'camp',
  },
  {
    id: 'cp6',
    titleUrdu: 'لیڈی ریڈنگ ہسپتال پشاور — ٹراما و حادثات ریلیف کیمپ',
    titleEn: 'Lady Reading Hospital Peshawar Trauma Relief',
    cityUrdu: 'پشاور',
    cityEn: 'Peshawar',
    dateUrdu: 'ٹراما ایمرجنسی',
    dateEn: 'Trauma Emergency',
    units: 215,
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
    category: 'hospital',
  },
  {
    id: 'cp7',
    titleUrdu: 'بولان میڈیکل کالج کوئٹہ — بلوچستان بلڈ ڈرائیو نیٹ ورک',
    titleEn: 'Bolan Medical College Quetta Blood Camp',
    cityUrdu: 'کوئٹہ',
    cityEn: 'Quetta',
    dateUrdu: 'بلوچستان کیمپ',
    dateEn: 'Balochistan Camp',
    units: 140,
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
    category: 'camp',
  },
  {
    id: 'cp8',
    titleUrdu: 'پاکستان ریڈ کریسنٹ ہیڈ کوارٹرز — ہیروز کو اعزازی اسناد کی تقسیم',
    titleEn: 'Red Crescent Life Saver Certificate Honors',
    cityUrdu: 'راولپنڈی',
    cityEn: 'Rawalpindi',
    dateUrdu: 'اعزازی تقریب',
    dateEn: 'Honor Ceremony',
    units: 500,
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    category: 'award',
  },
];

interface CampsPhotoGalleryProps {
  lang: 'ur' | 'en';
  theme?: 'light' | 'dark';
}

export const CampsPhotoGallery: React.FC<CampsPhotoGalleryProps> = ({
  lang,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [selectedPhoto, setSelectedPhoto] = useState<CampPhoto | null>(null);
  const [filter, setFilter] = useState<'all' | 'camp' | 'mobile' | 'hospital' | 'award'>('all');

  const filtered = filter === 'all' ? CAMP_PHOTOS : CAMP_PHOTOS.filter((c) => c.category === filter);

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600/15 text-emerald-600 flex items-center justify-center text-xl shrink-0">
            📸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'پاکستان بھر کے بلڈ کیمپس اور ڈرائیوز کی فوٹو گیلری' : 'Pakistan Blood Camps & Drives Photo Gallery'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white">
                {lang === 'ur' ? '۸ تصویری جھلکیاں' : '8 Camp Photos'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'لاہور، کراچی، اسلام آباد، ملتان، پشاور، کوئٹہ اور خانیوال کے لائیو کیمپس' : 'Real blood donation camps, mobile buses and volunteer ceremonies'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
              filter === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'ur' ? 'تمام' : 'All'}
          </button>
          <button
            onClick={() => setFilter('camp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
              filter === 'camp'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'ur' ? 'کیمپس' : 'Camps'}
          </button>
          <button
            onClick={() => setFilter('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
              filter === 'mobile'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'ur' ? 'موبائل وینز' : 'Mobile Vans'}
          </button>
          <button
            onClick={() => setFilter('hospital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
              filter === 'hospital'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'ur' ? 'ہسپتال وارڈز' : 'Hospitals'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-300 shadow-xs hover:shadow-lg ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute top-2.5 right-2.5">
                <span className="bg-black/70 backdrop-blur-md text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/30">
                  📍 {lang === 'ur' ? item.cityUrdu : item.cityEn}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5">
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                  <span>🩸</span>
                  <span>{item.units} {lang === 'ur' ? 'یونٹس' : 'Units'}</span>
                </span>
              </div>
            </div>

            <div className="p-3">
              <h4 className={`text-xs font-black line-clamp-1 mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? item.titleUrdu : item.titleEn}
              </h4>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {lang === 'ur' ? item.dateUrdu : item.dateEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="relative aspect-4/3 bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white hover:bg-rose-600 flex items-center justify-center font-bold text-sm cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  📍 {lang === 'ur' ? selectedPhoto.cityUrdu : selectedPhoto.cityEn}
                </span>
                <span className="text-xs font-black text-rose-600">
                  🩸 {selectedPhoto.units} {lang === 'ur' ? 'یونٹ خون جمع ہوا' : 'Units Collected'}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-black mb-2">
                {lang === 'ur' ? selectedPhoto.titleUrdu : selectedPhoto.titleEn}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {lang === 'ur'
                  ? 'یہ کیمپ پاکستان بلڈ پورٹل کے تصدیق شدہ والنٹیرز اور متعلقہ ہسپتال بلڈ بینک کے تعاون سے لگایا گیا۔ تمام ڈونرز کا شکریہ۔'
                  : 'Organized in collaboration with verified volunteers and hospital blood banks. Heartfelt gratitude to all donors.'}
              </p>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                {lang === 'ur' ? 'بند کریں' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
