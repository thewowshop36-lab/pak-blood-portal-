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

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [guideSelectedBlood, setGuideSelectedBlood] = useState<string>('O+');

  const [selectedProvince, setSelectedProvince] = useState<string>('پنجاب / Punjab');
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return localStorage.getItem('saved_blood_city') || 'خانیوال / Khanewal';
  });

  const [selectedBlood, setSelectedBlood] = useState<string>('All / تمام');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostReqModal, setShowPostReqModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showHelplinesModal, setShowHelplinesModal] = useState(false);

  useEffect(() => {
    fetchLiveSupabaseData();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('saved_blood_city', selectedCity);
    }
  }, [selectedCity]);

  const fetchLiveSupabaseData = async () => {
    setLoading(true);
    try {
      const { data: donorData, error: donorErr } = await supabase
        .from('donors')
        .select('*')
        .order('id', { ascending: false });

      if (!donorErr && donorData) {
        setDonors(donorData);
      }

      const { data: reqData, error: reqErr } = await supabase
        .from('requests')
        .select('*')
        .order('id', { ascending: false });

      if (!reqErr && reqData) {
        setRequests(reqData);
      }
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === 'ur' ? 'آپ کے براؤزر میں لوکیشن کی سہولت دستیاب نہیں ہے۔' : 'Geolocation is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        if (lat >= 30.1 && lat <= 30.5 && lon >= 71.7 && lon <= 72.2) {
          setSelectedProvince('پنجاب / Punjab');
          setSelectedCity('خانیوال / Khanewal');
          alert(lang === 'ur' ? 'آپ کا شہر "خانیوال" کامیابی سے پہچان لیا گیا ہے!' : 'Detected city: Khanewal!');
        } else if (lat >= 30.0 && lat <= 30.3 && lon >= 71.3 && lon <= 71.6) {
          setSelectedProvince('پنجاب / Punjab');
          setSelectedCity('ملتان / Multan');
          alert(lang === 'ur' ? 'آپ کا شہر "ملتان" کامیابی سے پہچان لیا گیا ہے!' : 'Detected city: Multan!');
        } else if (lat >= 31.3 && lat <= 31.7 && lon >= 74.1 && lon <= 74.5) {
          setSelectedProvince('پنجاب / Punjab');
          setSelectedCity('لاہور / Lahore');
          alert(lang === 'ur' ? 'آپ کا شہر "لاہور" کامیابی سے پہچان لیا گیا ہے!' : 'Detected city: Lahore!');
        } else if (lat >= 24.7 && lat <= 25.1 && lon >= 66.9 && lon <= 67.2) {
          setSelectedProvince('سندھ / Sindh');
          setSelectedCity('کراچی / Karachi');
          alert(lang === 'ur' ? 'آپ کا شہر "کراچی" کامیابی سے پہچان لیا گیا ہے!' : 'Detected city: Karachi!');
        } else if (lat >= 33.5 && lat <= 33.8 && lon >= 72.9 && lon <= 73.2) {
          setSelectedProvince('اسلام آباد / Islamabad');
          setSelectedCity('اسلام آباد / Islamabad Capital Territory');
          alert(lang === 'ur' ? 'آپ کا شہر "اسلام آباد" پہچان لیا گیا ہے!' : 'Detected city: Islamabad!');
        } else {
          alert(lang === 'ur' ? `جی پی ایس لوکیشن مل گئی ہے (${lat.toFixed(2)}, ${lon.toFixed(2)})۔` : `GPS detected: (${lat.toFixed(2)}, ${lon.toFixed(2)})`);
        }
      },
      () => {
        alert(lang === 'ur' ? 'لوکیشن حاصل نہیں ہو سکی۔ براہ کرم لسٹ سے شہر منتخب کریں۔' : 'Could not retrieve GPS location.');
      }
    );
  };

  const cityBloodCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "A+": 0, "A-": 0, "B+": 0, "B-": 0, "O+": 0, "O-": 0, "AB+": 0, "AB-": 0
    };

    donors.forEach((d) => {
      const blood = d.bloodgroup || d.bloodGroup || d.blood_group;
      if (blood && counts[blood] !== undefined) {
        if (!selectedCity || d.city === selectedCity) {
          counts[blood]++;
        }
      }
    });

    return counts;
  }, [donors, selectedCity]);

  const filteredCurrentCityDonors = useMemo(() => {
    return donors.filter((d) => {
      const dBlood = d.bloodgroup || d.bloodGroup || d.blood_group || '';
      const matchBlood = selectedBlood === 'All / تمام' || dBlood === selectedBlood;
      const matchCity = !selectedCity || d.city === selectedCity;

      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const dName = (d.name || '').toLowerCase();
        const dCity = (d.city || '').toLowerCase();
        const dTehsil = (d.tehsil || '').toLowerCase();
        const dHospital = (d.hospital_near || '').toLowerCase();
        matchSearch =
          dName.includes(q) ||
          dCity.includes(q) ||
          dTehsil.includes(q) ||
          dHospital.includes(q) ||
          dBlood.toLowerCase().includes(q);
      }

      return matchBlood && matchCity && matchSearch;
    });
  }, [donors, selectedBlood, selectedCity, searchQuery]);

  const nearbyBackupDonors = useMemo(() => {
    if (!selectedCity) return [];
    const neighbors = nearbyCities[selectedCity] || [];
    if (neighbors.length === 0) return [];

    return donors.filter((d) => {
      const isNeighbor = neighbors.includes(d.city);
      const dBlood = d.bloodgroup || d.bloodGroup || d.blood_group || '';
      const matchBlood = selectedBlood === 'All / تمام' || dBlood === selectedBlood;
      return isNeighbor && matchBlood;
    });
  }, [donors, selectedCity, selectedBlood]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchBlood = selectedBlood === 'All / تمام' || r.blood_group === selectedBlood;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchSearch =
          (r.patient_name || '').toLowerCase().includes(q) ||
          (r.city || '').toLowerCase().includes(q) ||
          (r.hospital || '').toLowerCase().includes(q) ||
          (r.blood_group || '').toLowerCase().includes(q);
      }
      return matchBlood && matchSearch;
    });
  }, [requests, selectedBlood, searchQuery]);

  const guideInfo = bloodCompatibility[guideSelectedBlood] || bloodCompatibility['O+'];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-rose-600 selection:text-white transition-colors duration-200 overflow-x-hidden max-w-full pb-20 sm:pb-0 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Top Ticker */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white text-[11px] sm:text-xs py-1.5 px-3 shadow-inner">
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
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-xs transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
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
        <div className="sm:hidden px-3 pb-2.5 pt-1 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/60">
          <button
            onClick={() => setActiveTab('requests')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 py-2.5 px-3 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            <span className="text-sm">🚨</span>
            <span>{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white py-2.5 px-3 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            <span className="text-sm">➕</span>
            <span>{lang === 'ur' ? 'بلڈ ڈونر بنیں' : 'Register Donor'}</span>
          </button>
        </div>
      </header>

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

          <h2 className={`text-xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {lang === 'ur' ? 'اپنے شہر اور قریبی علاقے میں فوری بلڈ ڈونر تلاش کریں' : 'Find Verified Blood Donors Instantly in Your City'}
          </h2>

          <p className={`text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'ur'
              ? 'خانیوال سمیت پاکستان کے تمام اضلاع اور تحصیلوں میں ایک کلک پر واٹس ایپ اور کال کے ذریعے بلڈ ڈونرز سے رابطہ کریں۔'
              : 'Direct WhatsApp and Call contact with blood donors across Khanewal and all districts of Pakistan.'}
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 flex-wrap">
            <div className={`px-4 py-2 rounded-2xl shadow-xs border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-base sm:text-lg font-black text-rose-600">{donors.length}</span>
              <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'رجسٹرڈ ڈونرز' : 'Registered Donors'}
              </span>
            </div>
            <div className={`px-4 py-2 rounded-2xl shadow-xs border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-base sm:text-lg font-black text-amber-600">{requests.length}</span>
              <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'ہنگامی اپیلیں' : 'Emergency Requests'}
              </span>
            </div>
            <div className={`px-4 py-2 rounded-2xl shadow-xs border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-base sm:text-lg font-black text-emerald-600">100%</span>
              <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ur' ? 'مفت و فلاحی خدمت' : 'Free & Non-profit'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Pages */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full grow">
        {/* PAGE 1: HOME */}
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
                    {pakistanProvinces[selectedProvince]?.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleDetectLocation}
                    className="p-2.5 rounded-2xl bg-rose-600 text-white hover:bg-rose-500 transition cursor-pointer"
                    title={lang === 'ur' ? 'جی پی ایس سے لوکیشن حاصل کریں' : 'Detect GPS Location'}
                  >
                    📍
                  </button>
                </div>
              </div>

              <BloodGroupGrid
                selectedBlood={selectedBlood}
                onSelect={(bg) => setSelectedBlood(bg)}
                counts={cityBloodCounts}
                lang={lang}
                theme={theme}
              />
            </div>

            <div className="flex items-center justify-between">
              <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? `ڈونرز نتائج: ${selectedCity} (${filteredCurrentCityDonors.length})` : `Donors in ${selectedCity} (${filteredCurrentCityDonors.length})`}
              </h3>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                + {lang === 'ur' ? 'ڈونر بنیں' : 'Register'}
              </button>
            </div>

            {filteredCurrentCityDonors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCurrentCityDonors.map((donor, idx) => (
                  <DonorCard key={donor.id || idx} donor={donor} lang={lang} theme={theme} />
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <p className="text-sm font-bold text-slate-400">
                  {lang === 'ur' ? `اس وقت ${selectedCity} میں اس بلڈ گروپ کا کوئی ڈونر رجسٹر نہیں۔` : `No donors found in ${selectedCity} for this criteria.`}
                </p>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="mt-3 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  {lang === 'ur' ? 'پہلے ڈونر کے طور پر نام درج کریں' : 'Register as First Donor'}
                </button>
              </div>
            )}

            {/* Nearby backup donors */}
            {nearbyBackupDonors.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className={`text-sm font-black mb-3 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                  {lang === 'ur' ? `قریبی اضلاع کے دستیاب بیک اپ ڈونرز (${nearbyBackupDonors.length})` : `Nearby Backup Donors (${nearbyBackupDonors.length})`}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyBackupDonors.map((donor, idx) => (
                    <DonorCard key={`nearby-${donor.id || idx}`} donor={donor} lang={lang} theme={theme} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 3: REQUESTS (خون چاہیے) */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900 border-amber-500/30' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                  {lang === 'ur' ? 'ہنگامی مریض اپیلیں' : 'Urgent Patient Appeals'}
                </span>
                <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ur' ? 'مریضوں کے لیے فوری خون کی ضرورت کی فہرست' : 'Patients Requiring Urgent Blood Transfusion'}
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'ur' ? 'براہ راست مریض کے لواحقین سے رابطہ کر کے صدقہ جاریہ کا ثواب حاصل کریں۔' : 'Connect directly with patient attendants to save lives.'}
                </p>
              </div>

              <button
                onClick={() => setShowPostReqModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs shadow-md transition active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>🚨</span>
                <span>{lang === 'ur' ? 'نئی اپیل پوسٹ کریں' : 'Post New Request'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.map((req, idx) => {
                const cleanPhone = req.contact ? req.contact.replace(/[^0-9]/g, '') : '';
                let waNumber = cleanPhone;
                if (waNumber.startsWith('03')) waNumber = '92' + waNumber.slice(1);
                const waMsg = encodeURIComponent(
                  `السلام علیکم! میں نے پاکستان بلڈ پورٹل پر مریض (${req.patient_name}) کے لیے بلڈ گروپ (${req.blood_group}) کی ضرورت دیکھی ہے۔ کیا اب بھی خون درکار ہے؟`
                );

                return (
                  <div
                    key={req.id || idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {req.urgency || (lang === 'ur' ? 'فوری ضرورت' : 'Immediate')}
                        </span>
                        <span className="text-xl font-black text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-xl border border-rose-200 dark:border-rose-900">
                          {req.blood_group}
                        </span>
                      </div>

                      <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {req.patient_name}
                      </h4>

                      <p className={`text-xs mt-1 flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span>🏥</span>
                        <span>{req.hospital}</span>
                      </p>

                      <p className={`text-xs mt-1 flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span>📍</span>
                        <span>{req.city} ({req.province})</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 mt-4">
                      <a
                        href={`https://wa.me/${waNumber}?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
                      >
                        <span>💬</span>
                        <span>{lang === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
                      </a>
                      <a
                        href={`tel:${req.contact}`}
                        className="bg-rose-600 hover:bg-rose-500 text-white py-2 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
                      >
                        <span>📞</span>
                        <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PAGE 4: HELPLINES (ایمرجنسی کالز) */}
        {activeTab === 'helplines' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📞</span>
                <div>
                  <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ur' ? 'پاکستان کی تمام ایمرجنسی ہیلپ لائنز و بلڈ بینکس' : 'Emergency Helplines & Verified Blood Banks'}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {lang === 'ur' ? 'کسی بھی ناگہانی حادثے یا فوری بلڈ ٹرانسفیوژن کے لیے تصدیق شدہ قومی رابطہ نمبرز' : 'Direct emergency contacts for ambulances and transfusions across Pakistan'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {helplinesList.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ur' ? item.nameUrdu : item.nameEn}
                      </h4>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.descUrdu}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${item.phone}`}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95"
                  >
                    <span>📞</span>
                    <span>{item.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 5: GUIDE (بلڈ گائیڈ) */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className={`text-lg sm:text-xl font-black mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>📖</span>
                <span>{lang === 'ur' ? 'خون کی مطابقت کا چارٹ اور میڈیکل گائیڈ' : 'Blood Compatibility & Medical Guide'}</span>
              </h3>
              <p className={`text-xs mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'ur' ? 'اپنا بلڈ گروپ منتخب کریں اور معلوم کریں کہ آپ کس کس کو خون دے سکتے ہیں اور کس سے لے سکتے ہیں۔' : 'Select blood group to view compatibility matrix.'}
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                {Object.keys(bloodCompatibility).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setGuideSelectedBlood(bg)}
                    className={`py-2.5 rounded-xl font-black text-sm transition cursor-pointer ${
                      guideSelectedBlood === bg
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : isDark ? 'bg-slate-950 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-rose-500">{guideSelectedBlood}</span>
                  <span className="text-xs bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full font-bold">
                    {guideInfo.tagUrdu}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-500 block mb-1.5">
                    ✓ {lang === 'ur' ? `${guideSelectedBlood} کس کس کو خون دے سکتا ہے:` : 'Can Donate To:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guideInfo.canGiveTo.map((g) => (
                      <span key={g} className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-sky-500 block mb-1.5">
                    ✓ {lang === 'ur' ? `${guideSelectedBlood} کس کس سے خون لے سکتا ہے:` : 'Can Receive From:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guideInfo.canReceiveFrom.map((g) => (
                      <span key={g} className="bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 px-3 py-1 rounded-xl text-xs font-bold">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Eligibility rules */}
            <div className={`p-6 rounded-3xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ur' ? 'خون کا عطیہ دینے کی ضروری شرائط:' : 'Blood Donation Eligibility Criteria:'}
              </h4>
              <ul className={`text-xs space-y-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• <strong>عمر:</strong> کم از کم ۱۸ سال اور زیادہ سے زیادہ ۶۰ سال ہونی چاہیے۔</li>
                <li>• <strong>وزن:</strong> کم از کم ۵۰ کلو گرام (50kg) ہونا ضروری ہے۔</li>
                <li>• <strong>وقفہ:</strong> پچھلے خون کے عطیے کو کم از کم ۳ ماہ (90 دن) گزر چکے ہوں۔</li>
                <li>• <strong>صحت:</strong> ہیپاٹائٹس بی، سی، ایچ آئی وی، یا ملیریا جیسی بیماریوں سے پاک ہوں۔</li>
                <li>• <strong>ہیموگلوبن:</strong> مردوں میں 13+ اور خواتین میں 12+ ہونا چاہیے۔</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 text-center ${isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-sm font-black text-rose-600">
            {lang === 'ur' ? 'پاکستان بلڈ پورٹل — ایک صدقہ جاریہ' : 'Pakistan Blood Portal — A Non-profit Initiative'}
          </p>
          <p className="text-xs">
            {lang === 'ur' ? 'تمام معلومات انسانی جان بچانے کے لیے رضا کارانہ بنیادوں پر فراہم کی گئی ہیں۔' : 'All information is provided for humanitarian and life-saving purposes.'}
          </p>
          <p className="text-[11px] text-slate-500 pt-2">
            © {new Date().getFullYear()} Pakistan Blood Portal. Built for all 4 provinces, Islamabad, AJK & GB.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className={`lg:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-lg flex items-center justify-around py-2 px-1 ${
        isDark ? 'bg-slate-950/95 border-slate-800 text-slate-400' : 'bg-white/95 border-slate-200 text-slate-600'
      }`}>
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'home' ? 'text-rose-600 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">🏠</span>
          <span className="text-[10px]">{lang === 'ur' ? 'ہوم' : 'Home'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('donors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'donors' ? 'text-rose-600 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">🩸</span>
          <span className="text-[10px]">{lang === 'ur' ? 'ڈونرز' : 'Donors'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('requests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'requests' ? 'text-amber-500 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">🚨</span>
          <span className="text-[10px]">{lang === 'ur' ? 'خون چاہیے' : 'Need Blood'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('helplines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'helplines' ? 'text-rose-600 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">📞</span>
          <span className="text-[10px]">{lang === 'ur' ? 'کالز' : 'Helplines'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('guide'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'guide' ? 'text-rose-600 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">📖</span>
          <span className="text-[10px]">{lang === 'ur' ? 'گائیڈ' : 'Guide'}</span>
        </button>
      </div>

      {/* Modals */}
      <RegisterDonorModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        defaultProvince={selectedProvince}
        defaultCity={selectedCity}
        onDonorRegistered={(newD) => setDonors((prev) => [newD, ...prev])}
        lang={lang}
      />

      <PostRequestModal
        isOpen={showPostReqModal}
        onClose={() => setShowPostReqModal(false)}
        defaultProvince={selectedProvince}
        defaultCity={selectedCity}
        onRequestPosted={(newR) => setRequests((prev) => [newR, ...prev])}
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
