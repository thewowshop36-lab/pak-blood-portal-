import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ThalassemiaPatient {
  id?: string | number;
  patient_name: string;
  age: string;
  blood_group: string;
  city: string;
  hospital: string;
  contact_number: string;
  frequency_days: string;
  next_due_date?: string;
  guardian_relation?: string;
  note?: string;
  created_at?: string;
}

interface ThalassemiaPageProps {
  onBack: () => void;
  lang: 'ur' | 'en';
}

const DEFAULT_PATIENTS: ThalassemiaPatient[] = [
  {
    id: 'th-1',
    patient_name: 'محمد حذیفہ',
    age: '7 سال',
    blood_group: 'B+',
    city: 'خانیوال (Khanewal)',
    hospital: 'ڈی ایچ کیو ہسپتال، خانیوال',
    contact_number: '03001234567',
    frequency_days: 'ہر 15 دن بعد',
    next_due_date: 'جلد درکار',
    guardian_relation: 'والد',
    note: 'بچے کو تھیلیسیمیا میجر ہے، باقاعدہ ڈونر کی ضرورت ہے۔'
  },
  {
    id: 'th-2',
    patient_name: 'فاطمہ بی بی',
    age: '11 سال',
    blood_group: 'O+',
    city: 'ملتان (Multan)',
    hospital: 'فاطمید فاؤنڈیشن، ملتان',
    contact_number: '03129876543',
    frequency_days: 'ہر 20 دن بعد',
    next_due_date: 'اگلے 3 دن میں',
    guardian_relation: 'والدہ',
    note: 'خون کی اشد ضرورت ہے۔ صدقہ جاریہ میں حصہ لیں۔'
  }
];

export const ThalassemiaPage: React.FC<ThalassemiaPageProps> = ({ onBack, lang }) => {
  const [patients, setPatients] = useState<ThalassemiaPatient[]>(() => {
    try {
      const saved = localStorage.getItem('thalassemia_patients');
      return saved ? JSON.parse(saved) : DEFAULT_PATIENTS;
    } catch {
      return DEFAULT_PATIENTS;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [filterBlood, setFilterBlood] = useState<string>('all');
  const [searchCity, setSearchCity] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    blood_group: 'B+',
    city: 'خانیوال (Khanewal)',
    hospital: '',
    contact_number: '',
    frequency_days: 'ہر 15 دن بعد (Every 15 Days)',
    next_due_date: '',
    guardian_relation: 'والد / سرپرست',
    note: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newPatient: ThalassemiaPatient = {
      id: Date.now().toString(),
      ...formData,
      created_at: new Date().toISOString()
    };

    try {
      // Supabase میں سیو کرنے کی کوشش اگر ٹیبل موجود ہو
      await supabase.from('thalassemia_patients').insert([newPatient]);
    } catch (err) {
      console.warn('Saved locally');
    }

    const updated = [newPatient, ...patients];
    setPatients(updated);
    localStorage.setItem('thalassemia_patients', JSON.stringify(updated));

    setSubmitting(false);
    setSuccessMsg(lang === 'ur' ? 'مریض کا اندراج کامیابی سے ہو گیا ہے!' : 'Patient registered successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      setShowModal(false);
      setFormData({
        patient_name: '',
        age: '',
        blood_group: 'B+',
        city: 'خانیوال (Khanewal)',
        hospital: '',
        contact_number: '',
        frequency_days: 'ہر 15 دن بعد (Every 15 Days)',
        next_due_date: '',
        guardian_relation: 'والد / سرپرست',
        note: ''
      });
    }, 1500);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesBlood = filterBlood === 'all' || p.blood_group === filterBlood;
    const matchesCity = !searchCity || p.city.toLowerCase().includes(searchCity.toLowerCase()) || p.hospital.toLowerCase().includes(searchCity.toLowerCase());
    return matchesBlood && matchesCity;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 animate-fade-in">
      
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 sm:p-6 shadow-xl border-b border-purple-800/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
          >
            <span>←</span>
            <span>{lang === 'ur' ? 'واپس ہوم' : 'Back to Home'}</span>
          </button>

          <div className="text-center">
            <span className="text-xs bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-0.5 rounded-full font-bold">
              🎗️ مستقل بلڈ کیئر رجسٹر
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              {lang === 'ur' ? 'تھیلیسیمیا و ڈائلیسز سنٹر' : 'Thalassemia & Dialysis Center'}
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-black shadow-lg shadow-rose-900/30 transition-transform active:scale-95"
          >
            <span>➕</span>
            <span>{lang === 'ur' ? 'مریض رجسٹر کریں' : 'Register Patient'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Awareness Alert */}
        <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800/60 mb-6 flex items-start gap-3">
          <span className="text-2xl">🩸</span>
          <div className="text-xs sm:text-sm">
            <h4 className="font-black text-purple-950 dark:text-purple-200">
              {lang === 'ur' ? 'معصوم بچوں کی مسکراہٹ بچائیں' : 'Save Innocent Children'}
            </h4>
            <p className="text-purple-800 dark:text-purple-300 mt-0.5 leading-relaxed">
              {lang === 'ur'
                ? 'تھیلیسیمیا کے مریض بچوں کو ہر 15 سے 20 دن بعد تازہ خون کی ضرورت ہوتی ہے۔ اگر آپ باقاعدہ ڈونر بننا چاہتے ہیں تو مریض کے لواحقین سے براہِ راست رابطہ کریں۔'
                : 'Thalassemia children require fresh blood every 15-20 days. Please connect with families to become a regular life-saver.'}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">بلڈ گروپ:</span>
            {['all', 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((bg) => (
              <button
                key={bg}
                onClick={() => setFilterBlood(bg)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  filterBlood === bg
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {bg === 'all' ? (lang === 'ur' ? 'سب گروپس' : 'All') : bg}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder={lang === 'ur' ? '🔍 شہر یا ہسپتال تلاش کریں...' : 'Search city or hospital...'}
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Patient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((p) => {
            const shareText = `🎗️ *تھیلیسیمیا مریض بچے کے لیے خون کی باقاعدہ ضرورت* 🎗️\n\n👤 *مریض:* ${p.patient_name} (${p.age})\n🩸 *بلڈ گروپ:* ${p.blood_group}\n🏥 *ہسپتال:* ${p.hospital}\n📍 *شہر:* ${p.city}\n🗓️ *ضرورت:* ${p.frequency_days}\n📞 *رابطہ:* ${p.contact_number}\n\nنیکی میں حصہ ڈالیں، صدقہ جاریہ ہے۔\n🔗 پاکستان بلڈ پورٹل: https://pak-blood-portal.vercel.app`;

            return (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 shadow-lg relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50">
                      ضرورت: {p.frequency_days}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1.5">
                      {p.patient_name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      عمر: <span className="font-bold text-slate-700 dark:text-slate-200">{p.age}</span> | سرپرست: {p.guardian_relation || 'والد'}
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 text-white flex flex-col items-center justify-center shadow-md">
                    <span className="text-[8px] font-bold text-rose-200">GROUP</span>
                    <span className="text-xl font-black">{p.blood_group}</span>
                  </div>
                </div>

                <div className="my-3 space-y-1 text-xs border-y border-slate-100 dark:border-slate-800 py-2.5">
                  <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span>🏥</span> <span className="font-semibold">{p.hospital}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span>📍</span> <span>{p.city}</span>
                  </p>
                  {p.note && (
                    <p className="text-[11px] italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl mt-1">
                      "{p.note}"
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <a
                    href={`tel:${p.contact_number}`}
                    className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>📞</span> <span>کال</span>
                  </a>
                  <a
                    href={`https://wa.me/${p.contact_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام علیکم! میں پاکستان بلڈ پورٹل پر آپ کے تھیلیسیمیا مریض بچے کے لیے خون کا مستقل عطیہ دینا چاہتا ہوں۔')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>💬</span> <span>واٹس ایپ</span>
                  </a>
                  <button
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
                    className="py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>📢</span> <span>شیئر</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ================= REGISTER PATIENT MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎗️</span>
                <span>{lang === 'ur' ? 'تھیلیسیمیا / ڈائلیسز مریض رجسٹریشن' : 'Register Patient'}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {successMsg ? (
              <div className="py-10 text-center space-y-2">
                <span className="text-5xl">✅</span>
                <p className="text-base font-black text-emerald-500">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 mt-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">مریض کا نام *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: محمد حذیفہ"
                    value={formData.patient_name}
                    onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">عمر *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: 8 سال"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">بلڈ گروپ *</label>
                    <select
                      value={formData.blood_group}
                      onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">شہر و ضلع *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: خانیوال، جہانیاں"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">کتنے دن بعد خون چاہیے؟ *</label>
                    <select
                      value={formData.frequency_days}
                      onChange={(e) => setFormData({ ...formData, frequency_days: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="ہر 10 دن بعد">ہر 10 دن بعد</option>
                      <option value="ہر 15 دن بعد">ہر 15 دن بعد</option>
                      <option value="ہر 20 دن بعد">ہر 20 دن بعد</option>
                      <option value="ماہانہ (ہر 30 دن)">ماہانہ (ہر 30 دن)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">ہسپتال / سنٹر کا نام *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: ڈی ایچ کیو ہسپتال خانیوال یا سندس فاؤنڈیشن"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">رابطہ نمبر (واٹس ایپ) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="03001234567"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">اضافی تفصیل یا پیغام</label>
                  <textarea
                    rows={2}
                    placeholder="کوئی خاص ہدایت یا پیغام..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-900/30 transition-all active:scale-98"
                  >
                    {submitting ? 'اندراج ہو رہا ہے...' : 'رجسٹر کریں'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                  >
                    منسوخ
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
