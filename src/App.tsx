import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './lib/supabase';
import { Donor, BloodRequest } from './types';
import { pakistanProvinces, nearbyCities, bloodCompatibility } from './data/pakistanLocations';
import { BloodGroupGrid } from './components/BloodGroupGrid';
import { DonorCard } from './components/DonorCard';
import { EmergencyBanner } from './components/EmergencyBanner';
import { RegisterDonorModal } from './components/RegisterDonorModal';
import { PostRequestModal } from './components/PostRequestModal';
import { BloodGuideModal } from './components/BloodGuideModal';
import { HelplinesModal } from './components/HelplinesModal';
import { VisualCampaignSlider } from './components/VisualCampaignSlider';
import { CommunityPollVote } from './components/CommunityPollVote';
import { BloodDonationVideos } from './components/BloodDonationVideos';
import { BloodDonationSteps } from './components/BloodDonationSteps';
import { DonorEligibilityGuidelines } from './components/DonorEligibilityGuidelines';
import { MythsVsFacts } from './components/MythsVsFacts';
import { CampsPhotoGallery } from './components/CampsPhotoGallery';
import { HomeFAQ } from './components/HomeFAQ';

export type TabType = 'home' | 'donors' | 'requests' | 'helplines' | 'guide';

const helplinesList = [
  { nameUrdu: "ریسکیو 1122", nameEn: "Rescue 1122 Emergency", phone: "1122", descUrdu: "طبی ایمرجنسی، فرسٹ ایڈ اور ایمبولینس سروس", icon: "🚑" },
  { nameUrdu: "ایدھی فاؤنڈیشن", nameEn: "Edhi Foundation Ambulance", phone: "115", descUrdu: "ملک گیر ہنگامی ایمبولینس اور ریلیف نیٹ ورک", icon: "🚨" },
  { nameUrdu: "فاطمید فاؤنڈیشن", nameEn: "Fatimid Foundation Blood Bank", phone: "02132225284", descUrdu: "تھیلیسیمیا اور ہیموفیلیا کے مریضوں کے لیے بلڈ سنٹر", icon: "🩸" },
  { nameUrdu: "سندس فاؤنڈیشن", nameEn: "Sundas Foundation", phone: "04237422141", descUrdu: "لاہور، گوجرانوالہ، سیالکوٹ، فیصل آباد سنٹرز", icon: "🏥" },
  { nameUrdu: "انڈس ہسپتال بلڈ سنٹر", nameEn: "Indus Hospital Blood Services", phone: "021111111880", descUrdu: "۱۰۰ فیصد محفوظ، مفت اور سکرین شدہ خون کی فراہمی", icon: "💉" },
  { nameUrdu: "ہلال احمر پاکستان", nameEn: "Pakistan Red Crescent", phone: "0519250404", descUrdu: "نیشنل بلڈ ڈونر اور ایمرجنسی رسپانس پروگرام", icon: "⛑️" },
];

export default function App() {
  const [lang, setLang] = useState<'ur' | 'en'>('ur');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('portal_theme') as 'light' | 'dark') || 'light';
  });
  const isDark = theme === 'dark';

  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('portal_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostReqModal, setShowPostReqModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showHelplinesModal, setShowHelplinesModal] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>('home');

  const [selectedProvince, setSelectedProvince] = useState('پنجاب (Punjab)');
  const [selectedCity, setSelectedCity] = useState('خانیوال (Khanewal)');
  const [selectedBlood, setSelectedBlood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [guideSelectedBlood, setGuideSelectedBlood] = useState('O+');

  const fetchPortalData = async () => {
    setLoading(true);
    try {
      const { data: dData, error: dError } = await supabase
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false });

      if (!dError && dData) {
        setDonors(dData);
      }

      const { data: rData, error: rError } = await supabase
        .from('blood_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!rError && rData) {
        setRequests(rData);
      }
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortalData();

    const donorsSub = supabase
      .channel('public:donors')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donors' }, () => {
        fetchPortalData();
      })
      .subscribe();

    const requestsSub = supabase
      .channel('public:blood_requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blood_requests' }, () => {
        fetchPortalData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(donorsSub);
      supabase.removeChannel(requestsSub);
    };
  }, []);

  const currentCitiesInProvince = useMemo(() => {
    return pakistanProvinces[selectedProvince] || [];
  }, [selectedProvince]);

  const filteredCurrentCityDonors = useMemo(() => {
    return donors.filter((d) => {
      const matchCity = d.city === selectedCity;
      const matchBlood = selectedBlood ? (d.bloodgroup || d.bloodGroup || d.blood_group) === selectedBlood : true;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch =
          (d.name || '').toLowerCase().includes(q) ||
          (d.tehsil || '').toLowerCase().includes(q) ||
          (d.area || '').toLowerCase().includes(q) ||
          (d.bloodgroup || d.bloodGroup || d.blood_group || '').toLowerCase().includes(q);
      }
      return matchCity && matchBlood && matchSearch;
    });
  }, [donors, selectedCity, selectedBlood, searchQuery]);

  const nearbyDonorsList = useMemo(() => {
    const list = nearbyCities[selectedCity] || [];
    return donors.filter((d) => {
      const isNearby = list.includes(d.city);
      const matchBlood = selectedBlood ? (d.bloodgroup || d.bloodGroup || d.blood_group) === selectedBlood : true;
      return isNearby && matchBlood;
    });
  }, [donors, selectedCity, selectedBlood]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchBlood = selectedBlood ? r.blood_group === selectedBlood : true;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch =
          (r.patient_name || '').toLowerCase().includes(q) ||
          (r.hospital || '').toLowerCase().includes(q) ||
          (r.city || '').toLowerCase().includes(q) ||
          (r.blood_group || '').toLowerCase().includes(q);
      }
      return matchBlood && matchSearch;
    });
  }, [requests, selectedBlood, searchQuery]);

  const guideInfo = bloodCompatibility[guideSelectedBlood] || bloodCompatibility['O+'] || { give: [], receive: [] };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-rose-600 selection:text-white transition-colors duration-200 overflow-x-hidden max-w-full pt-[115px] sm:pt-[98px] pb-24 sm:pb-28 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="fixed top-0 inset-x-0 z-50 shadow-md">
        <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white text-[11px] sm:text-xs py-1 px-3 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-black text-amber-300">
                {lang === 'ur' ? '🚨 ایمرجنسی بلڈ کال:' : '🚨 Emergency Call:'}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-bold">
              <a href="tel:1122" className="hover:underline bg-white/15 px-2 py-0.5 rounded-md flex items-center gap-1 transition">
                <span>🚑</span>
                <span>{lang === 'ur' ? 'ریسکیو 1122' : 'Rescue 1122'}</span>
              </a>
              <a href="tel:115" className="hover:underline bg-white/15 px-2 py-0.5 rounded-md flex items-center gap-1 transition">
                <span>🚨</span>
                <span>{lang === 'ur' ? 'ایدھی 115' : 'Edhi 115'}</span>
              </a>
              <button
                onClick={() => setActiveTab('helplines')}
                className="text-amber-200 hover:text-white underline cursor-pointer shrink-0 font-bold"
              >
                {lang === 'ur' ? 'تمام ہیلپ لائنز' : 'All Helplines'}
              </button>
            </div>
          </div>
        </div>

        <header className={`backdrop-blur-md border-b shadow-xs transition-colors ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
            <div
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-700 to-red-900 flex items-center justify-center shadow-md shadow-rose-600/30 group-hover:scale-105 transition shrink-0">
                <span className="text-lg sm:text-xl animate-pulse">🩸</span>
              </div>

              <div className="leading-tight">
                <h1 className={`text-sm sm:text-base md:text-lg font-black tracking-tight flex items-center gap-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>{lang === 'ur' ? 'پاکستان بلڈ پورٹل' : 'Pakistan Blood Portal'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                </h1>
                <p className="text-[10px] sm:text-[11px] text-rose-600 font-bold hidden xs:block">
                  {lang === 'ur' ? 'قومی لائیو بلڈ ڈونر نیٹ ورک' : 'Live National Blood Donor Network'}
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'home'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <span>🏠</span>
                <span>{lang === 'ur' ? 'ہوم' : 'Home'}</span>
              </button>

              <button
                onClick={() => setActiveTab('donors')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'donors'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <span>🩸</span>
                <span>{lang === 'ur' ? 'ڈونرز لسٹ' : 'Donors'}</span>
              </button>

              <button
                onClick={() => setActiveTab('requests')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'requests'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <span>🚨</span>
                <span>{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
              </button>

              <button
                onClick={() => setActiveTab('helplines')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'helplines'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <span>📞</span>
                <span>{lang === 'ur' ? 'ایمرجنسی کالز' : 'Helplines'}</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <span>📖</span>
                <span>{lang === 'ur' ? 'بلڈ گائیڈ' : 'Guide'}</span>
              </button>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('helplines')}
                className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-xl text-xs font-black shadow-xs flex items-center gap-1 cursor-pointer transition active:scale-95 shrink-0"
              >
                <span className="animate-bounce">📞</span>
                <span className="font-extrabold text-[11px] sm:text-xs">{lang === 'ur' ? 'ایمرجنسی' : '1122'}</span>
              </button>

              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 border shadow-2xs shrink-0 ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                }`}
              >
                <span>{isDark ? '☀️' : '🌙'}</span>
              </button>

              <button
                onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}
                className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-black transition cursor-pointer border shrink-0 ${
                  isDark ? 'bg-slate-800/90 hover:bg-slate-700 text-rose-400 border-slate-700' : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                }`}
              >
                {lang === 'ur' ? 'EN' : 'اردو'}
              </button>

              <button
                onClick={() => setShowPostReqModal(true)}
                className="hidden sm:flex bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-2 rounded-xl font-black text-xs shadow-md cursor-pointer shrink-0"
              >
                <span>🚨</span>
                <span>{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="hidden sm:flex bg-gradient-to-r from-rose-600 to-rose-700 text-white px-3 py-2 rounded-xl font-black text-xs shadow-md cursor-pointer shrink-0"
              >
                <span>+</span>
                <span>{lang === 'ur' ? 'ڈونر بنیں' : 'Register'}</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <EmergencyBanner requests={requests} onViewAll={() => setActiveTab('requests')} lang={lang} />
            <VisualCampaignSlider lang={lang} onPledgeClick={() => setShowRegisterModal(true)} theme={theme} />
            <BloodDonationSteps lang={lang} theme={theme} onRegisterClick={() => setShowRegisterModal(true)} />
            <BloodDonationVideos lang={lang} theme={theme} />
            <DonorEligibilityGuidelines lang={lang} theme={theme} />
            <MythsVsFacts lang={lang} theme={theme} />
            <CampsPhotoGallery lang={lang} theme={theme} />
            <CommunityPollVote lang={lang} theme={theme} />
            <HomeFAQ lang={lang} theme={theme} />
          </div>
        )}

        {/* صفحہ 2: ڈونرز (مکمل محفوظ اور درست کلاسز کے ساتھ) */}
        {activeTab === 'donors' && (
          <div className={`space-y-6 p-4 sm:p-6 rounded-3xl ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'ur' ? 'ڈونر کا نام، علاقہ، تحصیل یا ہسپتال تلاش کریں...' : 'Search by donor name, tehsil, area...'}
                  className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500'
                  }`}
                />
              </div>

              <div>
                <span className={`text-xs font-bold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {lang === 'ur' ? 'بلڈ گروپ منتخب کریں:' : 'Filter by Blood Group:'}
                </span>
                <BloodGroupGrid
                  selected={selectedBlood}
                  onSelect={(b) => setSelectedBlood(b === selectedBlood ? null : b)}
                  lang={lang}
                  theme={theme}
                />
              </div>
            </div>

            <h3 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedCity} {lang === 'ur' ? 'کے تصدیق شدہ ڈونرز' : 'Verified Donors'} ({filteredCurrentCityDonors.length})
            </h3>

            {loading ? (
              <div className="p-12 text-center text-slate-400">⏳ ڈونرز لوڈ ہو رہے ہیں...</div>
            ) : filteredCurrentCityDonors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCurrentCityDonors.map((donor, idx) => (
                  <DonorCard key={donor.id || idx} donor={donor} lang={lang} theme={theme} />
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border text-center ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                <p className="text-sm font-bold">کوئی ڈونر موجود نہیں۔</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ur' ? 'خون کی ہنگامی اپیلیں' : 'Active Emergency Blood Requests'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.map((req) => (
                <div key={req.id} className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-amber-500/30 text-white' : 'bg-white border-amber-200 text-slate-900'}`}>
                  <h4 className="font-black text-base">{req.patient_name}</h4>
                  <p className="text-xs">{req.hospital} - {req.city}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'helplines' && (
          <div className="space-y-6">
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>ہیلپ لائنز</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {helplinesList.map((hl, idx) => (
                <div key={idx} className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                  <h4 className="font-black">{hl.nameUrdu}</h4>
                  <span className="text-rose-600 font-bold">{hl.phone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* صفحہ 5: گائیڈ (مکمل محفوظ اور درست کلاسز کے ساتھ) */}
        {activeTab === 'guide' && (
          <div className={`space-y-6 p-4 sm:p-6 rounded-3xl ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ur' ? 'بلڈ گروپ مطابقت چارٹ' : 'Blood Group Compatibility Guide'}
            </h3>

            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <span className={`text-xs font-bold block mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ur' ? 'بلڈ گروپ منتخب کریں:' : 'Select Blood Group:'}
              </span>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                {Object.keys(bloodCompatibility).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setGuideSelectedBlood(bg)}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      guideSelectedBlood === bg
                        ? 'bg-rose-600 text-white shadow-md'
                        : isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-emerald-50/50 border-emerald-200 text-slate-900'}`}>
                  <h4 className="text-sm font-black text-emerald-600 mb-2">خون دے سکتا ہے (Give To):</h4>
                  <div className="flex flex-wrap gap-2">
                    {guideInfo.give?.map((g) => (
                      <span key={g} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-black">{g}</span>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-rose-50/50 border-rose-200 text-slate-900'}`}>
                  <h4 className="text-sm font-black text-rose-600 mb-2">خون لے سکتا ہے (Receive From):</h4>
                  <div className="flex flex-wrap gap-2">
                    {guideInfo.receive?.map((r) => (
                      <span key={r} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className={`lg:hidden fixed bottom-0 inset-x-0 z-50 border-t backdrop-blur-xl shadow-2xl flex items-center justify-around py-1.5 px-2 ${
        isDark ? 'bg-slate-950/98 border-slate-800 text-slate-400' : 'bg-white/98 border-slate-200 text-slate-600'
      }`}>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl ${activeTab === 'home' ? 'text-rose-600 font-black bg-rose-500/10' : ''}`}>
          <span>🏠</span>
          <span className="text-[11px]">ہوم</span>
        </button>
        <button onClick={() => setActiveTab('donors')} className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl ${activeTab === 'donors' ? 'text-rose-600 font-black bg-rose-500/10' : ''}`}>
          <span>🩸</span>
          <span className="text-[11px]">ڈونرز</span>
        </button>
        <button onClick={() => setActiveTab('requests')} className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl ${activeTab === 'requests' ? 'text-amber-500 font-black bg-amber-500/15' : ''}`}>
          <span>🚨</span>
          <span className="text-[11px]">خون چاہیے</span>
        </button>
        <button onClick={() => setActiveTab('helplines')} className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl ${activeTab === 'helplines' ? 'text-rose-600 font-black bg-rose-500/10' : ''}`}>
          <span>📞</span>
          <span className="text-[11px]">کالز</span>
        </button>
        <button onClick={() => setActiveTab('guide')} className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl ${activeTab === 'guide' ? 'text-rose-600 font-black bg-rose-500/10' : ''}`}>
          <span>📖</span>
          <span className="text-[11px]">گائیڈ</span>
        </button>
      </nav>

      <RegisterDonorModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} defaultProvince={selectedProvince} defaultCity={selectedCity} onSuccess={fetchPortalData} lang={lang} />
      <PostRequestModal isOpen={showPostReqModal} onClose={() => setShowPostReqModal(false)} defaultProvince={selectedProvince} defaultCity={selectedCity} onSuccess={fetchPortalData} lang={lang} />
      <BloodGuideModal isOpen={showGuideModal} onClose={() => setShowGuideModal(false)} lang={lang} />
      <HelplinesModal isOpen={showHelplinesModal} onClose={() => setShowHelplinesModal(false)} lang={lang} />
    </div>
  );
}
