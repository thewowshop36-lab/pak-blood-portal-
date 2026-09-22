import React, { useState, useEffect } from 'react';

export interface CampaignSlide {
  id: string;
  titleUrdu: string;
  titleEn: string;
  subtitleUrdu: string;
  subtitleEn: string;
  badgeUrdu: string;
  badgeEn: string;
  statUrdu: string;
  statEn: string;
  imageUrl: string;
  category: 'thalassemia' | 'emergency' | 'volunteer' | 'health';
  descriptionUrdu: string;
  descriptionEn: string;
}

const CAMPAIGNS: CampaignSlide[] = [
  {
    id: 'c1',
    titleUrdu: 'ایک خون کا عطیہ، تین قیمتی زندگیاں',
    titleEn: 'One Blood Donation, Three Precious Lives Saved',
    subtitleUrdu: 'آپ کے خون کا ایک بیگ ۳ اجزاء میں تقسیم ہو کر ۳ مختلف مریضوں کی جان بچاتا ہے۔',
    subtitleEn: 'A single donation provides Red Blood Cells, Plasma, and Platelets.',
    badgeUrdu: 'زندگی بچائیں',
    badgeEn: 'Save Lives',
    statUrdu: '۱ بیگ = ۳ زندگیاں',
    statEn: '1 Bag = 3 Lives',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
    category: 'emergency',
    descriptionUrdu: 'جب آپ خون دیتے ہیں تو لیبارٹری میں اسے ریڈ سیلز، پلازما اور پلیٹلیٹس میں الگ کیا جاتا ہے۔ حادثے کے شکار، کینسر اور تھیلیسیمیا کے مریض آپ کے اسی خون سے صحت یاب ہوتے ہیں۔',
    descriptionEn: 'Your blood is separated into three essential components: packed red cells for trauma patients, platelets for cancer chemotherapy, and plasma for burn victims.'
  },
  {
    id: 'c2',
    titleUrdu: 'تھیلیسیمیا کے معصوم بچوں کی مسکراہٹ بنیں',
    titleEn: 'Be a Reason to Smile for Children with Thalassemia',
    subtitleUrdu: 'پاکستان میں ہر سال ۵ ہزار سے زائد بچے تھیلیسیمیا میجر کے ساتھ جنم لیتے ہیں جنہیں ہر ۱۵ دن بعد تازہ خون درکار ہے۔',
    subtitleEn: 'Over 5,000 children born each year in Pakistan require regular transfusions every 15 days.',
    badgeUrdu: 'تھیلیسیمیا سپورٹ',
    badgeEn: 'Thalassemia Care',
    statUrdu: 'ہر ۱۵ دن بعد ضرورت',
    statEn: 'Needed every 15 Days',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    category: 'thalassemia',
    descriptionUrdu: 'تھیلیسیمیا کے ننھے فرشتے اپنی زندگی کے لیے آپ کے خون کے منتظر رہتے ہیں۔ مستقل ڈونر بن کر ان بچوں کے چہروں پر زندگی کی بہار لائیں۔',
    descriptionEn: 'Thalassemia major patients cannot produce healthy hemoglobin on their own. Regular voluntary donors are their true lifesavers.'
  },
  {
    id: 'c3',
    titleUrdu: 'خون دینے کے حیرت انگیز طبی و سائنسی فوائد',
    titleEn: 'Health Benefits of Regular Blood Donation',
    subtitleUrdu: 'تحقیق سے ثابت ہے کہ باقاعدہ خون عطیہ کرنے سے دل کے دورے کا خطرہ ۸۸٪ تک کم ہو جاتا ہے اور نیا خون بنتا ہے۔',
    subtitleEn: 'Scientific research confirms regular donation reduces heart disease risk by up to 88%.',
    badgeUrdu: 'صحت مند جسم',
    badgeEn: 'Health Wellness',
    statUrdu: '۸۸٪ کم خطرہ',
    statEn: '88% Lower Heart Risk',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    category: 'health',
    descriptionUrdu: 'خون دینے سے جسم میں اضافی آئرن کی سطح متوازن رہتی ہے، خون کی گردش بہتر ہوتی ہے اور ہڈیوں کا گودا چست ہو کر تازہ اور توانا ریڈ سیلز پیدا کرتا ہے۔',
    descriptionEn: 'Donating balances iron stores, activates the bone marrow to produce fresh energetic red blood cells, and burns up to 650 calories per donation.'
  },
  {
    id: 'c4',
    titleUrdu: 'نوجوانوں کا عزم: ہر کالج اور یونیورسٹی میں بلڈ ڈرائیو',
    titleEn: 'Youth for Humanity: Nationwide Blood Drives',
    subtitleUrdu: 'پاکستان کے باہمت طلبہ اور نوجوان انسانیت کے سفیر بن کر روزانہ سینکڑوں کیمپس منعقد کر رہے ہیں۔',
    subtitleEn: 'Passionate Pakistani students and volunteers organizing voluntary mobile donation camps.',
    badgeUrdu: 'قومی رضاکار',
    badgeEn: 'National Volunteers',
    statUrdu: '۱۰۰٪ بلا معاوضہ',
    statEn: '100% Free & Pure',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
    category: 'volunteer',
    descriptionUrdu: 'خانیوال سے لے کر کراچی اور خیبر تک نوجوانوں کے فلاحی نیٹ ورکس ضرورت مند مریضوں تک خون پہنچانے کے لیے شب و روز کوشاں ہیں۔ آپ بھی اس کارِ خیر میں شامل ہوں۔',
    descriptionEn: 'From Khanewal to Karachi and Khyber, student networks work day and night to connect donors with emergency wards.'
  },
  {
    id: 'c5',
    titleUrdu: 'O نیگیٹو (O-): نایاب اور ہنگامی ایمرجنسی بلڈ گروپ',
    titleEn: 'O- Negative: The Rare Emergency Universal Lifeline',
    subtitleUrdu: 'او نیگیٹو خون دنیا کے کسی بھی مریض کو ایمرجنسی میں بغیر انتظار لگایا جا سکتا ہے مگر یہ بہت نایاب ہے۔',
    subtitleEn: 'Universal donor group that can be transfused in acute trauma before crossmatch.',
    badgeUrdu: 'نایاب بلڈ گروپ',
    badgeEn: 'Rare Group Alert',
    statUrdu: 'صرف ۲٪ آبادی',
    statEn: 'Only 2% of People',
    imageUrl: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&w=1200&q=80',
    category: 'emergency',
    descriptionUrdu: 'اگر آپ کا بلڈ گروپ O Negative ہے تو آپ کسی بھی شدید حادثے کے شکار انسان کے لیے آخری امید ہیں۔ اپنی رجسٹریشن لازمی مکمل رکھیں۔',
    descriptionEn: 'In critical trauma when blood bank cannot wait for cross-matching, O- is the single life saver transfused instantly.'
  },
  {
    id: 'c6',
    titleUrdu: 'کینسر کے مریضوں کے لیے پلیٹلیٹس (Mega Unit) کا عطیہ',
    titleEn: 'Platelets Donation for Cancer & Chemotherapy Patients',
    subtitleUrdu: 'کینسر کے مریضوں اور ڈینگی کی وباء کے دوران وائٹل پلیٹلیٹس کی اشد ضرورت ہوتی ہے جو ہر ۱۵ دن بعد دیے جا سکتے ہیں۔',
    subtitleEn: 'Single Donor Platelets (SDP) sustain children and adults battling leukemia and dengue.',
    badgeUrdu: 'پلیٹلیٹس اپیل',
    badgeEn: 'Platelets Appeal',
    statUrdu: 'ہر ۱۵ دن بعد عطیہ',
    statEn: 'Every 15 Days',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    category: 'health',
    descriptionUrdu: 'پلیٹلیٹس کا عطیہ ایفرسس (Apheresis) مشین کے ذریعے لیا جاتا ہے جس میں صرف پلیٹلیٹس الگ کر کے باقی خون ڈونر کے جسم میں واپس لوٹا دیا جاتا ہے۔',
    descriptionEn: 'Single donor platelet apheresis machine takes only the clotting cells and returns other components back to the donor.'
  },
  {
    id: 'c7',
    titleUrdu: 'محفوظ بلڈ ٹرانسفیوژن اور ۵ لازمی سکریننگ ٹیسٹس',
    titleEn: 'Safe Blood Transfusion & 5 Mandatory Screenings',
    subtitleUrdu: 'پورٹل پر جمع ہونے والا خون ہیپاٹائٹس بی، سی، ایچ آئی وی، ملیریا اور سیفلس سے ۱۰۰٪ پاک سکرین کیا جاتا ہے۔',
    subtitleEn: 'Rigorous nucleic acid and ELISA testing guarantees zero transmission of infections.',
    badgeUrdu: 'محفوظ خون',
    badgeEn: '100% Screened',
    statUrdu: '۵ سکریننگ ٹیسٹ',
    statEn: '5 Viral Screenings',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    category: 'health',
    descriptionUrdu: 'جدید آٹومیٹڈ مشینوں کے ذریعے ہر یونٹ خون کی تصدیق کی جاتی ہے تاکہ وصول کرنے والے مریض کو محفوظ ترین خون فراہم ہو۔',
    descriptionEn: 'Every donated unit undergoes strict screening protocols for Hepatitis B, C, HIV 1 & 2, Syphilis, and Malaria before releasing.'
  },
  {
    id: 'c8',
    titleUrdu: 'خواتین ڈونرز کا کردار: ہمت، شفقت اور زندگی کی ضمانت',
    titleEn: 'Women Donors of Pakistan: Courage, Care & Hope',
    subtitleUrdu: 'صحت مند خواتین ہر ۴ ماہ بعد محفوظ طریقے سے خون دے کر ہزاروں ماؤں اور بچوں کی جان بچا رہی ہیں۔',
    subtitleEn: 'Empowering female donors to step forward with confidence and clinical guidance.',
    badgeUrdu: 'خواتین کا فخر',
    badgeEn: 'Women Heroes',
    statUrdu: 'ہر ۴ ماہ بعد',
    statEn: 'Every 4 Months',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    category: 'volunteer',
    descriptionUrdu: 'اگر آپ کا وزن ۵۰ کلوگرام اور ہیموگلوبن ۱۲ سے زیادہ ہے، تو آپ بلا خوف خون کا عطیہ دے سکتی ہیں۔ خواتین ڈونرز قوم کا عظیم سرمایہ ہیں۔',
    descriptionEn: 'Meeting basic weight and Hb levels, women can safely donate whole blood every 120 days, disproving outdated misconceptions.'
  },
  {
    id: 'c9',
    titleUrdu: 'ضلع خانیوال و جنوبی پنجاب: مقامی ڈونرز کا فلاحی نیٹ ورک',
    titleEn: 'Khanewal & South Punjab Local Community Response',
    subtitleUrdu: 'سول ہسپتال، ڈسٹرکٹ ہسپتال اور نجی کلینکوں میں فوری خون پہنچانے والا باہمی پلیٹ فارم۔',
    subtitleEn: 'Rapid local response connecting donors with District Headquarters Hospital Khanewal.',
    badgeUrdu: 'مقامی نیٹ ورک',
    badgeEn: 'Khanewal Chapter',
    statUrdu: 'ضلعی سروس',
    statEn: 'District Wide',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    category: 'volunteer',
    descriptionUrdu: 'خانیوال، کبیر والا، میاں چنوں اور جہانیاں کے قریبی علاقوں میں ایمرجنسی کال پر رضاکار ڈونرز فوراً ہسپتال پہنچ کر خون کا عطیہ دیتے ہیں۔',
    descriptionEn: 'Coordinating emergency blood appeals across Khanewal, Kabirwala, Mian Channu, and Jahanian tehsils for rapid bedside delivery.'
  },
  {
    id: 'c10',
    titleUrdu: 'عطیہ خون کے بعد کی دیکھ بھال اور متوازن غذا',
    titleEn: 'Post-Donation Care: Refresh, Hydrate & Re-energize',
    subtitleUrdu: 'خون دینے کے فوراً بعد تازہ جوس، پانی کا وافر استعمال اور پروٹین سے بھرپور خوراک لیں۔',
    subtitleEn: 'Essential post-donation nutrition guidelines to replenish fluids and energy rapidly.',
    badgeUrdu: 'رہنمائی و خوراک',
    badgeEn: 'Nutrition Guide',
    statUrdu: 'فوری بحالی',
    statEn: 'Quick Recovery',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    category: 'health',
    descriptionUrdu: 'عطیہ کے بعد ۱۰ منٹ کا پرسکون آرام، تازہ پھلوں کا جوس، پالک، انڈا اور دالیں استعمال کریں۔ جسم اگلے ۲۴ گھنٹوں میں نیا خون بنا لیتا ہے۔',
    descriptionEn: 'Drink extra fluids over the next 24 hours, enjoy iron-rich foods, and rest 10 minutes post-donation to keep energy levels at peak.'
  },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignSlide | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'gallery'>('slider');

  const isDark = theme === 'dark';

  useEffect(() => {
    if (isPaused || viewMode === 'gallery') return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, viewMode]);

  const current = CAMPAIGNS[currentIndex];

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-600/15 text-rose-600 flex items-center justify-center text-xl shrink-0">
            🩸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'قومی آگاہی و فلاحی مہمات' : 'National Awareness Campaigns'}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white">
                {lang === 'ur' ? '۱۰ مہمات' : '10 Campaigns'}
              </span>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lang === 'ur' ? 'زندگی بچانے کی ترغیب، تصویری کہانیاں اور سائنسی فوائد' : 'Inspirational stories, clinical evidence, and community awareness'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              viewMode === 'slider'
                ? 'bg-white dark:bg-slate-800 text-rose-600 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>🖼️</span>
            <span>{lang === 'ur' ? 'سلائیڈر' : 'Slider'}</span>
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              viewMode === 'gallery'
                ? 'bg-white dark:bg-slate-800 text-rose-600 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>📑</span>
            <span>{lang === 'ur' ? 'تمام فوٹوز' : 'All Photos'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'slider' ? (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src={current.imageUrl}
              alt={current.titleUrdu}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-700 transform scale-100 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent sm:bg-gradient-to-r sm:from-slate-950/95 sm:via-slate-950/75 sm:to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="bg-rose-600/95 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span>★</span>
                <span>{lang === 'ur' ? current.badgeUrdu : current.badgeEn}</span>
              </span>

              <span className="bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                {lang === 'ur' ? current.statUrdu : current.statEn}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xl z-10 text-white space-y-2.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                <span>✨ مہم نمبر {currentIndex + 1} از {CAMPAIGNS.length}</span>
              </div>

              <h2 className="text-lg sm:text-2xl md:text-3xl font-black leading-tight tracking-tight drop-shadow-md">
                {lang === 'ur' ? current.titleUrdu : current.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow-sm font-medium">
                {lang === 'ur' ? current.subtitleUrdu : current.subtitleEn}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setSelectedCampaign(current)}
                  className="bg-white/95 hover:bg-white text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span>📖</span>
                  <span>{lang === 'ur' ? 'تفصیلات اور رہنمائی' : 'Read Details'}</span>
                </button>

                <button
                  onClick={onPledgeClick}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-black transition shadow-md hover:shadow-rose-600/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🩸</span>
                  <span>{lang === 'ur' ? 'خون کا عطیہ دیں' : 'Donate Blood'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 z-10 cursor-pointer text-sm"
              title="Previous"
            >
              ❮
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 z-10 cursor-pointer text-sm"
              title="Next"
            >
              ❯
            </button>
          </div>

          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[70%] no-scrollbar">
              {CAMPAIGNS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer shrink-0 ${
                    idx === currentIndex
                      ? 'w-7 bg-rose-600'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  title={c.titleUrdu}
                />
              ))}
            </div>

            <div className="text-[11px] font-black text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{CAMPAIGNS.length}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAMPAIGNS.map((c, idx) => (
            <div
              key={c.id}
              onClick={() => setSelectedCampaign(c)}
              className={`rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-rose-300'
              }`}
            >
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={c.imageUrl}
                  alt={c.titleUrdu}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                    {lang === 'ur' ? c.badgeUrdu : c.badgeEn}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="bg-black/75 backdrop-blur-md text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {lang === 'ur' ? c.statUrdu : c.statEn}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className={`text-sm font-black line-clamp-2 leading-snug mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? c.titleUrdu : c.titleEn}
                  </h4>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'ur' ? c.subtitleUrdu : c.subtitleEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-black text-rose-600">
                  <span>{lang === 'ur' ? 'مکمل تفصیل پڑھیں' : 'Read Full Story'}</span>
                  <span>←</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedCampaign.imageUrl}
                alt={selectedCampaign.titleUrdu}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-rose-600 flex items-center justify-center font-bold text-sm cursor-pointer transition"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-rose-600 text-[10px] font-black px-2.5 py-1 rounded-full mb-2 inline-block">
                  {lang === 'ur' ? selectedCampaign.badgeUrdu : selectedCampaign.badgeEn}
                </span>
                <h3 className="text-base sm:text-xl font-black leading-tight">
                  {lang === 'ur' ? selectedCampaign.titleUrdu : selectedCampaign.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4 max-h-[55vh] overflow-y-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {lang === 'ur' ? selectedCampaign.statUrdu : selectedCampaign.statEn}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {lang === 'ur' ? 'طبی تصدیق شدہ آگاہی' : 'Clinically Verified'}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-rose-600">
                  {lang === 'ur' ? 'خلاصہ و بنیادی پیغام:' : 'Key Message:'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                  {lang === 'ur' ? selectedCampaign.subtitleUrdu : selectedCampaign.subtitleEn}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400">
                  {lang === 'ur' ? 'تفصیلی طبی و فلاحی معلومات:' : 'Detailed Health & Community Insights:'}
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {lang === 'ur' ? selectedCampaign.descriptionUrdu : selectedCampaign.descriptionEn}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => {
                    setSelectedCampaign(null);
                    onPledgeClick();
                  }}
                  className="w-full sm:flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-2xl text-xs font-black shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🩸</span>
                  <span>{lang === 'ur' ? 'ابھی بطور ڈونر رجسٹر ہوں' : 'Register as Blood Donor'}</span>
                </button>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
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
