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

  // Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostReqModal, setShowPostReqModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showHelplinesModal, setShowHelplinesModal] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Filters
  const [selectedProvince, setSelectedProvince] = useState('پنجاب (Punjab)');
  const [selectedCity, setSelectedCity] = useState('خانیوال (Khanewal)');
  const [selectedBlood, setSelectedBlood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Guide Page selected blood
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
      const matchBlood = selectedBlood ? d.blood_group === selectedBlood : true;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch =
          (d.name || '').toLowerCase().includes(q) ||
          (d.tehsil || '').toLowerCase().includes(q) ||
          (d.area || '').toLowerCase().includes(q) ||
          (d.blood_group || '').toLowerCase().includes(q);
      }
      return matchCity && matchBlood && matchSearch;
    });
  }, [donors, selectedCity, selectedBlood, searchQuery]);

  const nearbyDonorsList = useMemo(() => {
    const list = nearbyCities[selectedCity] || [];
    return donors.filter((d) => {
      const isNearby = list.includes(d.city);
      const matchBlood = selectedBlood ? d.blood_group === selectedBlood : true;
      return isNearby && matchBlood;
    });
  }, [donors, selectedCity, selectedBlood]);

  const allFilteredDonors = useMemo(() => {
    return donors.filter((d) => {
      const matchBlood = selectedBlood ? d.blood_group === selectedBlood : true;
      const matchProvince = selectedProvince ? d.province === selectedProvince : true;
      const matchCity = selectedCity ? d.city === selectedCity : true;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch =
          (d.name || '').toLowerCase().includes(q) ||
          (d.tehsil || '').toLowerCase().includes(q) ||
          (d.area || '').toLowerCase().includes(q) ||
          (d.city || '').toLowerCase().includes(q) ||
          (d.blood_group || '').toLowerCase().includes(q);
      }
      return matchBlood && matchProvince && matchCity && matchSearch;
    });
  }, [donors, selectedBlood, selectedProvince, selectedCity, searchQuery]);

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

  // Blood compatibility object with safety check
  const guideInfo = bloodCompatibility[guideSelectedBlood] || bloodCompatibility['O+'] || {
    canGiveTo: [],
    canReceiveFrom: [],
    give: [],
    receive: [],
    tagUrdu: ''
  };

  // Safe helper arrays so the app never crashes
  const giveList: string[] = (guideInfo as any).canGiveTo || (guideInfo as any).give || [];
  const receiveList: string[] = (guideInfo as any).canReceiveFrom || (guideInfo as any).receive || [];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-rose-600 selection:text-white transition-colors duration-200 overflow-x-hidden max-w-full pt-[115px] sm:pt-[98px] pb-24 sm:pb-28 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* FIXED TOP HEADER WRAPPER - REMAINS STATIONARY DURING SCROLL */}
      <div className="fixed top-0 inset-x-0 z-50 shadow-md">
        {/* Top Ticker */}
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

        {/* Header Navbar */}
        <header className={`backdrop-blur-md border-b shadow-xs transition-colors ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
            {/* Logo */}
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

            {/* Desktop 5-Page Navigation */}
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

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('helplines')}
                className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-xl text-xs font-black shadow-xs flex items-center gap-1 cursor-pointer transition active:scale-95 shrink-0"
                title={lang === 'ur' ? 'ایمرجنسی ہیلپ لائنز' : 'Emergency Helplines'}
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
                className="hidden sm:flex bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3 py-2 rounded-xl font-black text-xs shadow-md transition active:scale-95 items-center gap-1 cursor-pointer shrink-0"
              >
                <span>🚨</span>
                <span>{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="hidden sm:flex bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-3 py-2 rounded-xl font-black text-xs shadow-md transition active:scale-95 items-center gap-1 cursor-pointer shrink-0"
              >
                <span>+</span>
                <span>{lang === 'ur' ? 'ڈونر بنیں' : 'Register'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Quick Action Bar */}
          <div className="sm:hidden px-3 pb-2 pt-1 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={() => setActiveTab('requests')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 py-2 px-3 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
            >
              <span className="text-sm">🚨</span>
              <span>{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white py-2 px-3 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
            >
              <span className="text-sm">➕</span>
              <span>{lang === 'ur' ? 'بلڈ ڈونر بنیں' : 'Register Donor'}</span>
            </button>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-8 sm:py-10 px-4 border-b text-center transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-gradient-to-b from-rose-50/80 via-white to-slate-50 border-slate-200 text-slate-900'
      }`}>
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=80"
          alt="Blood Donation Drive"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-center filter ${
            isDark ? 'opacity-15 brightness-75' : 'opacity-10 brightness-110'
          }`}
        />
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950' : 'bg-gradient-to-b from-white/70 via-white/90 to-slate-50'
        }`} />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black mb-3 shadow-2xs border ${
            isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/25' : 'bg-rose-100/90 text-rose-900 border-rose-200'
          }`}>
            {lang === 'ur' ? 'وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا' : 'Saving one life is like saving all of humanity'}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3">
            {lang === 'ur' ? 'ایک بوتل خون، ' : 'Donate Blood, '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-rose-700">
              {lang === 'ur' ? 'ایک نئی زندگی' : 'Save A Life'}
            </span>
          </h2>

          <p className={`text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'ur'
              ? 'ضلع خانیوال اور پاکستان بھر کے ہسپتالوں کے لیے تصدیق شدہ بلڈ ڈونرز اور مریضوں کا فوری، مفت اور بااعتماد رابطہ'
              : 'Direct, free and verified real-time connection between voluntary blood donors and emergency patients across Pakistan'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>➕</span>
              <span>{lang === 'ur' ? 'بطور بلڈ ڈونر رجسٹر ہوں' : 'Register as Blood Donor'}</span>
            </button>

            <button
              onClick={() => setShowPostReqModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>🚨</span>
              <span>{lang === 'ur' ? 'خون کی ایمرجنسی اپیل کریں' : 'Post Urgent Blood Appeal'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Multi-Page Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        {/* PAGE 1: HOME (ہوم پیج) */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <EmergencyBanner requests={requests} onViewAll={() => setActiveTab('requests')} lang={lang} />

            {/* 3 Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => { setActiveTab('donors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`p-6 rounded-3xl border transition cursor-pointer hover:scale-[1.02] shadow-xs flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-rose-500/30 hover:border-rose-500' : 'bg-white border-rose-200 hover:border-rose-400'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl shadow-md mb-4">🩸</div>
                  <h3 className={`text-lg font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? 'بلڈ ڈونرز تلاش کریں' : 'Find Blood Donors'}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'ur' ? 'خانیوال اور تمام شہروں میں مطلوبہ بلڈ گروپ کے تصدیق شدہ ڈونرز سے فوری رابطہ کریں۔' : 'Find verified donors in Khanewal and all cities with direct call & WhatsApp.'}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-black text-rose-600">
                  <span>{lang === 'ur' ? 'ڈونرز لسٹ دیکھیں' : 'View Donors List'}</span>
                  <span>←</span>
                </div>
              </div>

              <div
                onClick={() => { setActiveTab('requests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`p-6 rounded-3xl border transition cursor-pointer hover:scale-[1.02] shadow-xs flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-amber-500/30 hover:border-amber-500' : 'bg-white border-amber-200 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl shadow-md mb-4 font-black">🚨</div>
                  <h3 className={`text-lg font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? 'خون کی ضرورت ہے؟' : 'Need Blood Urgently?'}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'ur' ? 'اپنے مریض کے لیے مفت ہنگامی بلڈ اپیل جاری کریں یا زیر علاج مریضوں کی لسٹ دیکھیں۔' : 'Post an urgent blood request for free or browse active patient appeals.'}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-black text-amber-600">
                  <span>{lang === 'ur' ? 'ہنگامی اپیلیں دیکھیں' : 'View Blood Requests'}</span>
                  <span>←</span>
                </div>
              </div>

              <div
                onClick={() => setShowRegisterModal(true)}
                className={`p-6 rounded-3xl border transition cursor-pointer hover:scale-[1.02] shadow-xs flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-emerald-500/30 hover:border-emerald-500' : 'bg-white border-emerald-200 hover:border-emerald-400'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md mb-4 font-black">➕</div>
                  <h3 className={`text-lg font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? 'بلڈ ڈونر بنیں' : 'Register as Donor'}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'ur' ? 'اپنا نام اور رابطہ درج کروائیں تاکہ کسی بھی ضرورت مند مریض کی زندگی بچائی جا سکے۔' : 'Join the national network as a donor to save precious lives in your area.'}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-black text-emerald-600">
                  <span>{lang === 'ur' ? 'ابھی رجسٹریشن فارم کھولیں' : 'Register Now'}</span>
                  <span>←</span>
                </div>
              </div>
            </div>

            {/* Visual Campaign Slider with Photos & Modal Details */}
            <VisualCampaignSlider
              lang={lang}
              onPledgeClick={() => setShowRegisterModal(true)}
              theme={theme}
            />

            {/* 4 Steps of Blood Donation */}
            <BloodDonationSteps
              lang={lang}
              theme={theme}
              onRegisterClick={() => setShowRegisterModal(true)}
            />

            {/* Video Awareness & Doctor Guidance Clips */}
            <BloodDonationVideos
              lang={lang}
              theme={theme}
            />

            {/* Donor Eligibility & Medical Guidelines */}
            <DonorEligibilityGuidelines
              lang={lang}
              theme={theme}
            />

            {/* Myths vs Scientific Facts */}
            <MythsVsFacts
              lang={lang}
              theme={theme}
            />

            {/* Pakistan Blood Camps & Drives Photo Gallery */}
            <CampsPhotoGallery
              lang={lang}
              theme={theme}
            />

            {/* Donors Preview on Home */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? `دستیاب بلڈ ڈونرز (${selectedCity})` : `Available Donors in ${selectedCity}`}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {lang === 'ur' ? 'براہ راست واٹس ایپ یا کال کر کے مریض کی جان بچائیں' : 'Contact directly via Call or WhatsApp'}
                  </p>
                </div>
                <button
                  onClick={() => { setActiveTab('donors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ur' ? 'تمام ڈونرز دیکھیں' : 'View All Donors'}</span>
                  <span>←</span>
                </button>
              </div>

              {filteredCurrentCityDonors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCurrentCityDonors.slice(0, 6).map((donor, idx) => (
                    <DonorCard key={donor.id || idx} donor={donor} lang={lang} theme={theme} />
                  ))}
                </div>
              ) : (
                <div className={`p-8 rounded-3xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-sm font-bold text-slate-400">
                    {lang === 'ur' ? 'اس وقت اس شہر کے لیے ڈونرز موجود نہیں۔ آپ پہلے ڈونر بنیں!' : 'No donors listed yet for this city. Be the first to register!'}
                  </p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="mt-3 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer"
                  >
                    {lang === 'ur' ? 'ڈونر کے طور پر رجسٹر ہوں' : 'Register as Donor'}
                  </button>
                </div>
              )}
            </div>

            {/* Community Poll Vote */}
            <CommunityPollVote lang={lang} theme={theme} />

            {/* Frequently Asked Questions */}
            <HomeFAQ lang={lang} theme={theme} />
          </div>
        )}

        {/* PAGE 2: DONORS (ڈونرز لسٹ) */}
        {activeTab === 'donors' && (
          <div className="space-y-6">
            <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'ur' ? 'ڈونر کا نام، علاقہ، تحصیل یا ہسپتال تلاش کریں...' : 'Search by donor name, tehsil, area...'}
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none focus:border-rose-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      const p = e.target.value;
                      setSelectedProvince(p);
                      setSelectedCity(pakistanProvinces[p][0]);
                    }}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold border focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {Object.keys(pakistanProvinces).map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-black border focus:outline-none text-rose-600 ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {currentCitiesInProvince.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 block mb-2">
                  {lang === 'ur' ? 'بلڈ گروپ منتخب کریں:' : 'Filter by Blood Group:'}
                </span>
                <BloodGroupGrid
                  selectedBlood={selectedBlood || 'All / تمام'}
                  onSelect={(b) => setSelectedBlood(b === 'All / تمام' ? null : b)}
                  counts={{}}
                  lang={lang}
                  theme={theme}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selectedCity} {lang === 'ur' ? 'کے تصدیق شدہ ڈونرز' : 'Verified Donors'}
                <span className="text-xs font-normal text-slate-400 mx-2">
                  ({filteredCurrentCityDonors.length} {lang === 'ur' ? 'ڈونرز ملے' : 'Found'})
                </span>
              </h3>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400">
                <span className="text-3xl animate-spin inline-block">⏳</span>
                <p className="mt-2 text-xs font-bold">{lang === 'ur' ? 'ڈونرز کی معلومات لوڈ ہو رہی ہیں...' : 'Loading Donors...'}</p>
              </div>
            ) : filteredCurrentCityDonors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCurrentCityDonors.map((donor, idx) => (
                  <DonorCard key={donor.id || idx} donor={donor} lang={lang} theme={theme} />
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <p className="text-sm font-bold text-slate-400">
                  {lang === 'ur' ? 'اس بلڈ گروپ کے لیے ابھی کوئی ڈونر رجسٹرڈ نہیں۔' : 'No donors found for this selection.'}
                </p>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="mt-3 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  {lang === 'ur' ? 'پہلے ڈونر بنیں' : 'Be the first donor'}
                </button>
              </div>
            )}

            {nearbyDonorsList.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className={`text-sm sm:text-base font-black mb-3 text-amber-600 flex items-center gap-1.5`}>
                  <span>📍</span>
                  <span>{lang === 'ur' ? `قریبی اضلاع و تحصیلوں میں دستیاب ڈونرز (${nearbyDonorsList.length})` : `Nearby Districts Donors (${nearbyDonorsList.length})`}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyDonorsList.map((donor, idx) => (
                    <DonorCard key={donor.id || `nearby-${idx}`} donor={donor} lang={lang} theme={theme} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 3: REQUESTS (خون چاہیے / ہنگامی اپیلیں) */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'خون کی ہنگامی اپیلیں اور زیر علاج مریض' : 'Active Emergency Blood Requests'}
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'ur' ? 'اگر آپ خون دے سکتے ہیں تو فوری ہسپتال یا لواحقین سے رابطہ کریں' : 'Reach out directly to save a life today'}
                </p>
              </div>

              <button
                onClick={() => setShowPostReqModal(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <span>🚨</span>
                <span>{lang === 'ur' ? 'نئی اپیل درج کریں' : 'Post Blood Request'}</span>
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400">
                <span className="text-3xl animate-spin inline-block">⏳</span>
                <p className="mt-2 text-xs font-bold">{lang === 'ur' ? 'اپیلیں لوڈ ہو رہی ہیں...' : 'Loading Requests...'}</p>
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className={`p-5 rounded-3xl border transition shadow-xs flex flex-col justify-between ${
                      isDark ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                          <span>{req.urgency || (lang === 'ur' ? 'انتہائی فوری' : 'Urgent')}</span>
                        </span>

                        <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-base shadow-md">
                          {req.blood_group}
                        </span>
                      </div>

                      <h4 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {req.patient_name}
                      </h4>

                      <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                        <p className="flex items-center gap-1.5">
                          <span>🏥</span>
                          <span className="font-bold text-slate-300">{req.hospital}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span>📍</span>
                          <span>{req.city}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span>🩸</span>
                          <span>{req.units_needed} {lang === 'ur' ? 'بوتلیں درکار ہیں' : 'Units needed'}</span>
                        </p>
                        {req.note && (
                          <p className="text-[11px] italic bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl text-slate-300 mt-2">
                            "{req.note}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${req.contact_number}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-black text-xs text-center flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <span>📞</span>
                        <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
                      </a>
                      <a
                        href={`https://wa.me/${req.contact_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `السلام علیکم! میں پاکستان بلڈ پورٹل سے آپ کے مریض ${req.patient_name} کے لیے خون کا عطیہ دینا چاہتا ہوں۔`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-black text-xs text-center flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <span>💬</span>
                        <span>{lang === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <p className="text-sm font-bold text-slate-400">
                  {lang === 'ur' ? 'اس وقت کوئی ہنگامی اپیل موجود نہیں۔' : 'No emergency requests active.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PAGE 4: HELPLINES (ایمرجنسی ہیلپ لائنز) */}
        {activeTab === 'helplines' && (
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'قومی ایمرجنسی و بلڈ بینک ہیلپ لائنز' : 'Emergency & Blood Bank Helplines'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'پورے پاکستان میں ہنگامی صورتحال میں ایمبولینس یا بلڈ سنٹر سے فوری رابطہ کریں' : 'Instant 24/7 dialer for rescue, ambulance and certified blood networks'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {helplinesList.map((hl, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border transition shadow-xs flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-rose-600/10 text-rose-600 flex items-center justify-center text-2xl">
                        {hl.icon}
                      </div>
                      <div>
                        <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'ur' ? hl.nameUrdu : hl.nameEn}
                        </h4>
                        <span className="text-xs font-black text-rose-600 tracking-wider font-mono">
                          {hl.phone}
                        </span>
                      </div>
                    </div>

                    <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {hl.descUrdu}
                    </p>
                  </div>

                  <a
                    href={`tel:${hl.phone}`}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>📞</span>
                    <span>{lang === 'ur' ? 'ابھی کال ملائیں' : 'Dial Now'}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 5: GUIDE (بلڈ گائیڈ و مطابقت) */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'بلڈ گروپ مطابقت چارٹ (Blood Compatibility Chart)' : 'Blood Group Compatibility Guide'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'معلوم کریں کہ آپ کا بلڈ گروپ کس کو خون دے سکتا ہے اور کس سے لے سکتا ہے' : 'Discover who you can safely donate blood to and receive from'}
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-slate-400 block mb-3">
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
                        : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-emerald-50/50 border-emerald-200'}`}>
                  <h4 className="text-sm font-black text-emerald-600 mb-2 flex items-center gap-1.5">
                    <span>🩸</span>
                    <span>{guideSelectedBlood} {lang === 'ur' ? 'ان گروپس کو خون دے سکتا ہے (Give To):' : 'Can Give Blood To:'}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {giveList.map((g) => (
                      <span key={g} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-black shadow-xs">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-rose-50/50 border-rose-200'}`}>
                  <h4 className="text-sm font-black text-rose-600 mb-2 flex items-center gap-1.5">
                    <span>🤲</span>
                    <span>{guideSelectedBlood} {lang === 'ur' ? 'ان گروپس سے خون لے سکتا ہے (Receive From):' : 'Can Receive Blood From:'}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {receiveList.map((r) => (
                      <span key={r} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black shadow-xs">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed text-amber-500 font-medium">
                💡 <strong>{lang === 'ur' ? 'اہم سائنسی معلومات:' : 'Key Scientific Fact:'}</strong>{' '}
                {lang === 'ur'
                  ? 'او نیگیٹو (O-) یونیورسل ڈونر کہلاتا ہے کیونکہ اس کا خون ہر بلڈ گروپ کے مریض کو لگایا جا سکتا ہے۔ جبکہ اے بی پوزیٹو (AB+) یونیورسل ریسیور ہے جو ہر گروپ سے خون حاصل کر سکتا ہے۔'
                  : 'O-Negative is the universal donor suitable for anyone in emergencies. AB-Positive is the universal recipient.'}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 mt-12 transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-start">
          <div className="flex items-center gap-2">
            <span className="text-lg">🩸</span>
            <span className="font-black text-rose-600">
              {lang === 'ur' ? 'پاکستان لائیو بلڈ پورٹل' : 'Pakistan Blood Portal'}
            </span>
            <span className="text-[10px] text-slate-400">| ۱۰۰٪ بلا معاوضہ انسانیت کی خدمت</span>
          </div>

          <p className="text-[11px] font-bold">
            © {new Date().getFullYear()} Pakistan Blood Portal. Built for all 4 provinces, Islamabad, AJK & GB.
          </p>
        </div>
      </footer>

      {/* Mobile & Tablet Bottom Navigation Bar - FIRMLY FIXED AT BOTTOM */}
      <nav
        className={`lg:hidden fixed bottom-0 inset-x-0 z-50 border-t backdrop-blur-xl shadow-2xl flex items-center justify-around py-1.5 px-2 pb-[max(env(safe-area-inset-bottom,0px),8px)] transition-colors ${
          isDark
            ? 'bg-slate-950/98 border-slate-800 text-slate-400'
            : 'bg-white/98 border-slate-200 text-slate-600'
        }`}
      >
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition cursor-pointer ${
            activeTab === 'home'
              ? 'text-rose-600 font-black bg-rose-500/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[11px] font-bold">{lang === 'ur' ? 'ہوم' : 'Home'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('donors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition cursor-pointer ${
            activeTab === 'donors'
              ? 'text-rose-600 font-black bg-rose-500/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-lg">🩸</span>
          <span className="text-[11px] font-bold">{lang === 'ur' ? 'ڈونرز' : 'Donors'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('requests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition cursor-pointer ${
            activeTab === 'requests'
              ? 'text-amber-500 font-black bg-amber-500/15'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-lg">🚨</span>
          <span className="text-[11px] font-bold">{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('helplines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition cursor-pointer ${
            activeTab === 'helplines'
              ? 'text-rose-600 font-black bg-rose-500/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-lg">📞</span>
          <span className="text-[11px] font-bold">{lang === 'ur' ? 'کالز' : 'Helplines'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('guide'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition cursor-pointer ${
            activeTab === 'guide'
              ? 'text-rose-600 font-black bg-rose-500/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-lg">📖</span>
          <span className="text-[11px] font-bold">{lang === 'ur' ? 'گائیڈ' : 'Guide'}</span>
        </button>
      </nav>

      {/* Modals */}
      <RegisterDonorModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        defaultProvince={selectedProvince}
        defaultCity={selectedCity}
        onSuccess={fetchPortalData}
        lang={lang}
      />

      <PostRequestModal
        isOpen={showPostReqModal}
        onClose={() => setShowPostReqModal(false)}
        defaultProvince={selectedProvince}
        defaultCity={selectedCity}
        onSuccess={fetchPortalData}
        lang={lang}
      />

      <BloodGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        lang={lang}
      />

      <HelplinesModal
        isOpen={showHelplinesModal}
        onClose={() => setShowHelplinesModal(false)}
        lang={lang}
      />
    </div>
  );
      }
