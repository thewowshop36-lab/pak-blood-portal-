import React, { useState } from 'react';
import { pakistanProvinces } from '../data/pakistanLocations';
import { supabase } from '../lib/supabase';
import { BloodRequest } from '../types';

interface PostRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProvince?: string;
  defaultCity?: string;
  onRequestPosted: (newReq: BloodRequest) => void;
  lang: 'ur' | 'en';
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const PostRequestModal: React.FC<PostRequestModalProps> = ({
  isOpen,
  onClose,
  defaultProvince,
  defaultCity,
  onRequestPosted,
  lang,
}) => {
  const initialProvince = defaultProvince || Object.keys(pakistanProvinces)[0];
  const initialCity = defaultCity || pakistanProvinces[initialProvince][0];

  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [units, setUnits] = useState('1');
  const [hospital, setHospital] = useState('');
  const [contact, setContact] = useState('');
  const [urgency, setUrgency] = useState('انتہائی فوری / Immediate');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg(lang === 'ur' ? 'براہ کرم مریض کا نام درج کریں۔' : 'Please enter patient name.');
      return;
    }

    if (!hospital.trim()) {
      setErrorMsg(lang === 'ur' ? 'براہ کرم ہسپتال کا نام درج کریں۔' : 'Please enter hospital name.');
      return;
    }

    if (!contact.trim() || contact.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg(lang === 'ur' ? 'براہ کرم درست رابطہ نمبر درج کریں۔' : 'Please enter valid contact number.');
      return;
    }

    setLoading(true);

    try {
      const requestPayload = {
        patient_name: patientName.trim(),
        blood_group: bloodGroup,
        province,
        city,
        hospital: hospital.trim(),
        contact: contact.trim(),
        urgency,
      };

      const { data, error } = await supabase.from('requests').insert([requestPayload]).select();

      if (error) {
        console.error("Supabase insert request error:", error);
        setErrorMsg(error.message);
      } else {
        const added = data && data[0] ? data[0] : requestPayload;
        onRequestPosted(added);
        onClose();
        alert(lang === 'ur' ? 'خون کی ضرورت کی اپیل کامیابی سے پوسٹ ہو گئی ہے!' : 'Blood request posted successfully!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl">
              🚨
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ur' ? 'خون کی ہنگامی ضرورت پوسٹ کریں' : 'Post Blood Request'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ur' ? 'مریض کی جان بچانے کے لیے فوری اپیل جاری کریں' : 'Post urgent appeal for patient'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-950/70 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'مریض کا نام *' : 'Patient Name *'}
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder={lang === 'ur' ? 'مریض کا نام درج کریں' : 'Enter patient name'}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'مطلوبہ بلڈ گروپ *' : 'Required Blood Group *'}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-sm font-black text-rose-400 focus:outline-none focus:border-amber-500"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'کتنی بوتلیں درکار ہیں؟' : 'Units / Bags Needed'}
              </label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="1">1 Bottle / بوتل</option>
                <option value="2">2 Bottles / بوتلیں</option>
                <option value="3">3 Bottles / بوتلیں</option>
                <option value="4+">4+ Bottles / زائد بوتلیں</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'ہسپتال کا نام و وارڈ نمبر *' : 'Hospital Name & Ward *'}
            </label>
            <input
              type="text"
              required
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder={lang === 'ur' ? 'مثال: DHQ ہسپتال خانیوال، ایمرجنسی وارڈ' : 'e.g. DHQ Hospital, Emergency Ward'}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'صوبہ *' : 'Province *'}
              </label>
              <select
                value={province}
                onChange={(e) => {
                  const newProv = e.target.value;
                  setProvince(newProv);
                  setCity(pakistanProvinces[newProv][0]);
                }}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                {Object.keys(pakistanProvinces).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'ur' ? 'شہر / ضلع *' : 'City / District *'}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                {pakistanProvinces[province]?.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'رابطہ نمبر (جس پر ڈونر کال اور واٹس ایپ کرے) *' : 'Contact / WhatsApp Number *'}
            </label>
            <input
              type="tel"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="03001234567"
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-left dir-ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ur' ? 'فوری حیثیت *' : 'Urgency Level *'}
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-bold focus:outline-none"
            >
              <option value="انتہائی فوری / Immediate">🚨 انتہائی فوری (ابھی چند گھنٹوں میں)</option>
              <option value="آج درکار ہے / Needed Today">⏳ آج شام تک درکار ہے</option>
              <option value="کل درکار ہے / Needed Tomorrow">📅 کل صبح آپریشن کے لیے درکار ہے</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{lang === 'ur' ? 'پوسٹ ہو رہا ہے...' : 'Posting...'}</span>
              ) : (
                <>
                  <span>📢</span>
                  <span>{lang === 'ur' ? 'خون کی ضرورت کی اپیل پوسٹ کریں' : 'Publish Emergency Appeal'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
