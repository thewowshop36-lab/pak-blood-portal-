import React, { useState, useEffect } from 'react';
import { 
  Heart, Users, Search, PlusCircle, MapPin, Phone, 
  User, Droplet, ShieldAlert, CheckCircle2, Filter, Menu, X, ChevronRight, ArrowRight, Lock, Trash2, LogOut, Settings, Award 
} from 'lucide-react';

// پاکستان کے تمام صوبوں اور ان کے تمام شہروں و اضلاع کی مکمل فہرست
const pakistanLocations = {
  "پنجاب": [
    "احمد پور شرقیہ", "اٹک", "بہاولنگر", "بہاولپور", "بھکر", "چکوال", "چینیوٹ", 
    "ڈیرہ غازی خان", "فیصل آباد", "گوجرانوالہ", "گجرات", "حافظ آباد", "جھنگ", 
    "جہلم", "قصور", "خانیوال", "خوشاب", "لاہور", "لودھراں", "منڈی بہاؤالدین", 
    "میانوالی", "ملتان", "مظفر گڑھ", "نارووال", "اوکاڑہ", "پاکپتن", "رحیم یار خان", 
    "راجن پور", "راولپنڈی", "ساہیوال", "سرگودھا", "شیخوپورہ", "سیالکوٹ", "ٹوبہ ٹیک سنگھ", "وہاڑی"
  ],
  "سندھ": [
    "بدین", "ڈاہلی", "گھوٹکی", "حیدرآباد", "جیکب آباد", "جامشورو", 
    "کراچی", "کشمور", "لاڑکانہ", "مٹیاری", "مٹھی", "میرپور خاص", "نوشہروفیروز", 
    "نوابشاہ (بینظیر آباد)", "قمبر شہدادکوٹ", "سکھر", "شکارپور", "ٹنڈو الہ یار", 
    "ٹنڈو محمد خان", "تھرپارکر", "عمرکوٹ"
  ],
  "خیبر پختونخوا (کے پی کے)": [
    "ایبٹ آباد", "بنوں", "بٹگرام", "چارسدہ", "چترال", "ڈیرہ اسماعیل خان", 
    "ہنگو", "ہری پور", "کرک", "کوہاٹ", "لکی مروت", "مردان", "نوشہرہ", 
    "پشاور", "صوابی", "سوات (مینگورہ)", "شانگلہ", "ٹانک", "دیر بالا", "دیر زیریں", 
    "باجوڑ", "خیبر", "مہمند", "اورکزئی", "کرم", "شمالی وزیرستان", "جنوبی وزیرستان"
  ],
  "بلوچستان": [
    "آواران", "بارخان", "چاغی", "ڈیرہ بگٹی", "گوادر", "ہرنائی", "جعفر آباد", 
    "جھل مگسی", "قلات", "خاران", "خضدار", "کوہلو", "لسبیلہ", "لورالائی", 
    "مستونگ", "موسیٰ خیل", "نصیر آباد", "نوشکی", "پنجگور", "پشین", "کوئٹہ", 
    "شیرانی", "سبی", "سوراب", "ژوب", "صحبت پور"
  ],
  "وفاقی دارالحکومت (اسلام آباد)": [
    "اسلام آباد"
  ],
  "آزاد کشمیر و گلگت بلتستان": [
    "مظفر آباد", "میرپور (آزاد کشمیر)", "راولاکوٹ", "کوٹلی", "باغ", 
    "بھمبر", "ہٹیاں بالا", "نکیال", "پونچھ", "سدھنوتی", 
    "گلگت", "سکردو", "ہنزہ", "دیامر", "غذر", "استور", "نگر", "کھرمنع", "شگر", "گانچھے", "روندو"
  ]
};

const bloodGroups = ["تمام گروپس", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function App() {
  const [activeTab, setActiveTab] = useState('directory'); 
  
  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('pak_blood_donors_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('pak_blood_requests_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pak_blood_donors_v4', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('pak_blood_requests_v4', JSON.stringify(requests));
  }, [requests]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBlood, setSelectedBlood] = useState("تمام گروپس");

  const [showDonorModal, setShowDonorModal] = useState(false);
  const [showReqModal, setShowReqModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const [newDonor, setNewDonor] = useState({
    name: "", bloodGroup: "O+", province: "پنجاب", city: "احمد پور شرقیہ", phone: ""
  });

  const [newReq, setNewReq] = useState({
    patientName: "", bloodGroup: "O+", province: "پنجاب", city: "لاہور", hospital: "", contact: "", urgency: "فوری درکار"
  });

  const handleRegisterDonor = (e) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.phone) {
      alert("براہ کرم نام اور فون نمبر درج کریں۔");
      return;
    }
    const donorToAdd = { ...newDonor, id: Date.now() };
    setDonors([donorToAdd, ...donors]);
    setNewDonor({ name: "", bloodGroup: "O+", province: "پنجاب", city: "احمد پور شرقیہ", phone: "" });
    setShowDonorModal(false);
    alert("آپ بطور بلڈ ڈونر کامیابی سے رجسٹر ہو گئے ہیں!");
  };

  const handlePostRequest = (e) => {
    e.preventDefault();
    if (!newReq.patientName || !newReq.contact || !newReq.hospital) {
      alert("براہ کرم تمام ضروری معلومات درج کریں۔");
      return;
    }
    const reqToAdd = { ...newReq, id: Date.now() };
    setRequests([reqToAdd, ...requests]);
    setNewReq({ patientName: "", bloodGroup: "O+", province: "پنجاب", city: "لاہور", hospital: "", contact: "", urgency: "فوری درکار" });
    setShowReqModal(false);
    alert("خون کی ہنگامی درخواست کامیابی سے پوسٹ کر دی گئی ہے!");
  };

  const handleDeleteDonor = (id) => {
    if (window.confirm("کیا آپ اس ڈونر کو خارج کرنا چاہتے ہیں؟")) {
      setDonors(donors.filter(d => d.id !== id));
    }
  };

  const handleDeleteRequest = (id) => {
    if (window.confirm("کیا آپ اس ہنگامی ریکویسٹ کو خارج کرنا چاہتے ہیں؟")) {
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  const currentCityDonors = donors.filter(d => {
    const matchProv = d.province === selectedProvince;
    const matchCity = d.city === selectedCity;
    const matchBlood = selectedBlood === "تمام گروپس" || d.bloodGroup === selectedBlood;
    return matchProv && matchCity && matchBlood;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir="rtl">
      
      {/* ہیڈر سیکشن */}
      <header className="bg-rose-700 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => { setSelectedProvince(null); setSelectedCity(null); setActiveTab('directory'); }}>
            <div className="bg-white p-2 rounded-full text-rose-700 shadow-inner">
              <Heart className="w-7 h-7 fill-rose-600 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">پاکستان بلڈ ڈونر پورٹل</h1>
              <p className="text-xs text-rose-100">انتظام و انصرام: اللہ دتا ربنواز (Allah ditta RABNAWAZ)</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <button 
              onClick={() => setShowDonorModal(true)}
              className="bg-white text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-lg font-semibold text-sm shadow transition flex items-center gap-2"
            >
              <User className="w-4 h-4" /> ڈونر کے طور پر رجسٹر ہوں
            </button>
            <button 
              onClick={() => setShowReqModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow transition flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" /> خون کی ضرورت پوسٹ کریں
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg font-semibold text-sm shadow transition flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-slate-900 text-white' : 'bg-rose-800 hover:bg-rose-900 text-white'
              }`}
            >
              <Settings className="w-4 h-4" /> ایڈمن پینل
            </button>
          </div>

          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-rose-800 px-4 py-3 border-t border-rose-600 flex flex-col gap-2">
            <button 
              onClick={() => { setShowDonorModal(true); setMobileMenuOpen(false); }}
              className="w-full bg-white text-rose-700 py-2 rounded-lg font-medium text-sm text-center"
            >
              ڈونر کے طور پر رجسٹر ہوں
            </button>
            <button 
              onClick={() => { setShowReqModal(true); setMobileMenuOpen(false); }}
              className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium text-sm text-center"
            >
              خون کی ضرورت پوسٹ کریں
            </button>
            <button 
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium text-sm text-center"
            >
              ایڈمن پینل
            </button>
          </div>
        )}
      </header>

      {/* مینیجر نوٹس بار */}
      <div className="bg-rose-50 border-b border-rose-200 py-2 px-4 text-center text-xs text-rose-800 font-semibold flex items-center justify-center gap-2">
        <Award className="w-4 h-4 text-rose-600" />
        <span>ایپ منتظم: اللہ دتا ربنواز (Allah ditta RABNAWAZ) | ایمرجنسی رابطہ کیلئے ویب سائٹ کے ذریعے متعلقہ شہر کے ڈونرز سے رجوع کریں۔</span>
      </div>

      {/* مین کنٹینٹ */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {activeTab !== 'admin' && (
          <div className="flex items-center gap-2 text-sm mb-6 bg-white p-3 rounded-xl shadow-sm border border-slate-200">
            <button 
              onClick={() => { setSelectedProvince(null); setSelectedCity(null); setActiveTab('directory'); }}
              className="text-rose-700 font-bold hover:underline"
            >
              تمام صوبے
            </button>
            {selectedProvince && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
                <button 
                  onClick={() => setSelectedCity(null)}
                  className={`font-bold ${selectedCity ? 'text-rose-700 hover:underline' : 'text-slate-600'}`}
                >
                  {selectedProvince}
                </button>
              </>
            )}
            {selectedCity && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
                <span className="text-slate-800 font-extrabold bg-rose-50 px-2 py-0.5 rounded text-rose-800">{selectedCity}</span>
              </>
            )}
          </div>
        )}

        {activeTab !== 'admin' && (
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('directory')}
              className={`pb-3 px-6 font-bold text-sm md:text-base border-b-2 transition flex items-center gap-2 ${
                activeTab === 'directory' 
                  ? 'border-rose-600 text-rose-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-5 h-5" /> صوبہ و شہر وار ڈونر ڈائرکٹری
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-3 px-6 font-bold text-sm md:text-base border-b-2 transition flex items-center gap-2 ${
                activeTab === 'requests' 
                  ? 'border-rose-600 text-rose-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldAlert className="w-5 h-5" /> ہنگامی خون کی ضرورت ({requests.length})
            </button>
          </div>
        )}

        {activeTab === 'directory' && (
          <div>
            {!selectedProvince && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">اپنا صوبہ منتخب کریں</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(pakistanLocations).map(prov => {
                    const totalCities = pakistanLocations[prov].length;
                    const provDonorsCount = donors.filter(d => d.province === prov).length;
                    return (
                      <div 
                        key={prov}
                        onClick={() => setSelectedProvince(prov)}
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-slate-200 cursor-pointer transition transform hover:-translate-y-1 flex items-center justify-between group"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-rose-700 transition">{prov}</h3>
                          <p className="text-xs text-slate-500 mt-1">کل شہر: {totalCities} | رجسٹرڈ ڈونرز: {provDonorsCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
                          <ArrowRight className="w-5 h-5 rotate-180" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedProvince && !selectedCity && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">{selectedProvince} - شہر یا ضلع منتخب کریں</h2>
                  <button 
                    onClick={() => setSelectedProvince(null)}
                    className="text-xs bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg font-semibold"
                  >
                    ← واپس صوبوں پر جائیں
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {pakistanLocations[selectedProvince].map(city => {
                    const cityDonorsCount = donors.filter(d => d.province === selectedProvince && d.city === city).length;
                    return (
                      <div 
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow border border-slate-200 cursor-pointer transition text-center hover:border-rose-500 group"
                      >
                        <h3 className="font-bold text-slate-800 group-hover:text-rose-700">{city}</h3>
                        <span className="inline-block mt-2 text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                          ڈونرز: {cityDonorsCount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedProvince && selectedCity && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{selectedCity}, {selectedProvince} کے ڈونرز</h2>
                    <p className="text-xs text-slate-500 mt-0.5">اس شہر کے تمام دستیاب بلڈ ڈونرز کی فہرست نیچے دی گئی ہے۔</p>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-xs font-semibold text-slate-600">بلڈ گروپ:</span>
                    <select 
                      value={selectedBlood}
                      onChange={(e) => setSelectedBlood(e.target.value)}
                      className="border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 outline-none font-bold text-rose-700"
                    >
                      {bloodGroups.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {currentCityDonors.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
                    <Droplet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-700">{selectedCity} میں فی الوقت کوئی ڈونر رجسٹرڈ نہیں ہے</h3>
                    <p className="text-slate-500 text-sm mt-1">کیا آپ اس شہر میں رہتے ہیں؟ خود کو بطور ڈونر رجسٹر کریں تاکہ دوسروں کی مدد ہو سکے۔</p>
                    <button 
                      onClick={() => setShowDonorModal(true)}
                      className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-rose-700 transition"
                    >
                      بطور ڈونر شامل ہوں
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCityDonors.map(donor => (
                      <div key={donor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-slate-200 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg shadow-inner">
                                {donor.bloodGroup}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-slate-800">{donor.name}</h3>
                                <div className="flex items-center text-xs text-slate-500 gap-1 mt-0.5">
                                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                                  <span>{donor.city}</span>
                                </div>
                              </div>
                            </div>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                              دستیاب
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">رابطہ نمبر:</span>
                          <a 
                            href={`tel:${donor.phone}`}
                            className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition"
                          >
                            <Phone className="w-4 h-4" /> {donor.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">ہنگامی خون کی درخواستیں</h2>
              <button 
                onClick={() => setShowReqModal(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition"
              >
                + نئی ریکویسٹ پوسٹ کریں
              </button>
            </div>

            {requests.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">فی الوقت کوئی ہنگامی ریکویسٹ موجود نہیں</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map(req => (
                  <div key={req.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-amber-200 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shadow-inner">
                            {req.bloodGroup}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-800">مریض: {req.patientName}</h3>
                            <div className="flex items-center text-xs text-slate-500 gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-600" />
                              <span>{req.hospital}، {req.city}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-rose-100 text-rose-700 text-xs px-2.5 py-1 rounded-full font-bold animate-pulse">
                          {req.urgency}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded border">
                        صوبہ: <span className="font-semibold">{req.province}</span> | شہر: <span className="font-semibold">{req.city}</span>
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">نگران رابطہ:</span>
                      <a 
                        href={`tel:${req.contact}`}
                        className="bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition"
                      >
                        <Phone className="w-4 h-4" /> {req.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto text-center py-8">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">ایڈمن لاگ ان</h2>
                <p className="text-xs text-slate-500 mb-6">پاس ورڈ درج کریں (ڈیفالٹ: admin123)</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPass === "admin123") {
                    setIsAdminLoggedIn(true);
                  } else {
                    alert("غلط پاس ورڈ!");
                  }
                }} className="space-y-4">
                  <input 
                    type="password"
                    placeholder="پاس ورڈ درج کریں"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-slate-800 text-center"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold text-sm shadow transition"
                  >
                    لاگ ان کریں
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">ایڈمن کنٹرول پینل</h2>
                    <p className="text-xs text-slate-500">انتظامیہ: اللہ دتا ربنواز</p>
                  </div>
                  <button 
                    onClick={() => { setIsAdminLoggedIn(false); setAdminPass(""); }}
                    className="bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition"
                  >
                    <LogOut className="w-4 h-4" /> لاگ آؤٹ
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-base text-slate-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-600" /> تمام رجسٹرڈ ڈونرز ({donors.length})
                  </h3>
                  {donors.length === 0 ? (
                    <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-lg text-center">کوئی ڈونر رجسٹرڈ نہیں ہے۔</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {donors.map(d => (
                        <div key={d.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border text-sm">
                          <div>
                            <span className="font-bold">{d.name}</span> ({d.bloodGroup}) — <span className="text-slate-600">{d.city}, {d.province}</span> — <span className="text-rose-700 font-semibold">{d.phone}</span>
                          </div>
                          <button 
                            onClick={() => handleDeleteDonor(d.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-600" /> تمام ہنگامی ریکویسٹس ({requests.length})
                  </h3>
                  {requests.length === 0 ? (
                    <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-lg text-center">کوئی ہنگامی ریکویسٹ موجود نہیں۔</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {requests.map(r => (
                        <div key={r.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border text-sm">
                          <div>
                            مریض: <span className="font-bold">{r.patientName}</span> ({r.bloodGroup}) — <span className="text-slate-600">{r.hospital}, {r.city}</span> — <span className="text-amber-700 font-semibold">{r.contact}</span>
                          </div>
                          <button 
                            onClick={() => handleDeleteRequest(r.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

      </main>

      {showDonorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowDonorModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <User className="text-rose-600 w-6 h-6" /> بلڈ ڈونر رجسٹریشن
            </h3>
            <p className="text-xs text-slate-500 mb-4">اپنا شہر درست منتخب کریں تاکہ ضرورت مندوں کو آسانی ہو۔</p>

            <form onSubmit={handleRegisterDonor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">آپ کا پورا نام</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثلاً: محمد احمد"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">بلڈ گروپ</label>
                  <select 
                    value={newDonor.bloodGroup}
                    onChange={(e) => setNewDonor({...newDonor, bloodGroup: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500 font-bold"
                  >
                    {bloodGroups.filter(b => b !== "تمام گروپس").map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">فون نمبر</label>
                  <input 
                    type="text" 
                    required
                    placeholder="03001234567"
                    value={newDonor.phone}
                    onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">صوبہ</label>
                  <select 
                    value={newDonor.province}
                    onChange={(e) => {
                      const prov = e.target.value;
                      const cities = pakistanLocations[prov] || [];
                      setNewDonor({...newDonor, province: prov, city: cities[0] || ""});
                    }}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {Object.keys(pakistanLocations).map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">شہر</label>
                  <select 
                    value={newDonor.city}
                    onChange={(e) => setNewDonor({...newDonor, city: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {(pakistanLocations[newDonor.province] || []).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-bold text-sm shadow transition"
                >
                  محفوظ کریں اور رجسٹر ہوں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReqModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowReqModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <ShieldAlert className="text-amber-600 w-6 h-6" /> خون کی ہنگامی درخواست
            </h3>
            <p className="text-xs text-slate-500 mb-4">مریض اور ہسپتال کی تفصیلات درج کریں۔</p>

            <form onSubmit={handlePostRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">مریض کا نام</label>
                <input 
                  type="text" 
                  required
                  placeholder="مریض کا نام"
                  value={newReq.patientName}
                  onChange={(e) => setNewReq({...newReq, patientName: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">درکار بلڈ گروپ</label>
                  <select 
                    value={newReq.bloodGroup}
                    onChange={(e) => setNewReq({...newReq, bloodGroup: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    {bloodGroups.filter(b => b !== "تمام گروپس").map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">رابطہ نمبر</label>
                  <input 
                    type="text" 
                    required
                    placeholder="03001234567"
                    value={newReq.contact}
                    onChange={(e) => setNewReq({...newReq, contact: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">صوبہ</label>
                  <select 
                    value={newReq.province}
                    onChange={(e) => {
                      const prov = e.target.value;
                      const cities = pakistanLocations[prov] || [];
                      setNewReq({...newReq, province: prov, city: cities[0] || ""});
                    }}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(pakistanLocations).map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">شہر</label>
                  <select 
                    value={newReq.city}
                    onChange={(e) => setNewReq({...newReq, city: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {(pakistanLocations[newReq.province] || []).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ہسپتال اور ایڈریس</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثلاً: نشتر ہسپتال، ملتان"
                  value={newReq.hospital}
                  onChange={(e) => setNewReq({...newReq, hospital: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-bold text-sm shadow transition"
                >
                  فوری ریکویسٹ پوسٹ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* فوٹر */}
      <footer className="bg-slate-800 text-slate-400 py-6 mt-12 border-t border-slate-700 text-center text-xs space-y-1">
        <p>© 2026 پاکستان بلڈ ڈونر نیٹ ورک. تمام حقوق محفوظ ہیں۔</p>
        <p className="text-slate-300 font-semibold">پلیٹ فارم مینیجر / منتظم: اللہ دتا ربنواز (Allah ditta RABNAWAZ)</p>
      </footer>

    </div>
  );
}
